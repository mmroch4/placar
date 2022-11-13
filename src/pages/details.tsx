import type { GetStaticProps } from "next";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Banner } from "../components/Banner";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import {
  Evaluation as IEvaluation,
  GetCurrentWinnerMessageDocument,
  GetCurrentWinnerMessageQuery as IGetCurrentWinnerMessageQuery,
  GetEvaluationDocument,
  GetEvaluationQuery as IGetEvaluationQuery,
  GetEvaluationsDocument,
  GetEvaluationsQuery as IGetEvaluationsQuery,
  GetPlayersDocument,
  GetPlayersQuery as IGetPlayersQuery,
  Player as IPlayer,
  WinnerMessage as IWinnerMessage,
} from "../graphql/schema";
import { client } from "../lib/apollo";
import { styled } from "../stitches/config";
import { getLeastRatedEvaluationId } from "../utils/getLeastRatedEvaluation";
import { getMostRatedEvaluationId } from "../utils/getMostRatedEvaluationId";

const Section = styled("section", {
  width: "100%",

  textAlign: "left",
});

const Table = styled("table", {
  width: "100%",

  marginBlock: "0.5rem",

  borderCollapse: "collapse",

  td: {
    paddingBlock: "0.5rem",

    "&:nth-child(2)": {
      textAlign: "right",
    },
  },
});

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { players },
  } = await client.query<IGetPlayersQuery>({
    query: GetPlayersDocument,
  });

  const {
    data: { evaluations },
  } = await client.query<IGetEvaluationsQuery>({
    query: GetEvaluationsDocument,
  });

  const {
    data: { winnerMessages: currentWinnerMessage },
  } = await client.query<IGetCurrentWinnerMessageQuery>({
    query: GetCurrentWinnerMessageDocument,
  });

  const lastEvaluation = [...evaluations].sort((a, b) => {
    return new Date(b.madeIn).getTime() - new Date(a.madeIn).getTime();
  })[0];

  const mostRatedEvaluationId = getMostRatedEvaluationId(players as IPlayer[]);

  const leastRatedEvaluationId = getLeastRatedEvaluationId(
    players as IPlayer[]
  );

  const {
    data: { evaluation: leastRatedEvaluation },
  } = await client.query<IGetEvaluationQuery>({
    query: GetEvaluationDocument,
    variables: {
      id: leastRatedEvaluationId,
    },
  });

  const {
    data: { evaluation: mostRatedEvaluation },
  } = await client.query<IGetEvaluationQuery>({
    query: GetEvaluationDocument,
    variables: {
      id: mostRatedEvaluationId,
    },
  });

  return {
    props: {
      players,
      evaluations,
      leastRatedEvaluation,
      mostRatedEvaluation,
      round: evaluations.length,
      lastEvaluation,
      currentWinnerMessage,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};

const DetailsPage: NextPage<{
  players: IPlayer[];
  evaluations: IEvaluation[];
  leastRatedEvaluation: IEvaluation;
  mostRatedEvaluation: IEvaluation;
  currentWinnerMessage: IWinnerMessage[];
  round: number;
  lastEvaluation: IEvaluation;
}> = ({
  currentWinnerMessage,
  evaluations,
  players,
  leastRatedEvaluation,
  mostRatedEvaluation,
  lastEvaluation,
  round,
}) => {
  const currentMessage = currentWinnerMessage[0];

  return (
    <>
      <Head>
        <title>Detalhes</title>
      </Head>

      <Banner>
        &#34;{currentMessage.message}&#34; - {currentMessage.owner?.nickname},{" "}
        {new Date().getFullYear()}
      </Banner>

      <Main>
        <Nav path="/details" />

        <Section>
          <h3>Geral</h3>

          <Table>
            <tr>
              <td>Rodada</td>

              <td>
                <strong>{round}</strong>
              </td>
            </tr>

            <tr>
              <td>Última avaliação</td>

              <td>
                <strong>{lastEvaluation.title}</strong>
              </td>
            </tr>

            <tr>
              <td>Avaliação mais apurada</td>

              <td>
                <strong>{mostRatedEvaluation.title}</strong>
              </td>
            </tr>

            <tr>
              <td>Avaliação menos apurada</td>

              <td>
                <strong>{leastRatedEvaluation.title}</strong>
              </td>
            </tr>
          </Table>
        </Section>

        {/* <Section>
          <h2>Jogadores</h2>

          <br />

          {players.map((player) => {
            return (
              <React.Fragment key={player.id}>
                <h3>{player.name}</h3>

                <Table>
                  {player.evaluations.map((evaluation) => {
                    return (
                      <tr key={evaluation.id}>
                        <td>{evaluation.evaluation?.title}</td>

                        <td>
                          <strong>{evaluation.score}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </Table>

                <br />
              </React.Fragment>
            );
          })}
        </Section> */}
      </Main>
    </>
  );
};

export default DetailsPage;
