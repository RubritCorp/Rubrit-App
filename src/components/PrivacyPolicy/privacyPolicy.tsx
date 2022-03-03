import {
  useColorModeValue,
  ChakraProvider,
  Flex,
  Box,
  chakra,
  Text,
  Container,
  useTheme,
} from "@chakra-ui/react";

import Layout from "../layout";

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Box
        bg={useColorModeValue("medium_grey", "dark_green")}
        color={useColorModeValue("dark_green", "medium_grey")}
      >
        <Flex justifyContent="center" p={"2.5em"}>
          <Text
            fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
            fontWeight={400}
          >
            POLITICA DE PRIVACIDAD
            <chakra.span  fontWeight={"bold"}>
              {" RUBRIT"}
            </chakra.span>
          </Text>
        </Flex>
      </Box>
      <ChakraProvider theme={theme}>
        <Container maxW="container.xl" p={"2em 0"}>
          <Box p={"1em 3em 0 3em"} w="100%" justifyContent="center">
            <Text as='i' fontSize='lg'>
              <chakra.p
                fontFamily={"Poppins"}
                fontWeight={"lighter"}
              >
                La presente Política de Privacidad establece los términos en que
                RUBRIT usa y protege la información que es proporcionada por sus
                usuarios al momento de utilizar su sitio web. Esta compañía está
                comprometida con la seguridad de los datos de sus usuarios.
                Cuando le pedimos llenar los campos de información personal con
                la cual usted pueda ser identificado, lo hacemos asegurando que
                sólo se empleará de acuerdo con los términos de este documento.
                Sin embargo esta Política de Privacidad puede cambiar con el
                tiempo o ser actualizada por lo que le recomendamos y
                enfatizamos revisar continuamente esta página para asegurarse
                que está de acuerdo con dichos cambios. Información que es
                recogida Nuestro sitio web podrá recoger información personal
                por ejemplo: Nombre, información de contacto como su dirección
                de correo electrónica e información demográfica. Así mismo
                cuando sea necesario podrá ser requerida información específica
                para procesar algún pedido o realizar una entrega o facturación.
                Uso de la información recogida Nuestro sitio web emplea la
                información con el fin de proporcionar el mejor servicio
                posible, particularmente para mantener un registro de usuarios,
                de pedidos en caso que aplique, y mejorar nuestros productos y
                servicios. Es posible que sean enviados correos electrónicos
                periódicamente a través de nuestro sitio con ofertas especiales
                otra información publicitaria que consideremos relevante para
                usted o que pueda brindarle algún beneficio, estos correos
                electrónicos serán enviados a la dirección que usted proporcione
                y podrán ser cancelados en cualquier momento. RUBRIT está
                altamente comprometido para cumplir con el compromiso de
                mantener su información segura. Usamos los sistemas más
                avanzados y los actualizamos constantemente para asegurarnos que
                no exista ningún acceso no autorizado.
              </chakra.p>
            </Text>
          </Box>
        </Container>
      </ChakraProvider>
    </Layout>
  );
};

export default PrivacyPolicy;
