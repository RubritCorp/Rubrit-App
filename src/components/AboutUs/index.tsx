//libraries
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  useTheme,
  useColorModeValue,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";
import { Storefront, Wrench, UsersFour, Handshake } from "phosphor-react";

//componentes
import Layout from "../layout";
//la dani en 4
const AboutUs: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box
        bg={useColorModeValue("#BBE1C3", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container maxW={"container.xl"} py={10}>
          <Flex
            justifyContent="center"
            padding={5}
            direction="column"
            marginTop={10}
          >
            <Heading
              fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
              textAlign="center"
              marginBottom={1}
            >
              Revolucionando el trabajo diario
            </Heading>
            <Text
              fontSize={{ base: "l", md: "l", lg: "xl" }}
              textAlign="center"
              marginBottom={5}
            >
              El trabajo diario es importante. Pero también requiere mucho
              tiempo. Podemos ayudarte.
            </Text>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} py={10}>
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
            fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
            textAlign="center"
            marginBottom={2}
          >
            Haga más en menos tiempo
          </Heading>
          <Text
            fontSize={{ base: "l", md: "l", lg: "xl" }}
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
        bg={useColorModeValue("#BBE1C3", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container maxW={"container.xl"} py={10}>
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
                fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                350.000
              </Heading>
              <Text
                fontSize={{ base: "l", md: "l", lg: "xl" }}
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
                fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                16.000
              </Heading>
              <Text
                fontSize={{ base: "l", md: "l", lg: "xl" }}
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
                fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
                textAlign="center"
                fontWeight="bold"
                marginBottom={2}
              >
                4.000
              </Heading>
              <Text
                fontSize={{ base: "l", md: "l", lg: "xl" }}
                textAlign="center"
              >
                nuevos usuarios en el último mes
              </Text>
            </Container>
          </Flex>
        </Container>
      </Box>

      <Container maxW={"container.lg"}>
        <Flex
          justifyContent="flex-start"
          padding={5}
          direction="column"
          marginTop={10}
          marginBottom={90}
        >
          <Heading
            fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
            textAlign="center"
            marginBottom={2}
            marginTop={8}
          >
            Nuestro Equipo
          </Heading>
          <Text
            fontSize={{ base: "l", md: "l", lg: "xl" }}
            textAlign="center"
            marginBottom={75}
          >
            Contamos los mejores profesionales a su servicio, para asistirlo las
            24 hs. del día
          </Text>
          <SimpleGrid columns={[2, null, 4]} spacing="20px">
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/86489779?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Tomás Anastasio
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Buenos Aires, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/74109226?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Santiago Bancalari
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Buenos Aires, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/78768949?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  María Victoria Casal
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Tucumán, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/88420434?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Agustín Castro
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Córdoba, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/89716856?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Oscar Corregidor
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Salta, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={
                    "https://ca.slack-edge.com/TPRS7H4PN-U02MPR191SL-8bd0566e47d4-512"
                  }
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Luis Carlos Enríquez
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  México.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={"https://avatars.githubusercontent.com/u/79219062?v=4"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Eliana Sciclone
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  CABA, Argentina.
                </Text>
              </Box>
            </Flex>
            <Flex marginBottom={2} justifyContent="center">
              <Box height="300px">
                <Avatar
                  height={"11rem"}
                  width={"11rem"}
                  src={
                    "https://ca.slack-edge.com/TPRS7H4PN-U01M0BP7CQJ-416c76e76358-512"
                  }
                  mb={4}
                  pos={"relative"}
                />
                <Heading
                  fontSize={"lg"}
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom={2}
                >
                  Daniela Suárez
                </Heading>
                <Text fontSize={"l"} textAlign="center">
                  Buenos Aires, Argentina.
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Container>
    </Layout>
  );
};

export default AboutUs;
