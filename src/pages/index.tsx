import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Scoreboard } from "../components/Scoreboard";
import {
  GetPlayersDocument,
  GetPlayersQuery as IGetPlayersQuery,
  Player as IPlayer,
} from "../graphql/schema";
import { client } from "../lib/apollo";
import { styled } from "../stitches/config";

const Main = styled("main", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "100vh",

  padding: "auto",
});

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { players },
  } = await client.query<IGetPlayersQuery>({
    query: GetPlayersDocument,
  });

  return {
    props: { players },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

const HomePage: NextPage<{ players: IPlayer[] }> = ({ players }) => {
  return (
    <>
      <Head>
        <title>Placar</title>
      </Head>

      <Main>
        <Scoreboard players={players} />
      </Main>
    </>
  );
};

export default HomePage;
