import { Button, FormControl, InputGroup, InputRightElement } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

export default function SearchBarAutocomplete({onSearch, query, setQuery, isHero = false}: {onSearch: () => void, query: string, setQuery: (value: string) => void, isHero: boolean}) {
  const categories = {
    building: ['albañil', 'south africa'],
    asia: ['japan', 'south korea'],
    europe: ['united kingdom', 'russia'],
  };

  return (
    <InputGroup size='md' minW='320px' maxW={{ base: '500px', xl: '600px'}} w={isHero ? { base: '16rem', sm: '28rem', md: '30rem', lg: '30rem' } : 'full'}>
      <FormControl>
        <AutoComplete openOnFocus>
          <AutoCompleteInput placeholder='Comienza a buscar' bg='white' color='dark_grey' _placeholder={{ color: 'medium_grey' }} onChange={(e: any) => setQuery(e.target.value)} />
          <InputRightElement
            w='5rem'
          >
            <Button
              bg='medium_green'
              _hover={{
                bg: 'green.500',
              }}
              roundedLeft='none'
              onClick={onSearch}
            >
              Buscar
            </Button>
          </InputRightElement>
          <AutoCompleteList>
            {Object.entries(categories).map(([category, subcategories], co_id) => (
              <AutoCompleteGroup key={co_id} showDivider>
                <AutoCompleteGroupTitle textTransform='capitalize'>
                  {category}
                </AutoCompleteGroupTitle>
                {subcategories.map((subcategory, s_id) => (
                  <AutoCompleteItem
                    key={s_id}
                    value={subcategory}
                    textTransform='capitalize'
                    onClick={() => setQuery(subcategory)}
                  >
                    {subcategory}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteGroup>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </InputGroup>
  );
}