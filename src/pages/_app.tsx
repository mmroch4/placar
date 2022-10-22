import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "../lib/apollo";
import { GlobalStyles } from "../stitches/global";

const App = ({ Component, pageProps }: AppProps) => {
  GlobalStyles();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
