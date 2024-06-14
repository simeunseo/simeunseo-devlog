import { Emoji } from "src/components/Emoji"
import React from "react"
import styled from "@emotion/styled"

type Props = {}

const CustomError: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <div>4</div>
          <Emoji>🤔</Emoji>
          <div>4</div>
        </div>
        <div className="text">Post not found</div>
      </div>
    </StyledWrapper>
  )
}

export default CustomError

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 3rem;
  border-radius: 1.5rem;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  .wrapper {
    display: flex;
    padding-top: 5rem;
    padding-bottom: 5rem;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    > .top {
      display: flex;
      align-items: center;
      font-size: 3.75rem;
      line-height: 1;
    }
    > .text {
      font-size: 1.875rem;
      line-height: 2.25rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
