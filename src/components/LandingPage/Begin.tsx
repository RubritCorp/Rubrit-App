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
  Divider,
  Center,

} from "@chakra-ui/react";
import people from "assets/people";
import workers from "assets/workers";


const Begin: React.FC = () => {
  return (
    <Container maxW={"container.xl"} centerContent p={10} >

    <Container maxW={"container.xl"}>
      <Box paddingBottom={20}>
        <Center>
        <Heading>
          ¿Estas preparado para comenzar?
        </Heading>
        </Center>
      </Box>
      </Container>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacingY='40px'>
        <Container centerContent>
          <Box >
            <Center>
              <Heading color={"green.400"} size='lg'>¿Buscas profesionales?</Heading>
            </Center>
            <Box paddingTop={10} h={"400px"}>
              {workers}
            </Box>
          </Box>
        </Container>
        <Container centerContent padding='0px 0px' w={"100px"}  >


          <Divider orientation='vertical' />


        </Container>

        <Container centerContent>
          <Box  >
          <Center>
            <Heading color={"green.400"} as='h4' size='lg'>¿Buscas clientes?</Heading>
          </Center>
            <Box paddingTop={10} h={"395px"}>
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