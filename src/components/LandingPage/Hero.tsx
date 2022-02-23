import { Box, Heading, Flex, Text, Button, Stack } from "@chakra-ui/react";

const Hero: React.FC = () => {
  return (
    <Flex 
      w="full"
      h="100vh"
      backgroundImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(banner-image-1.jpg)"
      backgroundSize="cover"
      backgroundPosition="center center"
      color="white"
      justifyContent="center">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            ¿Estás buscando un <br />
            profesional <Text as={'span'} color={'green.400'}>de confianza?</Text>
          </Heading>
          <Text>
            Chatea rápidamente con profesionales de servicios para tu casa. <br />
            ¡Elige entre más de 100 categorías!
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative">
            <Button
              bg={'green.400'}
              rounded="full"
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Presupuesto gratis
            </Button>
          </Stack>
        </Stack>
      </Flex>
  );
};

export default Hero;
