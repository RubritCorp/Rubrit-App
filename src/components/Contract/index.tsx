import {
  InputGroup,
  Button,
  Text,
  Container,
  Box,
  Center,
  FormLabel,
  ListItem,
  OrderedList,
  useTheme,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { InputControl, TextareaControl, SubmitButton } from "formik-chakra-ui";
import { Session } from "next-auth/core/types";

import useHelper from "./useHelper";

type Props = {
  session: Session;
};

const Contract = ({ session }: Props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    show,
    setShow,
    loading,
    setLoading,
  } = useHelper(session);

  return (
    <Container maxW="container.md" centerContent py={10} boxShadow={"2xl"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors, handleBlur }) => (
          <Box as="form" onSubmit={handleSubmit as any} justifyContent="center">
            <Center>
              <Heading
                as="h1"
                size="xl"
                mb={4}
                color={"medium_green"}
                fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
                fontWeight={300}
                p={"0.5em"}
              >
                Contrato
              </Heading>
            </Center>
            
            <Text>Segun los terminos de este acuerdo entre el</Text>
            <Text>Cliente:</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>nombre del cliente</FormLabel>
                <InputGroup>
                  <InputControl
                    inputProps={{
                      placeholder: "name",
                      type: show ? "text" : "nameClient",
                      autoComplete: "off",
                    }}
                    name="nameClient"
                  />
                </InputGroup>
              </GridItem>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Email cliente</FormLabel>
                <InputGroup>
                  <InputControl
                    name="emailClient"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "email",
                      type: show ? "text" : "emailClient",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Direccion cliente</FormLabel>
                <InputGroup>
                  <InputControl
                    name="addressClient"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "address",
                      type: show ? "text" : "addressClient",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>

            <Text>y el Profesional:</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Nombre profesional</FormLabel>
                <InputGroup>
                  <InputControl
                    name="nameProfessional"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "name",
                      type: show ? "text" : "nameProfessional",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Direccion profesional</FormLabel>
                <InputGroup>
                  <InputControl
                    name="addressProfessional"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "address",
                      type: show ? "text" : "addressProfessional",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Email profesional</FormLabel>
                <InputGroup>
                  <InputControl
                    name="emailProfessional"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "email",
                      type: show ? "text" : "emailProfessional",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Text>
              acepta proporcionar al cliente anterior los servicios de la tarea
              descritos en el contrato a continuación.
            </Text>
            <Text>Inicio y ubicacion de la tarea:</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Fecha de inicio</FormLabel>
                <InputGroup>
                  <InputControl
                    name="currentDate"
                    inputProps={{
                      placeholder: "Fecha",
                      type: "date",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Direccion del trabajo</FormLabel>
                <InputGroup>
                  <InputControl
                    name="addressWork"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "address",
                      type: show ? "text" : "addressWork",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Text>El profesional acuerda terminar el trabajo el dia de:</Text>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Duracion aproximada de la tarea</FormLabel>
                <InputGroup>
                  <InputControl
                    name="approxDuration"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "Duracion",
                      type: show ? "text" : "approxDuration",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Text>Las actividades de las tareas incluyen:</Text>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Detalles de la tarea</FormLabel>
                <InputGroup>
                  <TextareaControl
                    name="details"
                    label="detalles"
                    placeholder="detalles"
                    resize="vertical"
                    onBlur={handleBlur}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Text
              fontSize="15px"
              fontWeight="bold"
              p={"0.5em"}
            >
              Terminos generales
            </Text>
            <OrderedList>
              <ListItem>
                <Text>
                  El cliente acepta que el profesional pueda utilizar sus datos
                  personales para el envio de información y comunicaciones
                  relacionadas con el trabajo.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El profesional acepta que el cliente pueda utilizar sus datos
                  personales para el envio de información y comunicaciones
                  relacionadas con el trabajo.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El profesional sera responsable de la calidad del trabajo.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El profesional sera responsable de todo el equipo de trabajo,
                  incluyendo el personal de apoyo.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El profesional retirara todo los resto del trabajo y el equipo
                  de trabajo, incluyendo el personal de apoyo,una vez finalizada
                  las tareas
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El profesional sera el unico responsable de pagar a sus
                  empleados y subcontratistas.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El cliente acepta que cualquier cambio en el trabajo se
                  realizara a su discrecion.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El cliente acepta pagar cualquier costo adicional incurrido
                  por el trabajo.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  El cliente se compromete a facilitar al profesional el acceso
                  a propiedad durante el trabajo.
                </Text>
              </ListItem>
            </OrderedList>
            <Text>Pago</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Text>
                El costo total del trabajo incluidos los materiales y la mano de
                obra es:{" "}
              </Text>
              <GridItem w="100%" h="40">
                <FormLabel mt={4}>Presupuesto de la tarea</FormLabel>
                <InputGroup>
                  <InputControl
                    name="budget"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "budget",
                      type: show ? "text" : "budget",
                      autoComplete: "off",
                    }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Text
              fontSize="15px"
              fontWeight="bold"
              p={"0.5em"}
            >
              Cancelacion:
            </Text>
            <Text>
              El cliente sera responsable de pagar todos los costos de los
              materiales si el trabajo se cancela dentro de tantos dias iniciado
              el trabajo.
            </Text>
            <Text>
              El cliente sera responsable de pagar todos los costos de los
              materiales si el trabajo se cancela dentro de tantos dias iniciado
              el trabajo.
            </Text>
            <Center>
              <Button
                w={"10rem"}
                mb={{ base: "1rem", md: 0 }}
                p="0.5em 0em"
                colorScheme="teal"
                fontSize={{ base: "xs", md: "l", lg: "l" }}
                disabled={
                  Object.keys(errors).length > 0 ||
                  !Object.values(values)[0].length
                    ? true
                    : false
                }
                isLoading={loading}
              >
                Crear Contrato
              </Button>
            </Center>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Contract;
