import { Evaluation as IEvaluation } from "../../graphql/schema";

export const getLastEvaluation = (evaluations: IEvaluation[]) => {
  const lastEvaluation = [...evaluations].sort((a, b) => {
    return new Date(b.madeIn).getTime() - new Date(a.madeIn).getTime();
  })[0];

  return lastEvaluation;
};
