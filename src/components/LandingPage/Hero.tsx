import { Box, Heading, Flex, Text, Button, Stack, Input, InputRightElement, InputGroup } from "@chakra-ui/react";

const Hero: React.FC = () => {
  return (
    <Flex 
      w="full"
      h="calc(100vh - 60px)"
      backgroundImage="linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.6)), url(banner-image-1.jpg)"
      backgroundSize="cover"
      backgroundPosition="center center"
      color="white"
      justifyContent="center"
      alignItems="center">
        <Stack
          as={Box}
          textAlign="center"
          spacing="14"
          py="36">
          <Stack
            as={Box}
            textAlign="center"
            spacing={{ md: 3 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight="110%">
              ¿Estás buscando un <br />
              profesional <Text as={'span'} color="medium_green">de confianza?</Text>
            </Heading>
            <Text fontSize="lg">
              Chatea rápidamente con profesionales de servicios para tu casa. <br />
              ¡Elige entre más de 100 categorías!
            </Text>
          </Stack>

          <Stack
            as={Box}
            textAlign="center"
            alignSelf="center"
            spacing="1">
            <InputGroup paddingX="30px" size="md">
              <Input placeholder="Comienza a buscar" pr="4.5rem" bg="white" w={{ sm: "28rem", md: "30rem", lg: "30rem" }} color="dark_grey" _placeholder={{ color: "medium_grey" }} />
              <InputRightElement w="5rem" marginRight="1.7rem">
                <Button 
                  bg="medium_green" 
                  _hover={{
                    bg: "green.500",
                  }}
                  roundedLeft="none">
                  Buscar
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text>ó</Text>
            <Button
              alignSelf="center"
              size="sm"
              bg="medium_green"
              rounded="full"
              _hover={{
                bg: "green.500",
              }}>
              Presupuesto gratis
            </Button>
          </Stack>
        </Stack>
      </Flex>
  );
};

export default Hero;
