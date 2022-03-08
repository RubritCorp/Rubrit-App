// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Fonts from "styles/Fonts";
//contexts
import { CategoriesProvider } from "Provider/CategoriesProvider";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <CategoriesProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </CategoriesProvider>
    </SessionProvider>
  );
}

export default MyApp;
