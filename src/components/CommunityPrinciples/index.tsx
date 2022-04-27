import {
  useColorModeValue,
  Flex,
  Box,
  chakra,
  Text,
  Container,
  useTheme,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
//components
import Layout from "../layout";

const CommunityPrinciples: React.FC = () => {
  return (
    <Layout>
      <Box
        bg={useColorModeValue("#BBE1C3", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Flex justifyContent="center" p={"2.5rem"}>
          <Text
            fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
            fontWeight={300}
            as="i"
          >
            PRINCIPIOS DE LA COMUNIDAD
            <chakra.span fontWeight={"bold"}>{" RUBRIT"}</chakra.span>
          </Text>
        </Flex>
      </Box>
      <Container maxW="container.xl" centerContent w="100%" p={"2em 2em"}>
        <Box justifyContent="center">
          <Text as="i" fontSize="lg">
            <chakra.p fontFamily={"Poppins"} fontWeight={"lighter"}>
              <UnorderedList spacing={5}>
                <UnorderedList spacing={4}>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{
                            color: "medium_green",
                            textDecoration: "none",
                          }}
                        >
                          <Box flex="1" textAlign="left">
                            Sastifacer
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListItem>
                          Satisfacer las expectativas de nuestros clientes de
                          las plataformas informáticas y de comunicaciones de
                          Empleos y Servicios de, aumentando la eficacia de las
                          conexiones y los intercambios entre personas ,
                          logrando de esta forma ampliar las oportunidades de
                          interacción entre ellos.
                        </ListItem>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{
                            color: "medium_green",
                            textDecoration: "none",
                          }}
                        >
                          <Box flex="1" textAlign="left">
                            Brindar
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListItem>
                          Brindar soluciones tecnológicas y un servicio de
                          excelencia a los fines de mantener el objetivo
                          estratégico de ser lider en servicios comunitario
                          donde competimos. Buscar en forma continua optimizar y
                          mejorar nuestros procesos y costos, con el fin de
                          fomentar relaciones a largo plazo y comprometidos con
                          el crecimiento permanente de los mercados.
                        </ListItem>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{
                            color: "medium_green",
                            textDecoration: "none",
                          }}
                        >
                          <Box flex="1" textAlign="left">
                            Promover
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListItem>
                          Promover el desarrollo y la capacitación de nuestros
                          profesionales, en un ambiente de trabajo en equipo,
                          respeto y colaboración, a los fines de lograr su
                          satisfacción y el máximo compromiso con la calidad y
                          la mejora continua.
                        </ListItem>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{
                            color: "medium_green",
                            textDecoration: "none",
                          }}
                        >
                          <Box flex="1" textAlign="left">
                            Comprender
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListItem>
                          Comprender las necesidades y expectativas de las
                          partes interesadas, buscando mejorar en forma continua
                          nuestro sistema de gestión de la calidad.
                        </ListItem>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{
                            color: "medium_green",
                            textDecoration: "none",
                          }}
                        >
                          <Box flex="1" textAlign="left">
                            Honrar
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListItem>
                          Honrar los compromisos asumidos y requisitos legales,
                          reglamentarios y societarios aplicables, generando
                          confianza, seguridad y fidelidad, tanto en los
                          clientes como en las diversas partes interesadas.
                        </ListItem>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </UnorderedList>
              </UnorderedList>
            </chakra.p>
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};

export default CommunityPrinciples;
