import {
  useColorModeValue,
  Flex,
  Box,
  chakra,
  Text,
  Container,
  Stack,
  useTheme,
  ListItem,
  UnorderedList,
  border,
} from "@chakra-ui/react";

import Layout from "../layout";

const ComunityPrinci: React.FC = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Box
        bg={useColorModeValue("medium_grey", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Flex justifyContent="center" p={"3.5em"}>
          <Text
            fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
            fontWeight={300}
            as='i'
          >
            PRINCIPIOS DE LA COMUNIDAD
            <chakra.span fontWeight={"bold"}>{" RUBRIT"}</chakra.span>
          </Text>
        </Flex>
      </Box>
      <Container maxW="container.xl" w="90%" p={"1em  1em 2em 0"}>
        <Box p={"2em 1em 0 3em"} justifyContent="center">
          <Text as='i' fontSize='lg'>
            <chakra.p
              fontFamily={"Poppins"}
              fontWeight={"lighter"}

            >
              <UnorderedList
                spacing={5}
              >
                <UnorderedList spacing={4}>
                  <ListItem>
                    Satisfacer las expectativas de nuestros clientes de las
                    plataformas informáticas y de comunicaciones de Empleos y
                    Servicios de, aumentando la eficacia de las conexiones y los
                    intercambios entre personas , logrando de esta forma ampliar
                    las oportunidades de interacción entre ellos.
                  </ListItem>
                  <ListItem>
                    Brindar soluciones tecnológicas y un servicio de excelencia
                    a los fines de mantener el objetivo estratégico de ser lider
                    en servicios comunitario donde competimos. Buscar en forma
                    continua optimizar y mejorar nuestros procesos y costos, con
                    el fin de fomentar relaciones a largo plazo y comprometidos
                    con el crecimiento permanente de los mercados.
                  </ListItem>
                  <ListItem>
                    Promover el desarrollo y la capacitación de nuestros
                    profesionales, en un ambiente de trabajo en equipo, respeto
                    y colaboración, a los fines de lograr su satisfacción y el
                    máximo compromiso con la calidad y la mejora continua.
                  </ListItem>
                  <ListItem>
                    Comprender las necesidades y expectativas de las partes
                    interesadas, buscando mejorar en forma continua nuestro
                    sistema de gestión de la calidad.
                  </ListItem>
                  <ListItem>
                    Honrar los compromisos asumidos y requisitos legales,
                    reglamentarios y societarios aplicables, generando
                    confianza, seguridad y fidelidad, tanto en los clientes como
                    en las diversas partes interesadas.
                  </ListItem>
                </UnorderedList>
              </UnorderedList>
            </chakra.p>
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};

export default ComunityPrinci;
