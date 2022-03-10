import {
    useColorModeValue,
    Flex,
    Box,
    chakra,
    Text,
    Container,
    useTheme,
} from "@chakra-ui/react";

import Layout from "../layout";

const CookiePolicy: React.FC = () => {
    const theme = useTheme();
    return (
        <Layout>
            <Box
                bg={useColorModeValue("#BBE1C3", "dark_green")}
                color={useColorModeValue("dark_green", "medium_grey")}
            >
                <Flex justifyContent="center" p={"2.5em"}>
                    <Text
                        fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
                        fontWeight={300}
                    >
                        POLITICA DE COOKIES
                        <chakra.span fontWeight={"bold"}>
                            {" RUBRIT"}
                        </chakra.span>
                    </Text>
                </Flex>
            </Box>
            <Container maxW="container.xl" centerContent p={"2em 0"}>
                <Box p={"1em 3em "} w="100%" justifyContent="center">
                    <Text as='i' fontSize='lg' textAlign='justify'>
                        <chakra.p
                            fontFamily={"Poppins"}
                            fontWeight={"lighter"}
                        >
                            Esta página web usa cookies. Las cookies de este sitio web se
                            usan para personalizar el contenido y los anuncios, ofrecer
                            funciones de redes sociales y analizar el tráfico. Además,
                            compartimos información sobre el uso que haga del sitio web
                            quienes pueden combinarla con otra información que les haya
                            proporcionado o que hayan recopilado a partir del uso que haya
                            hecho de sus servicios. Las cookies son pequeños archivos de
                            texto que las páginas web pueden utilizar para hacer más
                            eficiente la experiencia del usuario. La ley afirma que podemos
                            almacenar cookies en su dispositivo si son estrictamente
                            necesarias para el funcionamiento de esta página. Para todos los
                            demás tipos de cookies necesitamos su permiso. Esta página
                            utiliza tipos diferentes de cookies. Algunas cookies son
                            colocadas por servicios de terceros que aparecen en nuestras
                            páginas. En cualquier momento puede cambiar o retirar su
                            consentimiento desde la Declaración de cookies en nuestro sitio
                            web. Obtenga más información sobre quiénes somos, cómo puede
                            contactarnos y cómo procesamos los datos personales en nuestra
                            Política de privacidad. Al contactarnos respecto a su
                            consentimiento, por favor, indique el ID y la fecha de su
                            consentimiento. Su consentimiento se aplica a los siguientes
                            dominios: rubrit.com.ar.
                        </chakra.p>
                    </Text>
                </Box>
            </Container>
        </Layout>
    );
};

export default CookiePolicy;