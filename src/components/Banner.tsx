import { ReactNode } from "react";
import { styled } from "../stitches/config";

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "$gray5",

  paddingBlock: "1rem",

  fontWeight: 500,
});

interface Props {
  children: ReactNode;
}

export const Banner = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
