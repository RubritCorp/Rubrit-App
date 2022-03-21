import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import SearchBarAutocomplete from "components/CustomFormControls/SearchBarAutocomplete";
import Link from "next/link";
import { useState } from "react";

const Hero: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Flex
      w="full"
      h={{ base: "430px", md: "calc(100vh - 60px)" }}
      backgroundImage="linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.6)), url(banner-image-1.jpg)"
      backgroundSize="cover"
      backgroundPosition="center center"
      color="white"
      justifyContent="center"
      alignItems="center"
      paddingX={{ base: "5px", sm: "20px" }}
    >
      <Stack as={Box} textAlign="center" spacing="14" py="36">
        <Stack as={Box} textAlign="center" spacing={{ md: 3 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight="110%"
          >
            ¿Estás buscando un <br />
            profesional{" "}
            <Text as={"span"} color="medium_green">
              de confianza?
            </Text>
          </Heading>
          <Text fontSize={{ base: "1xl", sm: "2xl", md: "3xl" }}>
            Chatea rápidamente con profesionales de servicios para tu casa.{" "}
            <br />
            ¡Elige entre más de 100 categorías!
          </Text>
        </Stack>

        <Stack as={Box} textAlign="center" alignSelf="center" spacing="1">
          <SearchBarAutocomplete onSearch={() => null} query='' setQuery={() => null} isHero={true} />
          {/* <InputGroup paddingX={{ base: "5px", sm: "25px" }} size="md">
            <Input
              placeholder="Comienza a buscar"
              pr="4.5rem"
              bg="white"
              w={{ base: "16rem", sm: "28rem", md: "30rem", lg: "30rem" }}
              color="dark_grey"
              _placeholder={{ color: "medium_grey" }}
            />
            <InputRightElement
              w="5rem"
              marginRight={{ base: "5px", sm: "25px" }}
            >
              <Button
                bg="medium_green"
                _hover={{
                  bg: "green.500",
                }}
                roundedLeft="none"
              >
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup> */}
          <Text>ó</Text>
          <Link href={{ pathname: "/request/new" }} passHref>
            <a>
              <Button
                alignSelf="center"
                size="md"
                bg="medium_green"
                _hover={{
                  bg: "green.500",
                }}
                isLoading={loading}
                onClick={() => setLoading(true)}
              >
                Presupuesto gratis
              </Button>
            </a>
          </Link>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Hero;
