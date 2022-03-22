//from chakra
import {
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  Button,
  AccordionIcon,
  AccordionPanel,
  useTheme,
  FormLabel,
  InputGroup,
  InputRightElement,
  ButtonGroup,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//from modules
import { Session } from "next-auth/core/types";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
//helper
import { useHelper } from "./useHelper";

type Props = {
  session: Session;
  isAuthenticated: string;
  code: string;
};

const UpdatePassword = ({ session, isAuthenticated, code }: Props) => {
  const {
    show,
    loading,
    loadingResend,
    initialValuesChangePassword,
    validationSchemaChangePassword,
    onSubmitChangePassword,
    setShow,
    resend,
  } = useHelper(session, `${isAuthenticated}`, `${code}`);

  return (
    <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
      <h2>
        <AccordionButton
          _focus={{ border: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          <Box flex={1} textAlign={"left"}>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>
              Cambiar Contraseña
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pt={4}>
        <Box mt={4}>
          <Formik
            initialValues={initialValuesChangePassword}
            validationSchema={validationSchemaChangePassword}
            onSubmit={onSubmitChangePassword}
          >
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <InputControl
                  name="passwordChange"
                  label={
                    isAuthenticated === "true"
                      ? "Codigo de verificación"
                      : "Contraseña Actual"
                  }
                  inputProps={{
                    placeholder: "Contraseña",
                    type: "password",
                    autoComplete: "off",
                  }}
                />
                {isAuthenticated === "true" && (
                  <Text mt={2}>
                    No elimine el Codigo de verificación de usuario. Una vez
                    haya cambiado la constraseña, este quedara invalido.
                  </Text>
                )}
                <FormLabel mt={4}>Contraseña</FormLabel>
                <InputGroup>
                  <InputControl
                    inputProps={{
                      placeholder: "Nueva Contraseña",
                      type: show ? "text" : "password",
                      autoComplete: "off",
                    }}
                    name="newPassword"
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
                    name="confirmNewPassword"
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
                    w={"10rem"}
                    mb={{ base: "1rem", md: 0 }}
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
                    Actualizar Contraseña
                  </SubmitButton>

                  <ResetButton
                    colorScheme={"green"}
                    mr={3}
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    w={"10rem"}
                  >
                    Reiniciar
                  </ResetButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>

          <Text pt={4}>¿No te acuerdas de tu contraseña actual?</Text>
          <Button
            fontSize={{ base: "xs", md: "l", lg: "l" }}
            leftIcon={<EmailIcon />}
            colorScheme="blue"
            variant="outline"
            mt={2}
            onClick={resend}
            isLoading={loadingResend}
          >
            Restablecer por correo
          </Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UpdatePassword;
