import {
  useColorModeValue,
  Heading,
  Flex,
  Box,
  chakra,
  Text,
  Container,
  useTheme,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import Layout from "../layout";

const Faqs: React.FC = () => {
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
            fontWeight={400}
          >
            PREGUNTAS FRECUENTES
            <chakra.span fontWeight={"bold"}>{" RUBRIT"}</chakra.span>
          </Text>
        </Flex>
      </Box>
      <Center>
        <Heading
          size="lg"
          padding={"1rem 0"}
          color={theme.colors.medium_green}
          fontWeight={"lighter"}
        >
          Soy Usuario
        </Heading>
      </Center>
      <Container maxW="container.xl" p={"2em 2em"}>
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
                  <Text
                    fontSize={{ base: "3.5rem", md: "1rem", lg: "1rem" }}
                    fontWeight={400}
                    fontFamily={"Poppins"}
                  >
                  ¿Que es Rubrit?
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Rubrit es una plataforma gratuita donde podrás solicitar de manera
              rápida y sencilla servicios de diferentes profesionales para
              cualquier trabajo que quieras realizar en tu hogar.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Como me Registro?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Puedes registrarte con tu correo electrónico o con tu cuenta de
              Facebook. En ambos casos es necesario tu teléfono para verificar
              tu cuenta.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Como veo mis datos?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Para ver tus datos, tan solo tienes que entrar en tu perfil.
              Puedes acceder haciendo clic en el icono de la rueda (arriba a la
              izquierda), donde verás la opción “Mi perfil”.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Puedo editar mi informacion de perfil?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Sí, tan solo tienes que ingresar en tu perfil. Podrás editar tu
              nombre y tu contraseña.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cómo cambio mi email?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Por motivos de seguridad, SI es posible cambiar el correo
              electrónico (email) y volver a registrarte en Rubrit.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cuánto cuesta hacer una solicitud de presupuesto?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              ¡Rubrit es gratis! No tiene ningún coste, solo tienes que
              registrarte y podrás hacer solicitudes a los servicios que
              necesites.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  Cómo hacer una solicitud
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Para hacer una solicitud en Rubrit solo tienes que buscar el
              servicio que necesitas. Puedes hacerlo de dos maneras: desde el
              menú principal de Rubrit podrás hacer clic en el círculo central
              para ver todas las categorías disponibles, o hacer clic en la lupa
              superior derecha para buscar el servicio. Una vez que encuentres
              el servicio que estás buscando, solo haz clic sobre él y podrás
              comenzar tu solicitud.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Qué información tengo que añadir en mi solicitud?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Cuando hagas una solicitud es importante que indiques brevemente
              el servicio que necesitas en el título, así los profesionales
              sabrán rápidamente de qué se trata (por ejemplo, “Humedad en el
              techo del baño”). Después, podrás explicar más sobre el trabajo en
              la descripción del servicio (¡Recuerda! Cuantos más detalles
              ofrezcas, más fácil será para los profesionales poder ayudarte).
              Ahora solo falta que añadas la ubicación en la que necesitas el
              servicio y alguna imagen del problema. ¡Toda información es
              bienvenida!
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cuántas cuentas puedo tener en Rubrit?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Los usuarios de Rubrit deberán contar con un único perfil en la
              plataforma, es decir, no podrán tener más de una cuenta/perfil
              asociado a su persona. Tal y como indicamos en nuestros Términos y
              Condiciones(Términos y Condiciones) , en caso de detectar un
              comportamiento inapropiado por parte del usuario, donde tenga más
              de una cuenta para su persona, Rubrit podrá modificar, restringir
              y/o desactivar sin previo aviso el uso de dichos perfiles.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  Quiero darme de baja
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Podrás darte de baja desde la pagina web, en la sección Atención
              al cliente del menú rueda (arriba a la izquierda). Sino, también
              puedes escribirnos a baja@tubrit.com confirmándonos que quieres
              darte de baja de la plataforma
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <Center>
        <Heading
          size="lg"
          padding={"1rem 0"}
          color={theme.colors.medium_green}
          fontWeight={"lighter"}
        >
          Soy Profesional
        </Heading>
      </Center>
      <Container maxW="container.xl" p={"2em 2em "}>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  color: "medium_green",
                  outline: "none",
                }}
              >
                <Box flex="1" textAlign="left">
                  ¿Que es Rubrit?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Rubrit es una plataforma gratuita donde podrás recibir y responder
              de manera rápida y sencilla las solicitudes de clientes que buscan
              servicios como los que tú ofreces.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿En cuántas categorías me puedo inscribir?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Te podrás inscribir en un máximo de 3 categorías y, dentro de
              ellas, seleccionar todas las subcategorías que quieras. Recuerda
              elegir aquellas en las que estés especializado y puedas ofrecer el
              mejor servicio a los clientes.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cómo cambio mi email?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Por motivos de seguridad,SI es posible cambiar el correo
              electrónico (email) y volver a registrarte  en Rubrit.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Puedo cambiar mi ubicación?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Sí, puedes cambiar tu ubicación siempre que quieras.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cuántas imágenes de mis trabajos puedo añadir a mi perfil?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Puedes subir tres tipos de fotos a tu perfil: tu foto de perfil,
              tu imagen de fondo (te recomendamos que esté relacionada con tus
              servicios) y las fotos de tus trabajos realizados. Cuando vayas a
              subir este tipo de fotos, comprueba que dispones de una buena
              conexión a Internet ya que, si no es así, es posible que la
              información no se envíe correctamente. Verifica esto y si persiste
              el error, comunícate con el equipo de Rubrit en el email
              soporte@Rubrit.com.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cómo selecciono mis categorías de trabajo?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Desde la información de tu perfil, haz clic en Categorías y podrás
              seleccionar hasta un máximo de 3 categorías. Asegúrate de
              inscribirte en aquellas que más se adecuen a los servicios que
              ofreces, ya que las solicitudes que recibas corresponderán a las
              categorías que has elegido.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  No existe una categoría para los servicios que ofrezco, ¿qué
                  hago?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Si ves que el servicio que ofreces no aparece en la app, no dudes
              en escribirnos a hola@timbrit.com con tu sugerencia. La
              trasladaremos para valorarla de cara a incorporarla en posibles
              mejoras futuras de timbrit.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Qué es ser profesional certificado en Rubrit?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Un profesional certificado es aquel que ha seguido un proceso de
              verificación de datos más exhaustivo (documento de identidad y
              antecedentes penales). Es una manera de aportar mayor seguridad a
              la comunidad de timbrit, añadir seguridad a tu perfil y, sobre
              todo, al cliente a la hora de contratar los servicios de un
              profesional.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  ¿Cómo encuentro clientes?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              No existe una lista en la que puedas revisar los servicios que
              necesitan los clientes. Si eres profesional tendrás que esperar a
              recibir la solicitud de un cliente para poder enviar presupuestos
              (cotizaciones). Cuando un cliente haga una solicitud de trabajo
              relacionada con tus servicios y dentro de tu rango de cobertura,
              recibirás una notificación con la información de lo que necesita.
              Entonces podrás contactar con el cliente, chatear y le podrás
              enviar cotizaciones. Puedes comprobar tus solicitudes recibidas en
              la sección Solicitudes de tu perfil en Rubrit.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{  color: "medium_green" }}
              >
                <Box flex="1" textAlign="left">
                  Cómo denunciar a un usuario
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Los valores de Rubrit buscan construir una comunidad basada en el
              respeto. Si consideras que has recibido un trato contrario a este
              espíritu o se ha producido un uso inadecuado de la app por parte
              de un usuario, puedes denunciarle.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Layout>
  );
};

export default Faqs;
