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

//native libraries
import Link from "next/link";
import { useRouter } from "next/router";
//componentes
import Layout from "../layout";
import ProfessionalService from "./ProfessionalService";

//styles

const Services: React.FC = () => {
  const theme = useTheme();

  const { query } = useRouter();
  const { service } = query;

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
            <Heading fontSize={"2xl"} textAlign="center" marginBottom={1}>
              {service} en CORDOBA
            </Heading>
            <Text fontSize={"xl"} textAlign="center" marginBottom={5}>
              Chatea al instante con profesionales de confianza. No compartimos
              ni tu dirección ni tu teléfono con nadie.
            </Text>
          </Flex>
        </Container>
      </Box>
      <Flex justifyContent="center">
        <Flex flexDirection="column">
          <Link href="/" passHref>
            <Box
              mt={-6}
              as="button"
              width="16rem"
              height="2.5rem"
              borderRadius="10px"
              bg={theme.colors.medium_green}
              color="white"
              fontSize="1.6rem"
            >
              Cotizá gratis
            </Box>
          </Link>
        </Flex>
      </Flex>
      <Flex>
        <ProfessionalService />
      </Flex>
    </Layout>
  );
};

export default Services;
