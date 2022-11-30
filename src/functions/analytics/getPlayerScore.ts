import { Player as IPlayer } from "../../graphql/schema";

export const getPlayerScore = (player: IPlayer): number => {
  const score = +player.evaluations.reduce((pv, cv) => pv + cv.score, 0);

  return score;
};
