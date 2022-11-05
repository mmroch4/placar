import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Scoreboard } from "../components/Scoreboard";
import {
  Evaluation as IEvaluation,
  GetCurrentWinnerMessageDocument,
  GetCurrentWinnerMessageQuery as IGetCurrentWinnerMessageQuery,
  GetEvaluationsDocument,
  GetEvaluationsQuery as IGetEvaluationsQuery,
  GetPlayersDocument,
  GetPlayersQuery as IGetPlayersQuery,
  Player as IPlayer,
  WinnerMessage as IWinnerMessage,
} from "../graphql/schema";
import { client } from "../lib/apollo";
import { styled } from "../stitches/config";

const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  gap: "2rem",

  padding: "2rem",
});

const Round = styled("h1", {
  textAlign: "center",
});

const Message = styled("h2", {
  textAlign: "center",
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

  return {
    props: { players, evaluations, currentWinnerMessage },
    revalidate: 60 * 10, // 10 minutes
  };
};

const HomePage: NextPage<{
  players: IPlayer[];
  evaluations: IEvaluation[];
  currentWinnerMessage: IWinnerMessage[];
}> = ({ players, evaluations, currentWinnerMessage }) => {
  const currentMessage = currentWinnerMessage[0];

  return (
    <>
      <Head>
        <title>Placar</title>
      </Head>

      <Main>
        <Round>{evaluations.length}º Rodada</Round>

        <Message>
          <em>&#34;{currentMessage.message}&#34;</em> -{" "}
          {currentMessage.owner?.nickname}
        </Message>

        <Scoreboard players={players} />
      </Main>
    </>
  );
};

export default HomePage;
