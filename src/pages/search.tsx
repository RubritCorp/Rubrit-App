//components
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from 'components/Footer';
import Navbar from 'components/NavBar';
import SearchResults from 'components/Search/SearchResults'
import SearchWithSideBar from 'components/Search';
import { search } from 'components/Search/searchHelper';

const Search: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => {

  search().then(res => console.log("API RESPONSE:",res));

  return (
    <Box>
      <Head>
        <link rel='icon' href='../../public/favicon.ico' />
        <title>{`Rubrit | ${title}`}</title>
        <meta name='description' content={description} />
      </Head>
      <Navbar />
      <SearchWithSideBar>
        <SearchResults />
        <Footer />
      </SearchWithSideBar>
    </Box>

  );
};

Search.defaultProps = {
  title: 'Resultados de la búsqueda',
  description: 'Encuentra todos los servicios que necesites',
};


export default Search;
