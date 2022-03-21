// native libraries
import Head from "next/head";
import Script from "next/script";
// components
import Footer from "components/Footer";
import Navbar from "components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
// variables
import envConfig from "../../next-env-config";

const Layout: React.FC<{
  title?: string;
  description?: string;
}> = ({ children, title, description }) => {
  return (
    <Box>
      <Head>
        <link rel="icon" href="../../public/favicon.ico" />
        <title>{`Rubrit | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      {/* To do: fix security issue (variable is exposed to browser) */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${envConfig?.mapsKey}&libraries=places`}
        strategy="beforeInteractive"
      />
      <Flex
        minH={"100vh"}
        flexDirection={"column"}
        // justifyContent="space-between"
      >
        <Navbar />
        <main style={{ minHeight: "46.5vh" }}>{children}</main>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Next.js | mi sitio web",
  description: "Descripcion de mi sitio Web",
};
