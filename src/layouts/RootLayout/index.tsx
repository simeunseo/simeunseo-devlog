import React, { ReactNode, useEffect } from "react"

import { Analytics } from "@vercel/analytics/react"
import Header from "./Header"
import Prism from "prismjs/prism"
import Scripts from "src/layouts/RootLayout/Scripts"
import { ThemeProvider } from "./ThemeProvider"
import styled from "@emotion/styled"
import useGtagEffect from "./useGtagEffect"
import useScheme from "src/hooks/useScheme"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const [scheme] = useScheme()
  useGtagEffect()
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      <Header fullWidth={false} />
      <StyledMain>{children}</StyledMain>
      <Analytics />
    </ThemeProvider>
  )
}

export default RootLayout

const StyledMain = styled.main`
  margin: auto;
  width: 100%;
  max-width: 75vw;
  padding: 0 1rem;

  .notion-list-numbered {
    width: 100%;
  }

  @media (max-width: 1280px) {
    margin: auto;
  }

  @media (max-width: 768px) {
    max-width: 100vw;
    padding: 0.8rem;
  }
`
