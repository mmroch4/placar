import { Player as IPlayer } from "../../graphql/schema";

const DECIMAL_CHARS = 1;

export const getPlayerScore = (player: IPlayer): number => {
  const score = +player.evaluations
    .reduce((pv, cv) => pv + cv.score, 0)
    .toFixed(DECIMAL_CHARS);

  return score;
};
