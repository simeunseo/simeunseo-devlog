import Link from "next/link"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

const NavBar: React.FC = () => {
  const router = useRouter()
  const isPinnedPage = router.pathname.includes("pinned")

  const links = [{ id: 1, name: "Pinned Post", to: "/pinned" }]
  return (
    <StyledWrapper className="" isPinned={isPinnedPage}>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div<{ isPinned: boolean }>`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      color: ${({ theme, isPinned }) =>
        isPinned ? theme.colors.gray12 : theme.colors.gray11};
      font-weight: ${({ isPinned }) => (isPinned ? "600" : "400")};
    }
  }
`
