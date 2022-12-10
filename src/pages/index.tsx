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

  return {
    props: { players },
    revalidate: 60 * 10, // 10 minutes
  };
};

const HomePage: NextPage<{
  players: IPlayer[];
}> = ({ players }) => {
  return (
    <>
      <Head>
        <title>Placar</title>
      </Head>

      <Main>
        <Nav path="/" />

        <Scoreboard players={players} />
      </Main>
    </>
  );
};

export default HomePage;
