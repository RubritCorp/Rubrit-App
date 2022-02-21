//css
import "../styles/globals.css";
//from modules
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
//chakra
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
