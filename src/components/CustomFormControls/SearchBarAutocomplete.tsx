import { Button, FormControl, InputGroup, InputRightElement } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useCategories } from 'Provider/CategoriesProvider';

export default function SearchBarAutocomplete({onSearch, query, setQuery, isHero = false}: {onSearch: (value?: string) => void, query: string, setQuery: (value: string) => void, isHero: boolean}) {
  const { categories } = useCategories();

  return (
    <InputGroup size='md' minW='320px' maxW={{ base: '500px', xl: '600px'}} w={isHero ? { base: '16rem', sm: '28rem', md: '30rem', lg: '30rem' } : '100%'}>
      <FormControl>
        <AutoComplete onSelectOption={(item) => onSearch(item.item.value.toString())} emptyState={false} suggestWhenEmpty={false}>
          <AutoCompleteInput id='searchBarAutocomplete' placeholder='Comienza a buscar' bg='white' color='dark_grey' _placeholder={{ color: 'medium_grey' }} value={query} onChange={(e: any) => setQuery(e.target.value)} autoComplete='false' />
          <InputRightElement
            w='5rem'
          >
            <Button
              bg='medium_green'
              _hover={{
                bg: 'green.500',
              }}
              roundedLeft='none'
              onClick={() => onSearch()}
            >
              Buscar
            </Button>
          </InputRightElement>
          <AutoCompleteList>
            {categories?.map((category) => (
              <AutoCompleteGroup key={category._id.toString()} showDivider>
                <AutoCompleteGroupTitle textTransform='capitalize' color='black'>
                  {category.name}
                </AutoCompleteGroupTitle>
                {category.subcategories?.map((subcategory) => (
                  <AutoCompleteItem
                    key={subcategory._id.toString()}
                    value={subcategory.name}
                    textTransform='capitalize'
                    color='black'
                    onClick={() => setQuery(subcategory.name)}
                  >
                    {subcategory.name}
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