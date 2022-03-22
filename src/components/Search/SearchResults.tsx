import { Faders } from 'phosphor-react';
import { Flex, FlexProps, FormLabel, IconButton, Select, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import CardProfessional from '../CardProfesional';
import SearchBarAutocomplete from 'components/CustomFormControls/SearchBarAutocomplete';
import Loading from '../Loading';

const SearchResults: React.FC<{ isLoading: boolean; results?: any; onOpen: any; onFilter: any; onSearch: any; query: string; setQuery: any; setFilters: any; filters: any;}> = ({ isLoading, results, onOpen, onSearch, query, setQuery, setFilters, filters }) => {
  return (
    <Stack paddingX={{ base: "5px", sm: "25px" }}>
      <Flex marginTop='35px' gap='20px' flexWrap={{ base: 'wrap', xl: 'nowrap' }} alignItems='center' justifyContent='space-between'>
        <SearchBarAutocomplete onSearch={onSearch} query={query} setQuery={setQuery} isHero={false} />
        <Flex gap='10px'>
          <Flex alignItems='center' justifyContent='flex-end'>
            <FormLabel>Ordenar por:</FormLabel>
            <Select flex={1} onChange={(e: any) => setFilters({...filters, orderBy: e.target.value })}>
              <option value='DEF'>Relevancia</option>
              <option value='PUN'>Mejor puntuación</option>
            </Select>
          </Flex>
          <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
        </Flex>
      </Flex>
      <Flex>
        <Text mt='10px'>{results?.length > 0 ? `${results.length} resultados encontrados` : isLoading ? null : 'No se encontraron resultados'}</Text>
      </Flex>
      <Wrap p='4' minH='100vh' spacing='10px' justify='center'>
        {results?.length > 0 ? results?.map((prof: any) => <WrapItem key={prof._id}><CardProfessional _id={prof._id} name={prof.name} img={prof.workerData.items[0]?.category?.picture_small} avatar={prof.profilePic} city={prof.address.name} description={prof.description} /></WrapItem>) : isLoading ? <Loading /> : null}
      </Wrap>
    </Stack>
  );
};
interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps | any) => {
  return (
    <IconButton
      variant='outline'
      onClick={onOpen}
      aria-label='open menu'
      icon={<Faders />}
      {...rest}
    />
  );
};

export default SearchResults;
