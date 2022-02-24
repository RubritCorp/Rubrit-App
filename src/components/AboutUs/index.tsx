//libraries
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import { Storefront, Wrench, UsersFour, Handshake } from "phosphor-react";

//componentes
import Layout from "../layout";
//styles

const AboutUs: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box
        bg={useColorModeValue("medium_grey", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container maxW={"6xl"} py={10}>
          <Flex
            justifyContent="center"
            padding={5}
            direction="column"
            marginTop={10}
          >
            <Heading
              fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
              textAlign="center"
              marginBottom={1}
            >
              Revolucionando el trabajo diario
            </Heading>
            <Text
              fontSize={{ base: "0.9rem", md: "0.9rem", lg: "1.4rem" }}
              textAlign="center"
              marginBottom={5}
            >
              El trabajo diario es importante. Pero también requiere mucho
              tiempo. Podemos ayudarte.
            </Text>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"6xl"} py={10}>
        <Box height="80px">
          <Flex justifyContent="center" align-items="center">
            <Handshake
              size={80}
              weight="regular"
              color={theme.colors.dark_grey}
            />
          </Flex>
        </Box>
        <Flex justifyContent="center" padding={5} direction="column">
          <Heading
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            textAlign="center"
          >
            Haga más en menos tiempo
          </Heading>
          <Text
            fontSize={{ base: "0.9rem", md: "0.9rem", lg: "1.4rem" }}
            textAlign="center"
            marginBottom={5}
          >
            Nuestra plataforma de servicio lo conecta instantáneamente con
            trabajadores calificados para ayudarlo en trabajos ocasionales y
            mandados, para que pueda ser más productivo todos los días.
          </Text>
        </Flex>
      </Container>
      <Box
        bg={useColorModeValue("medium_grey", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container maxW={"6xl"} py={10}>
          <Flex direction="row">
            <Container marginTop={20}>
              <Box height="100px">
                <Flex marginBottom={2} justifyContent="center">
                  <Storefront
                    size={70}
                    weight="regular"
                    color={theme.colors.medium_green}
                  />
                </Flex>
              </Box>
              <Heading
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                350.000
              </Heading>
              <Text
                fontSize={{ base: "0.5rem", md: "0.5rem", lg: "1rem" }}
                textAlign="center"
              >
                horas dedicadas a hacer mandados por toda la ciudad
              </Text>
            </Container>
            <Container marginTop={20}>
              <Box height="100px">
                <Flex marginBottom={2} justifyContent="center">
                  <Wrench
                    size={70}
                    weight="regular"
                    color={theme.colors.medium_green}
                  />
                </Flex>
              </Box>
              <Heading
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                16.000
              </Heading>
              <Text
                fontSize={{ base: "0.5rem", md: "0.5rem", lg: "1rem" }}
                textAlign="center"
              >
                reparaciones en hogares y oficinas
              </Text>
            </Container>
            <Container marginTop={20}>
              <Box height="100px">
                <Flex marginBottom={2} justifyContent="center">
                  <UsersFour
                    size={70}
                    weight="regular"
                    color={theme.colors.medium_green}
                  />
                </Flex>
              </Box>
              <Heading
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                4.000
              </Heading>
              <Text
                fontSize={{ base: "0.5rem", md: "0.5rem", lg: "1rem" }}
                textAlign="center"
              >
                nuevos usuarios en el último mes
              </Text>
            </Container>
          </Flex>
        </Container>
      </Box>

      <Container maxW={"6xl"}>
        <Flex
          justifyContent="flex-start"
          padding={5}
          direction="column"
          marginTop={10}
          marginBottom={500}
        >
          <Heading
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            textAlign="center"
            marginLeft={5}
            marginBottom={1}
          >
            Nuestro Equipo
          </Heading>
          <Text
            fontSize={{ base: "0.9rem", md: "0.9rem", lg: "1.4rem" }}
            textAlign="center"
            marginBottom={5}
          >
            Contamos los mejores profesionales a su servicio, para asistirlo las
            24 hs. del día
          </Text>
        </Flex>
      </Container>
    </Layout>
  );
};

export default AboutUs;
