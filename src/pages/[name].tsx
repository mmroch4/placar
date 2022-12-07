import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { getPlayerName } from "../functions/getPlayerName";
import {
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

  "td, th": {
    paddingBlock: "0.5rem",

    "&:nth-child(4)": {
      textAlign: "right",
    },
  },
});

const Archives = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  marginBlock: "0.5rem",
});

const Archive = styled(Link, {
  color: "$gray12",

  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{}, { name: string }> = async (
  ctx
) => {
  const name = ctx.params?.name;

  const {
    data: { players },
  } = await client.query<IGetPlayersQuery>({
    query: GetPlayersDocument,
  });

  const player = players.find(
    (player) => player.name.toLowerCase().split(" ").join("") === name
  );

  if (!player) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      player,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};

const PlayerPage: NextPage<{ player: IPlayer }> = ({ player }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Carregando...</title>
        </Head>

        <h2>Carregando...</h2>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {getPlayerName(player.name, player.nickname) + " - Detalhes"}
        </title>
      </Head>

      <Main>
        <Nav />

        <h1>{getPlayerName(player.name, player.nickname)}</h1>

        <Section>
          <h3>Avaliações</h3>

          <Table>
            <thead>
              <tr>
                <th>Nome</th>

                <th>Matéria</th>

                <th>Feito em</th>

                <th>Nota</th>
              </tr>
            </thead>

            <tbody>
              {[...player.evaluations]
                .sort((a, b) => {
                  return (
                    new Date(b.evaluation?.madeIn).getTime() -
                    new Date(a.evaluation?.madeIn).getTime()
                  );
                })
                .map((evaluation) => {
                  return (
                    <tr key={evaluation.id}>
                      <td>{evaluation.evaluation?.title}</td>

                      <td>{evaluation.evaluation?.subject}</td>

                      <td>
                        {format(
                          new Date(evaluation.evaluation?.madeIn),
                          "d'/'M'/'u"
                        )}
                      </td>

                      <td>{evaluation.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Section>
      </Main>
    </>
  );
};

export default PlayerPage;
