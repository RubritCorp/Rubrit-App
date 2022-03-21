import { Faders } from 'phosphor-react';
import { Button, Flex, FlexProps, FormLabel, IconButton, Input, InputGroup, InputRightElement, Select, SelectField, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import CardProfessional from '../CardProfesional';

const SearchResults: React.FC<{ results?: any; onOpen: any; onFilter: any; onSearch: any; setQuery: any; setFilters: any; filters: any;}> = ({ results, onOpen, onSearch, setQuery, setFilters, filters }) => {
  return (
    <Stack paddingX={{ base: "5px", sm: "25px" }}>
      <Flex marginTop='35px' gap='20px' flexWrap={{ base: 'wrap', xl: 'nowrap' }} alignItems='center' justifyContent='space-between'>
        <InputGroup size="md" minW='320px' maxW='600px'>
          <Input
            placeholder="Comienza a buscar"
            bg="white"
            color="dark_grey"
            _placeholder={{ color: "medium_grey" }}
            onChange={(e: any) => setQuery(e.target.value)}
          />
          <InputRightElement
            w="5rem"
          >
            <Button
              bg="medium_green"
              _hover={{
                bg: "green.500",
              }}
              roundedLeft="none"
              onClick={onSearch}
            >
              Buscar
            </Button>
          </InputRightElement>
        </InputGroup>
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
        <Text mt='10px'>{results?.length > 0 ? `${results.length} resultados encontrados` : 'No se encontraron resultados'}</Text>
      </Flex>
      <Wrap p='4' minH='100vh' spacing='10px' justify='center'>
        {results?.length > 0 && results?.map((prof: any) => <WrapItem key={prof._id}><CardProfessional _id={prof._id} name={prof.name} img={prof.workerData.items[0]?.category?.picture_small} avatar={prof.profilePic} city={prof.address.name} description={prof.description} /></WrapItem>)}
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
