import { CONFIG } from "site.config"
import { CustomExtendedRecordMap } from "src/types/notion.type"
import { NotionAPI } from "notion-client"
import { ID } from "notion-types"
import { TPosts } from "src/types"
import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { idToUuid } from "notion-utils"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  let id = CONFIG.notionConfig.pageId as string
  const api = new NotionAPI()

  const response = (await api.getPage(id)) as any as CustomExtendedRecordMap
  id = idToUuid(id)
  const collection = Object.values(response.collection)[0]?.value.value
  const block = response.block
  const schema = collection?.schema
  const rawMetadata = block[id].value
  // Check Type
  if (
    rawMetadata?.value.type !== "collection_view_page" &&
    rawMetadata?.value.type !== "collection_view"
  ) {
    return []
  } else {
    // Construct Data
    let pageIds = getAllPageIds(response)
    const collectionId = rawMetadata?.value?.collection_id as string | undefined
    const viewIds = (rawMetadata?.value?.view_ids ?? []) as string[]
    const extractBlockIdsDeep = (input: any): ID[] => {
      const result = new Set<ID>()
      const walk = (node: any) => {
        if (!node) return
        if (Array.isArray(node)) {
          node.forEach(walk)
          return
        }
        if (typeof node !== "object") return
        if (Array.isArray((node as any).blockIds)) {
          ;(node as any).blockIds.forEach((id: ID) => result.add(id))
        }
        Object.values(node).forEach(walk)
      }
      walk(input)
      return [...result]
    }

    if (pageIds.length === 0 && collectionId && viewIds.length > 0) {
      const fallbackPageSet = new Set<ID>()
      for (const viewId of viewIds) {
        const collectionView = (response as any)?.collection_view?.[viewId]?.value
        const collectionData = await api.getCollectionData(
          collectionId,
          viewId,
          collectionView,
          { limit: 1000 }
        )
        const candidateBlockIds = extractBlockIdsDeep(collectionData) as ID[]
        candidateBlockIds.forEach((rowId) => fallbackPageSet.add(rowId))
      }
      pageIds = [...fallbackPageSet]
    }
    const missingBlockIds = pageIds.filter((pageId) => !block[pageId])

    if (missingBlockIds.length > 0) {
      const missingBlocksChunk = await api.getBlocks(missingBlockIds)
      const fetchedBlocks = missingBlocksChunk?.recordMap?.block ?? {}
      Object.assign(block, fetchedBlocks)
    }
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value.value?.created_time
      ).toString()
      properties.fullWidth =
        (block[id].value.value?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data.map((post: any) => ({
      ...post,
      author: Array.isArray(post?.author)
        ? post.author.map((author: any) => ({
            ...author,
            id: author?.id ?? null,
          }))
        : post?.author,
    })) as TPosts
    return posts
  }
}
