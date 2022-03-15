// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Fonts from "styles/Fonts";
//contexts
import { CategoriesProvider } from "Provider/CategoriesProvider";
import { UsersProvider } from "Provider/UsersProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UsersProvider>
        <CategoriesProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </CategoriesProvider>
      </UsersProvider>
    </SessionProvider>
  );
}

export default MyApp;
