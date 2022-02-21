//libraries
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Center,
  Stack,
  Heading,
} from "@chakra-ui/react";
import {
  CalendarCheck,
  MagnifyingGlass,
  Calendar,
  CheckCircle,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
} from "phosphor-react";

//native libraries
import Link from "next/link";
//componentes
import Layout from "../layout";
//styles

const FindServices: React.FC = () => {
  return (
    <Container maxW="container.md">
      <Layout>
        <Flex justifyContent="center">
          <Text fontSize="4xl">COMO FUNCIONA RUBRIT</Text>
        </Flex>
        <Box>
          <Flex margin={5} border="1px" borderRadius="10px" padding={3}>
            <Stack direction="row" padding={5}>
              <Center>
                <NumberCircleOne size={30} weight="fill" />
              </Center>
            </Stack>
            <Box>
              <Flex alignItems="center">
                <CalendarCheck size={45} weight="light" />
                <Heading size="md">DESCRIBI LAS TAREAS</Heading>
              </Flex>
              <Text>
                Haces una breve descripcion del trabajo que estas necesitando
                hacer. Si queres podes adjuntar fotos para que el profesional
                que lo vea tenga una idea mas exacta de lo que hay que hacer.
              </Text>
            </Box>
          </Flex>
          <Flex margin={5}>
            <Stack direction="row" padding={5}>
              <Center>
                <NumberCircleTwo size={30} weight="fill" />
              </Center>
            </Stack>

            <Box>
              <Flex alignItems="center">
                <MagnifyingGlass size={45} weight="light" />
                <Heading size="md">BUSCAR PROFESIONALES Y PRECIOS</Heading>
              </Flex>
              <Text>
                Busca en nuestra lista de profesionales cual te parece el mas
                indicado, vas a poder elegir varios filtros. Entre estos,
                calificaciones, reseñas, material grafico de sus trabajos.
              </Text>
            </Box>
          </Flex>
          <Flex margin={5}>
            <Stack direction="row" padding={5}>
              <Center>
                <NumberCircleThree size={30} weight="fill" />
              </Center>
            </Stack>
            <Box>
              <Box display="flex" alignItems="center">
                <Calendar size={45} weight="light" />
                <Heading size="md">ELEGI FECHA Y HORA</Heading>
              </Box>
              <Text>
                Selecciona segun la disponibilidad horaria del profesional un
                horario que te quede comodo para que se pueda realizar el
                trabajo .
              </Text>
            </Box>
          </Flex>
          <Flex margin={5}>
            <Stack direction="row" padding={5}>
              <Center>
                <NumberCircleFour size={30} weight="fill" />
              </Center>
            </Stack>
            <Box>
              <Box display="flex" alignItems="center">
                <CheckCircle size={45} weight="light" />
                <Heading size="md">CONFIRMA</Heading>
              </Box>
              <Text>
                Felicitaciones!!! ya completaste todo el formulario. nunca antes
                fue tan facil y seguro contratar a un profesional para que te
                haga el trabajo.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </Container>
  );
};

export default FindServices;
