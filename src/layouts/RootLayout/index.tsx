import React, { ReactNode, useEffect } from "react"

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
    </ThemeProvider>
  )
}

export default RootLayout

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 75vw;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100vw;
    padding: 0;
  }
`
