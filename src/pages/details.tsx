import type { GetStaticProps } from "next";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { getLastEvaluation } from "../functions/analytics/getLastEvaluation";
import { getLeastRatedEvaluationId } from "../functions/analytics/getLeastRatedEvaluation";
import { getMostRatedEvaluationId } from "../functions/analytics/getMostRatedEvaluationId";
import { getPlayerName } from "../functions/getPlayerName";
import {
  Evaluation as IEvaluation,
  GetEvaluationDocument,
  GetEvaluationQuery as IGetEvaluationQuery,
  GetEvaluationsDocument,
  GetEvaluationsQuery as IGetEvaluationsQuery,
  GetPlayersDocument,
  GetPlayersQuery as IGetPlayersQuery,
  Player as IPlayer,
} from "../graphql/schema";
import { client } from "../lib/apollo";
import { styled } from "../stitches/config";

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

const Players = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",

  marginBlock: "0.5rem",
});

const Player = styled(Link, {
  color: "$gray12",

  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
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

  const lastEvaluation = getLastEvaluation(evaluations as IEvaluation[]);

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
    },
    revalidate: 60 * 10, // 10 minutes
  };
};

const DetailsPage: NextPage<{
  players: IPlayer[];
  evaluations: IEvaluation[];
  leastRatedEvaluation: IEvaluation;
  mostRatedEvaluation: IEvaluation;
  round: number;
  lastEvaluation: IEvaluation;
}> = ({
  evaluations,
  players,
  leastRatedEvaluation,
  mostRatedEvaluation,
  lastEvaluation,
  round,
}) => {
  return (
    <>
      <Head>
        <title>Detalhes</title>
      </Head>

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

        <Section>
          <h3>Participantes</h3>

          <Players>
            {players.map((player) => {
              return (
                <Player
                  href={`/${player.name.toLowerCase().split(" ").join("")}`}
                  key={player.id}
                >
                  {getPlayerName(player.name, player.nickname)}
                </Player>
              );
            })}
          </Players>
        </Section>
      </Main>
    </>
  );
};

export default DetailsPage;
