import {
  useColorModeValue,
  Text,
  Box,
  ListItem,
  OrderedList,
  Button,
  useTheme,
  VStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Cliente, Profesional } from "./myDatos";
import SignaturePad from "react-signature-canvas";
import { InputControl, TextareaControl } from "formik-chakra-ui";
import useHelper from "./useHelper";
import { Session } from "next-auth/core/types";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Form: React.FC<{ session: Session }> = ({ session }) => {
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated, code } = router.query;
  const signatureRef = useRef<any>(null);
  const signsave = useRef<any>(null);
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState(false);

  const saveSignature = (signature: any) => {
    setImageData(signature);
  };

  const deleteSignature = () => {
    signatureRef.current.clear();
  };

  const deleteCli = () => {
    signsave.current.clear();
  };

  const save = () => {
    console.log(signatureRef.current.getTrimmedCanvas().toDataURL());
  };

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  const {
    initialValues,
    validationSchema,
    onSubmit,
    input,
  } = useHelper(session, `${isAuthenticated}`, `${code}`);
  return (
    <VStack
      as="form"
      mx="auto"
      w={{ base: "90%", md: 500 }}
      h="auto"
      justifyContent="center"
    >
      <Heading
        color={"medium_green"}
        fontSize={{ base: "1.5rem", md: "1rem", lg: "2.5rem" }}
        fontWeight={300}
        p={"0.5em"}
      >
        Contrato de Acuerdo
      </Heading>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors, handleBlur }) => (
            <Box as="form" onSubmit={handleSubmit as any}>
              <Text>Segun los terminos de este acuerdo,</Text>
              <Text>Cliente:</Text>
              <InputControl
                name="nameCliente"
                inputProps={{
                  placeholder: "name",
                  type: "text",
                  autoComplete: "off",
                  value: Cliente.name,
                }}
              />
                
            
              <InputControl
                name="emailUser"
                inputProps={{
                  placeholder: "email",
                  type: "email",
                  autoComplete: "off",
                  value: Cliente.email,
                }}
              />
              <InputControl
                name="addressUser"
                inputProps={{
                  placeholder: "direcciónCliente",
                  type: "text",
                  autoComplete: "off",
                  value: Cliente.address,
                }}
              />
              <Text>Profesional:</Text>
              <InputControl
                name="nameProfesional"
                inputProps={{
                  placeholder: " name",
                  type: "text",
                  autoComplete: "off",
                  value: Profesional.name,
                }}
              />
              <InputControl
                name="emailProfesional"
                inputProps={{
                  placeholder: "email",
                  type: "email",
                  autoComplete: "off",
                  value: Profesional.email,
                }}
              />
              <InputControl
                name="addressProfesional"
                inputProps={{
                  placeholder: "dirección",
                  type: "text",
                  autoComplete: "off",
                  value: Profesional.address,
                }}
              />
              <Text>
                acepta proporcionar al cliente anterior los servicios de la
                tarea descritos en el contrato a continuación.
              </Text>
              <Text>Inicio y ubicacion de la tarea:</Text>
              <InputControl
                name="addressUser"
                inputProps={{
                  placeholder: "direcciónTarea",
                  type: "text",
                  autoComplete: "off",
                }}
              />
              <Text>El profesional acuerda comenzar el trabajo el dia de:</Text>
              <InputControl
                name="currentDate"
                inputProps={{
                  placeholder: "Fecha",
                  type: "date",
                  autoComplete: "off",
                  onBlur: handleBlur,
                }}
              />
              <Text>El profesional acuerda terminar el trabajo el dia de:</Text>
              <InputControl
                name="approxDuration"
                inputProps={{
                  placeholder: "duracionAproximada",
                  type: "text",
                  autoComplete: "off",
                  onBlur: handleBlur,
                }}
              />
              <Text>Las actividades de las tareas incluyen:</Text>
              <TextareaControl
                name="details"
                label="detalles"
                placeholder="detalles"
                resize="vertical"
                onBlur={handleBlur}
              />
              <Text
                fontSize={{ base: "0.5rem", md: "0.5rem", lg: "1.5rem" }}
                fontWeight={300}
                p={"0.5em"}
              >
                Terminos generales
              </Text>

              <OrderedList>
                <ListItem>
                  <Text>
                    El cliente acepta que el profesional pueda utilizar sus
                    datos personales para el envio de información y
                    comunicaciones relacionadas con el trabajo.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    El profesional acepta que el cliente pueda utilizar sus
                    datos personales para el envio de información y
                    comunicaciones relacionadas con el trabajo.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    El profesional sera responsable de la calidad del trabajo.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    El profesional sera responsable de todo el equipo de
                    trabajo, incluyendo el personal de apoyo.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    El profesional retirara todo los resto del trabajo y el
                    equipo de trabajo, incluyendo el personal de apoyo,una vez
                    finalizada las tareas
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
                    El cliente se compromete a facilitar al profesional el
                    acceso a propiedad durante el trabajo.
                  </Text>
                </ListItem>
              </OrderedList>
              <Text>Pago</Text>
              <Text>
                El costo total del trabajo incluidos los materiales y la mano de
                obra es:{" "}
              </Text>
              <InputControl
                name="budget"
                inputProps={{
                  placeholder: "presupuesto",
                  type: "Number",
                  autoComplete: "off",
                  onBlur: handleBlur,
                }}
              />
              <Text>Cancelacion:</Text>
              <Text>
                El cliente sera responsable de cancelar el trabajo en caso de
                que el profesional no cumpla con las tareas.
              </Text>
              <Text>
                El cliente sera responsable de pagar todos los costos de los
                materiales si el trabajo se cancela dentro de tantos dias
                iniciado el trabajo.
              </Text>
              <Text>
                Al firmar a continuación, ambas partes aceptan estar sujetas a
                los términos de este contrato.
              </Text>
            </Box>
          )}
        </Formik>
      </Box>
      <Box mt={4}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors }) => (
            <Box as="form" onSubmit={handleSubmit as any}>
              <InputControl
                name="nameCliente"
                inputProps={{
                  placeholder: "nameCliente",
                  type: "text",
                  autoComplete: "off",
                  value: Cliente.name,
                }}
              />
            </Box>
          )}
        </Formik>
      </Box>
      <SignaturePad
        canvasProps={{
          width: 300,
          height: 120,
          style: { border: "1px solid #000000" },
        }}
        minWidth={2}
        maxWidth={3}
        penColor={useColorModeValue("#000000", "#ffffff")}
        ref={signsave}
      />
      <Button onClick={deleteCli}>Borrar</Button>
      <Button onClick={save}>Guardar</Button>
      <Text>Firma del cliente</Text>
      <Box mt={4}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors }) => (
            <Box as="form" onSubmit={handleSubmit as any}>
              <InputControl
                name="nameProfesional"
                inputProps={{
                  placeholder: "nameProfesional",
                  type: "text",
                  autoComplete: "off",
                  value: Profesional.name,
                }}
              />
            </Box>
          )}
        </Formik>
      </Box>
      <SignaturePad
        canvasProps={{
          width: 300,
          height: 120,
          style: { border: "1px solid #000000" },
        }}
        minWidth={2}
        maxWidth={3}
        penColor={useColorModeValue("#000000", "#ffffff")}
        ref={signatureRef}
      />
      <Button onClick={deleteSignature}>Borrar</Button>
      <Button onClick={save}>Guardar</Button>
      <Text>Firma del Profesional</Text>
      <Button type="submit" variant="outline" colorScheme="teal">
        Crear Acuerdo
      </Button>
    </VStack>
  );
};

export const getServerSideProps = async (_ctx: any) => {
  const res = await fetch('http://localhost:3000/api/contracts');
  const contract = await res.json()
  return {
    props: {
      contract
    }
  }
}


export default Form;
