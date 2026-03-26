import React, { useMemo } from "react"

import { CONFIG } from "site.config"
import { DEFAULT_CATEGORY } from "src/constants"
import Link from "next/link"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { filterPosts } from "./FilterPosts"
import styled from "@emotion/styled"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PinnedPosts: React.FC<Props> = ({ q }) => {
  const data = usePostsQuery()

  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts({
      posts: data,
      q,
      category: DEFAULT_CATEGORY,
      order: "desc",
    })
    return baseFiltered.filter((post) => post.tags?.includes("Pinned"))
  }, [data, q])

  if (filteredPosts.length === 0) return null

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="header">📌 Pinned Posts</div>
        <div className="text">
          <Link href="/">전체 게시글 보러가기</Link>
        </div>
      </div>
      <div className="my-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} data={post} />
        ))}
      </div>
    </StyledWrapper>
  )
}

export default PinnedPosts

const StyledWrapper = styled.div`
  position: relative;
  .wrapper {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  }
  .header {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    cursor: pointer;
  }
  .text {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 400;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  .bio {
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 1.25rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 1rem;
    line-height: 2rem;
    white-space: pre-wrap;
    font-weight: 500;
  }
`
