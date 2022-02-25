//library
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Center,
  Stack,
  Heading,
  Button,
  useTheme,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { Star, Check, Checks, CheckCircle } from "phosphor-react";
//native libraries
import Link from "next/link";
//components
import Layout from "../layout";
import Comments from "../Comments";
//assets
import Map from "/src/assets/mapa.jpg";

const categories = [
  {
    name: "Electricista",
    subcategories: ["Instalaciones", "Iluminacion", "Electricidad general"],
  },
  {
    name: "Plomero",
    subcategories: [
      "Sanitarios",
      "Griferia",
      "Filtraciones",
      "Calderas",
      "Bombas de agua",
      "Pozos septicos",
      "Tanques de agua",
    ],
  },
  {
    name: "Gasista",
    subcategories: [
      "Artefactos a gas",
      "Instalacion de calderas",
      "Reparacion de calderas",
    ],
  },
];
const ProfessionalLanding: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxW={"container.xl"} padding={"0 0.2em"}>
      <Layout>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
        >
          <Box margin={"1rem"}>
            <Image
              src="https://bit.ly/dan-abramov"
              borderRadius="full"
              margin={"1rem"}
              alt={"Dan Abramov"}
            ></Image>
          </Box>
          <Flex flexDirection={"column"} marginRight={"2rem"}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
            >
              <Box padding={"1rem"}>
                <Box>
                  <Heading
                    fontSize={{ base: "1rem", md: "1.2rem", lg: "2rem" }}
                  >
                    Jose Cito
                  </Heading>

                  <Text color={theme.colors.medium_green}>Plomero</Text>
                  <Text>Buenos Aires</Text>
                </Box>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"row"}>
                    <Star size={20} weight="fill" />

                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      90% de satisfaccion
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Check size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      900 Trabajos realizados
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Checks size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      97% formalidad
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Link href="/">
                  <Box
                    as={"button"}
                    width={"15rem"}
                    height={"3rem"}
                    borderRadius={"10px"}
                    bg={theme.colors.medium_green}
                    color={"white"}
                    fontSize={"1.3rem"}
                  >
                    Pedir Cotizacion
                  </Box>
                </Link>
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  padding={"0.5rem"}
                >
                  <CheckCircle
                    size={30}
                    weight="fill"
                    color={theme.colors.medium_green}
                  />
                  <Text fontSize={"0.6rem"}>
                    TOP (dentro de los 20 mejores de la zona)
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Container maxW={"container.lg"}>
          <Flex margin={"1rem"} flexDirection={"column"} textAlign={"start"}>
            <Heading fontSize={"1.5rem"}>
              Soy el indicado para trabajar:
            </Heading>
            <Text fontSize={"0.8rem"}>
              Soy plomero hace muchos años y nunca mostre la raja, soy ideal
              para el empleo y para bailar en tu despedida de soltero porque...
            </Text>
          </Flex>
        </Container>
        <Container maxW={"container.lg"}>
          <Flex flexDirection={"column"}>
            <Flex
              flexWrap={{
                base: "wrap",

                md: "wrap",
                lg: "nowrap",
              }}
            >
              <Stack margin={"1rem"}>
                <Box>
                  <Heading
                    fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                    color={theme.colors.light_grey_sub[500]}
                  >
                    DESCRIPCION
                  </Heading>
                  <Text margin={"1em"}>
                    Me gusta la cumbia y coleccionar cupones de descuentos.
                  </Text>
                </Box>
                <Divider></Divider>
                <Box margin={"1em 0"}>
                  <Heading
                    fontSize={{
                      base: "1rem",
                      md: "1.2rem",
                      lg: "1.5rem",
                    }}
                    color={theme.colors.light_grey_sub[500]}
                  >
                    TRABAJOS REALIZADOS
                  </Heading>
                  <Flex
                    flexDirection={"row"}
                    flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
                  >
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Box>
                <Flex flexDirection={"column"} margin={"1rem"}>
                  <Heading
                    fontSize={{
                      base: "1rem",
                      md: "1.2rem",
                      lg: "1.5rem",
                    }}
                    color={theme.colors.light_grey_sub[500]}
                  >
                    DOCUMENTACION
                  </Heading>
                  <Flex flexDirection={"row"}>
                    <Image
                      maxW="100px"
                      src="https://www.mercurynews.com/wp-content/uploads/2019/06/SCHWARZENEGGER_DIPLOMAS_2_.jpg?w=1442"
                      borderRadius="0.4rem"
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://m.media-amazon.com/images/I/81q4U2Jtg7L._AC_SL1500_.jpg"
                      borderRadius="0.4rem"
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Flex>
              </Stack>
              <Box margin={"1rem"}>
                <Heading
                  fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                  color={theme.colors.light_grey_sub[500]}
                >
                  UBICACION
                </Heading>
                <Image
                  src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                  maxW={"300px"}
                  borderRadius="1rem"
                  margin={"1em 0"}
                  alt="Dan Abramov"
                ></Image>
              </Box>
            </Flex>
            <Flex flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}>
              <Flex
                maxH={{ base: "550px", sm: "350px", md: "550px" }}
                overflowY="auto"
              >
                <Comments />
              </Flex>
              <Box borderRadius={"10px"} margin={"2em"}>
                <Flex
                  flexDirection={"column"}
                  padding={"1em"}
                  boxShadow={"lg"}
                  overflowY={"auto"}
                >
                  {categories?.map((cat) => {
                    return (
                      <Flex flexDirection={"column"}>
                        <Heading
                          fontSize={{
                            base: "1rem",
                            md: "1.2rem",
                            lg: "1.5rem",
                          }}
                          color={theme.colors.light_grey_sub[500]}
                        >
                          {cat.name}
                        </Heading>
                        <Box>
                          {cat.subcategories.map((sub) => (
                            <Text>{sub}</Text>
                          ))}
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Layout>
    </Container>
  );
};

export default ProfessionalLanding;