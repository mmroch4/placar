import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Banner } from "../components/Banner";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { Scoreboard } from "../components/Scoreboard";
import {
  GetCurrentWinnerMessageDocument,
  GetCurrentWinnerMessageQuery as IGetCurrentWinnerMessageQuery,
  GetPlayersDocument,
  GetPlayersQuery as IGetPlayersQuery,
  Player as IPlayer,
  WinnerMessage as IWinnerMessage,
} from "../graphql/schema";
import { client } from "../lib/apollo";

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { players },
  } = await client.query<IGetPlayersQuery>({
    query: GetPlayersDocument,
  });

  const {
    data: { winnerMessages: currentWinnerMessage },
  } = await client.query<IGetCurrentWinnerMessageQuery>({
    query: GetCurrentWinnerMessageDocument,
  });

  return {
    props: { players, currentWinnerMessage },
    revalidate: 60 * 10, // 10 minutes
  };
};

const HomePage: NextPage<{
  players: IPlayer[];
  currentWinnerMessage: IWinnerMessage[];
}> = ({ players, currentWinnerMessage }) => {
  const currentMessage = currentWinnerMessage[0];

  return (
    <>
      <Head>
        <title>Placar</title>
      </Head>

      <Banner>
        &#34;{currentMessage.message}&#34; - {currentMessage.owner?.nickname},{" "}
        {new Date().getFullYear()}
      </Banner>

      <Main>
        <Nav path="/" />

        <Scoreboard players={players} />
      </Main>
    </>
  );
};

export default HomePage;
