// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
import "katex/dist/katex.min.css"

import { ExtendedRecordMap } from "notion-types"
import { FC, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"

// used for rendering equations (optional)

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  const sanitizedRecordMap = useMemo(() => {
    const nextBlock = Object.fromEntries(
      Object.entries(recordMap?.block ?? {}).flatMap(([blockKey, block]: any) => {
        const rawValue = block?.value?.value ?? block?.value
        if (!rawValue || typeof rawValue !== "object") return []

        const normalizedValue = {
          ...rawValue,
          id: rawValue?.id ?? blockKey,
        }

        return [[blockKey, { ...block, value: normalizedValue }]]
      })
    ) as ExtendedRecordMap["block"]

    return {
      ...recordMap,
      block: nextBlock,
    }
  }, [recordMap])

  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={sanitizedRecordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 1rem 0;
    width: 800px;
  }

  .notion-quote {
    font-size: inherit;
  }

  .notion-h {
    width: 100%;
  }
`
