import { NotionAPI } from "notion-client"
import { BlockMap, ExtendedRecordMap } from "notion-types"
import { parsePageId } from "notion-utils"

const normalizeBlockMap = (blockMap: any = {}) => {
  return Object.fromEntries(
    Object.entries(blockMap).flatMap(([blockId, block]: any) => {
      const value = block?.value?.value ?? block?.value

      if (!value || typeof value !== "object") return []

      return [
        [
          blockId,
          {
            role: block?.role ?? block?.value?.role ?? "reader",
            value: {
              ...value,
              id: value.id ?? blockId,
            },
          },
        ],
      ]
    })
  ) as BlockMap
}

const findMissingContentBlockIds = (
  recordMap: ExtendedRecordMap,
  rootPageId: string
) => {
  const missingBlockIds = new Set<string>()

  Object.entries(recordMap.block).forEach(([blockId, block]) => {
    if (
      blockId !== rootPageId &&
      (block.value.type === "page" || block.value.type === "collection_view_page")
    ) {
      return
    }

    block.value.content?.forEach((blockId) => {
      if (!recordMap.block[blockId]) {
        missingBlockIds.add(blockId)
      }
    })
  })

  return [...missingBlockIds]
}

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const rootPageId = parsePageId(pageId) ?? pageId
  const recordMap = (await api.getPage(pageId)) as ExtendedRecordMap

  recordMap.block = normalizeBlockMap(recordMap.block)

  for (let i = 0; i < 10; i++) {
    const missingBlockIds = findMissingContentBlockIds(recordMap, rootPageId)
    if (missingBlockIds.length === 0) break

    for (let j = 0; j < missingBlockIds.length; j += 100) {
      const missingBlocks = await api.getBlocks(missingBlockIds.slice(j, j + 100))
      Object.assign(recordMap.block, normalizeBlockMap(missingBlocks.recordMap.block))
    }
  }

  await api.addSignedUrls({
    recordMap,
    contentBlockIds: Object.keys(recordMap.block),
  })

  return recordMap
}
