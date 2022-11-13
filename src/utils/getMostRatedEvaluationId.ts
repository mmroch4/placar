import { Player as IPlayer } from "../graphql/schema";

export function getMostRatedEvaluationId(players: IPlayer[]) {
  const map = new Map<string, number>();

  for (const player of players) {
    for (const evaluation of player.evaluations) {
      const id = evaluation.evaluation?.id as string;

      if (map.has(id)) {
        const previousScore = map.get(id) as number;

        map.set(id, previousScore + evaluation.score);

        continue;
      }

      map.set(id, evaluation.score);
    }
  }

  const values: { [key: string]: number } = {};
  map.forEach((v, k) => {
    values[`${k}`] = v;
  });

  const mostRatedEvaluationId = Object.keys(values).reduce((a, b) =>
    values[a] > values[b] ? a : b
  );

  return mostRatedEvaluationId;
}
