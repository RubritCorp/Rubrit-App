//components
import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "components/Footer";
import Navbar from "components/NavBar";
import SearchWithSideBar from "components/Search";

const Search: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <Box>
      <Head>
        <link rel="icon" href="../../public/favicon.ico" />
        <title>{`Rubrit | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <Navbar />
      <SearchWithSideBar>
        <Text p='4' h='100vh'>Search</Text>
        <Footer />
      </SearchWithSideBar>
    </Box>

  );
};

Search.defaultProps = {
  title: "Mi sitio web",
  description: "Descripcion de mi sitio Web",
};


export default Search;
