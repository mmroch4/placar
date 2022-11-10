import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "../stitches/config";

const Container = styled("nav", {});

const List = styled("ul", {
  display: "flex",
  flexDirection: "row",

  alignItems: "center",

  gap: "2rem",

  listStylePosition: "inside",
  listStyleType: "none",
});

const Item = styled(Link, {
  cursor: "pointer",

  textDecoration: "none",

  color: "$gray11",

  "&:hover": {
    color: "$gray12",
  },

  variants: {
    active: {
      true: {
        color: "$gray12",

        fontWeight: 500,
      },
    },
  },
});

export const Nav = () => {
  const { pathname } = useRouter();

  return (
    <Container>
      <List>
        <li>
          <Item href="/" active={pathname === "/"}>
            Placar
          </Item>
        </li>

        <li>
          <Item href="/details" active={pathname === "/details"}>
            Detalhes
          </Item>
        </li>
      </List>
    </Container>
  );
};
