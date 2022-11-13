import type { GetStaticProps } from "next";
import { NextPage } from "next";
import Head from "next/head";
import { Banner } from "../components/Banner";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import {
  Evaluation as IEvaluation,
  GetCurrentWinnerMessageDocument,
  GetCurrentWinnerMessageQuery as IGetCurrentWinnerMessageQuery,
  GetEvaluationsDocument,
  GetEvaluationsQuery as IGetEvaluationsQuery,
  WinnerMessage as IWinnerMessage,
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

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      evaluations,
      round: evaluations.length,
      lastEvaluation,
      currentWinnerMessage,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};

const DetailsPage: NextPage<{
  evaluations: IEvaluation[];
  currentWinnerMessage: IWinnerMessage[];
  round: number;
  lastEvaluation: IEvaluation;
}> = ({ currentWinnerMessage, evaluations, lastEvaluation, round }) => {
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
                <strong>...</strong>
              </td>
            </tr>

            <tr>
              <td>Avaliação menos apurada</td>

              <td>
                <strong>...</strong>
              </td>
            </tr>
          </Table>
        </Section>
      </Main>
    </>
  );
};

export default DetailsPage;
