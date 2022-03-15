// native libraries
import Head from "next/head";
// components
import Footer from "components/Footer";
import Navbar from "components/NavBar";
import { Box } from "@chakra-ui/react";
// styles

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
      <Box minH={"100vh"}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Next.js | mi sitio web",
  description: "Descripcion de mi sitio Web",
};
