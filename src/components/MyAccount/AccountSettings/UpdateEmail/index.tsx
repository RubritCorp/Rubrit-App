//from chakra
import {
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  Button,
  AccordionIcon,
  AccordionPanel,
  FormLabel,
  InputGroup,
  InputRightElement,
  ButtonGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//from modules
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
//helper
import useHelper from "./useHelper";
//types
import { Session } from "next-auth/core/types";

type Props = {
  session: Session;
};

const UpdateEmail = ({ session }: Props) => {
  const { show, loading, initialValues, validationSchema, onSubmit, setShow } =
    useHelper({ session });
  return (
    <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
      <h2>
        <AccordionButton
          _focus={{ border: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          <Box flex={1} textAlign={"left"}>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>
              Dirección De Correo
            </Text>
            <Text d={"inline"} fontSize={{ base: "xs", md: "lg" }}>
              Tu dirección de correo actual es{" "}
            </Text>
            <Text
              d={"inline"}
              fontWeight={600}
              fontSize={{ base: "xs", md: "lg" }}
            >
              {session?.email}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pt={4}>
        Al cambiar la dirección de correo se le enviara un nuevo código de
        verificación para activar su cuenta. No perdera la información
        recolectada.
        <Box mt={4}>
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <InputControl
                  name="email"
                  label="Nueva Dirección de Correo"
                  inputProps={{
                    placeholder: "Email",
                    autoComplete: "off",
                  }}
                />
                <FormLabel mt={4}>Contraseña</FormLabel>
                <InputGroup>
                  <InputControl
                    inputProps={{
                      placeholder: "Contraseña",
                      type: show ? "text" : "password",
                      autoComplete: "off",
                    }}
                    name="password"
                  />
                  <InputRightElement>
                    <Button
                      bg={"medium_green"}
                      _hover={{
                        bg: "light_green_sub.700",
                      }}
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <ViewOffIcon color={"#fafafa"} />
                      ) : (
                        <ViewIcon color={"#fafafa"} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormLabel mt={4}>Repetir Contraseña</FormLabel>
                <InputGroup>
                  <InputControl
                    name="confirmPassword"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "Contraseña",
                      type: show ? "text" : "password",
                      autoComplete: "off",
                    }}
                  />
                  <InputRightElement>
                    <Button
                      bg={"medium_green"}
                      _hover={{
                        bg: "light_green_sub.700",
                      }}
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <ViewOffIcon color={"#fafafa"} />
                      ) : (
                        <ViewIcon color={"#fafafa"} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ButtonGroup
                  mt={6}
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={{ base: "center", md: "" }}
                >
                  <SubmitButton
                    mb={{ base: "1rem", md: 0 }}
                    w={"10rem"}
                    colorScheme="blue"
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    disabled={
                      Object.keys(errors).length > 0 ||
                      !Object.values(values)[0].length
                        ? true
                        : false
                    }
                    isLoading={loading}
                  >
                    Actualizar Correo
                  </SubmitButton>

                  <ResetButton
                    colorScheme={"green"}
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    w={"10rem"}
                  >
                    Reiniciar
                  </ResetButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
          <Text pt={4}>
            Al confirmar la sesión finalizara y debera ingresas nuevamente.
          </Text>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UpdateEmail;
