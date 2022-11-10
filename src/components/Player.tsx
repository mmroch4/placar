import { blueA, crimsonA, redA, yellowA } from "@radix-ui/colors";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "../stitches/config";

const Container = styled("div", {
  position: "relative",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  gap: "1rem",
});

const InnerContainer = styled("div", {
  flex: 1,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  gap: "1rem",

  background: "transparent",

  padding: "1rem",

  border: "1px solid $gray7",
  borderRadius: 5,

  variants: {
    color: {
      blue: {
        background: "$blue3",

        borderColor: "$blue7",
      },
      green: {
        background: "$green3",

        borderColor: "$green7",
      },
      yellow: {
        background: "$yellow3",

        borderColor: "$yellow7",
      },
      red: {
        background: "$red3",

        borderColor: "$red7",
      },
    },
  },
});

const Score = styled("span", {
  padding: "1rem",

  borderRadius: 5,

  fontSize: "1.25rem",
  fontWeight: "bold",

  variants: {
    color: {
      blue: {
        background: "$blue9",

        color: "$blue12",
      },
      crimson: {
        background: "$crimson9",

        color: "$crimson12",
      },
      yellow: {
        background: "$yellow9",

        color: "$yellow12",
      },
      red: {
        background: "$red9",

        color: "$red12",
      },
    },
  },
});

const Name = styled("h2", {});

const Position = styled("span", {
  background: "$yellow9",

  padding: "0.5rem",

  border: "1px solid $yellow9",
  borderRadius: "50%",

  color: "$yellow12",
  fontWeight: "bold",
});

const Comment = styled("div", {
  zIndex: 1,

  borderRadius: 5,

  margin: "1rem",
  padding: "0.25rem 0.5rem",

  fontWeight: "bold",

  variants: {
    color: {
      blue: {
        background: "$blue9",

        color: "$blue12",

        boxShadow: `0 0 10px ${blueA.blueA6}`,
      },
      crimson: {
        background: "$crimson9",

        color: "$crimson12",

        boxShadow: `0 0 10px ${crimsonA.crimsonA6}`,
      },
      yellow: {
        background: "$yellow9",

        color: "$yellow12",

        boxShadow: `0 0 10px ${yellowA.yellowA6}`,
      },
      red: {
        background: "$red9",

        color: "$red12",

        boxShadow: `0 0 10px ${redA.redA6}`,
      },
    },
  },
});

interface Props {
  averageScore: number;

  score: number;
  position: number;
  name: string;
  nickname: string;
}

export const Player = ({
  name,
  nickname,
  score,
  position,
  averageScore,
}: Props) => {
  const [firstName, lastName] = name.split(" ");

  let color: "blue" | "yellow" | "red" | "crimson" = "blue";
  let comment: string = "";

  const setup = () => {
    const percentage = +((score * 50) / averageScore);

    if (percentage >= 80) {
      color = "crimson";
      comment = "Fodástico!";

      return;
    } else if (percentage < 80 && percentage >= 50) {
      color = "blue";
      comment = "Brabo!";

      return;
    } else if (percentage < 50 && percentage >= 20) {
      color = "yellow";
      comment = "Seu pangaré!";

      return;
    } else if (percentage < 20) {
      color = "red";
      comment = "Burro demais!";

      return;
    }
  };

  setup();

  return (
    <Container>
      <Position>{position}º</Position>

      <InnerContainer>
        <TooltipPrimitive.Provider delayDuration={500} skipDelayDuration={500}>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <Score color={color}>{score}</Score>
            </TooltipPrimitive.Trigger>

            <TooltipPrimitive.Content asChild>
              <Comment color={color}>{comment}</Comment>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>

        <Name>
          {firstName} &#34;{nickname}&#34; {lastName}
        </Name>
      </InnerContainer>
    </Container>
  );
};
