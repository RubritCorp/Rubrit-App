//components
import { Box, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from 'components/Footer';
import Navbar from 'components/NavBar';
import SearchResults from 'components/Search/SearchResults'
import SearchWithSideBar from 'components/Search';
import { filter, search } from 'components/Search/searchHelper';

const Search: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ query, setQuery ] = useState('');
  const [ filters, setFilters ] = useState({orderBy: 'DEF'});
  const [ results, setResults ] = useState([]);
  const [ initialResults, setInitialResults ] = useState([]);

  useEffect(() => {
    // On first load
    if (query !== '') search(query).then(res => setInitialResults(res.data.users));
  },[])

  useEffect(() => {
    if (Object.keys(filters).length > 0 && initialResults.length > 0) onFilter();
  },[filters, initialResults])

  function onSearch() {
    search(query).then(res => setInitialResults(res.data.users));
  }

  function onFilter() {
    let filteredResults = filter(initialResults, filters);
    setResults(filteredResults as any);
  }

  return (
    <Box>
      <Head>
        <link rel='icon' href='../../public/favicon.ico' />
        <title>{`Rubrit | ${title}`}</title>
        <meta name='description' content={description} />
      </Head>
      <Navbar />
      <SearchWithSideBar isOpen={isOpen} onClose={onClose} filters={filters} setFilters={setFilters}>
        <SearchResults results={results} onOpen={onOpen} onFilter={onFilter} onSearch={onSearch} filters={filters} setFilters={setFilters} setQuery={setQuery} />
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