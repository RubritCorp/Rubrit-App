// Import external libraries
import {
  Box,
  Heading,
  Image,
  Button,
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
  StackDivider,
  Stack,
  Flex,
 
} from "@chakra-ui/react";
import people from "assets/people";
import workers from "assets/workers";


const Begin: React.FC = () => {
  return (
    <Container maxW={"container.xl"} centerContent p={10} >


      <Box paddingBottom={10}>
        <Heading>
          ¿Estas preparado para comenzar?
        </Heading>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
        <Container centerContent>
        <Box > 
          <Heading color={"green.500"} as='h4' size='md'>¿Buscas a los mejores profesionales?</Heading>
          <Box paddingTop={10} h={"400px"}>
         {workers}
         </Box>
        </Box>
         </Container>
         <Container centerContent> 
        <Box  > 
          <Heading color={"green.500"} as='h4' size='md'>¿Buscas clientes que completen tu agenda?</Heading>
          <Box  paddingTop={10} h={"395px"}>
            {people}
            </Box>
        </Box>
        </Container>
      </SimpleGrid>
   
      <Button
       marginTop={20}
        colorScheme={'green'}
        bg={'green.500'}
        rounded={'md'}
        px={20}
        _hover={{
          bg: 'green.600',
        }}>
        Empecemos
      </Button>


    </Container>
  )

}

export default Begin;