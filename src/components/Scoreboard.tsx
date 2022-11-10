import { Player as IPlayer } from "../graphql/schema";
import { styled } from "../stitches/config";
import { getPlayerScore } from "../utils/getPlayerScore";
import { Player } from "./Player";

const Container = styled("section", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  gap: "1rem",
});

interface Props {
  players: IPlayer[];
}

export const Scoreboard = ({ players }: Props) => {
  const averageScore =
    [...players].reduce((pv, cv) => pv + getPlayerScore(cv), 0) /
    players.length;

  return (
    <Container>
      {[...players]
        .sort((a, b) => getPlayerScore(b) - getPlayerScore(a))
        .map((player, i) => (
          <Player
            key={player.id + i}
            averageScore={averageScore}
            name={player.name}
            nickname={player.nickname}
            position={++i}
            score={getPlayerScore(player)}
          />
        ))}
    </Container>
  );
};
