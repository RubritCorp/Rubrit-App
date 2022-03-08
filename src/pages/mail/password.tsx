//from modules
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";

//components
import Loading from "components/Loading";
import Layout from "components/layout";
//from chakra
import {
  Box,
  useToast,
  Button,
  Flex,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useTheme,
  ButtonGroup,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

const Password: React.FC = () => {
  const toast = useToast();
  const theme = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { code, email } = router.query;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  interface DataValues {
    password: string;
    confirmPassword: string;
  }

  const initialValues: DataValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("La contraseña es requerida.")
      .min(8, "Contraseña demasiado corta.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Mínimo 8 caracteres, una letra mayúscula, una minúscula y al menos un número."
      ),
    confirmPassword: Yup.string()
      .required("Debe confirmar la contraseña")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Las contraseñas deben coincidir"
        ),
      }),
  });

  const onSubmit = async (values: DataValues) => {
    setLoading(true);
    try {
      await axios.post("/api/user/updatePassword", {
        email,
        code,
        newPassword: values.password,
      });
      setLoading(false);
      toast({
        title: "¡La contraseña fue restablecida!",
        description: "Su nueva contraseña esta habilatada para iniciar sesion",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      reloadSession();
      router.push("/?login=true");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "¡Hubo un error al reemplazar la contraseña!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Flex
          width={"100vw"}
          h={"64.7vh"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          transition={"0.3"}
        >
          <Loading />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          // eslint-disable-next-line react-hooks/rules-of-hooks
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Restablecer Contraseña
          </Heading>
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <FormLabel>Contraseña</FormLabel>
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
                      bg={theme.colors.medium_green}
                      _hover={{
                        bg: theme.colors.light_green_sub[700],
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

                <FormLabel>Repetir Contraseña</FormLabel>
                <InputGroup>
                  <InputControl
                    name="confirmPassword"
                    onBlur={handleBlur}
                    inputProps={{
                      placeholder: "Repetir Contraseña",
                      type: show ? "text" : "password",
                      autoComplete: "off",
                    }}
                  />
                  <InputRightElement>
                    <Button
                      bg={theme.colors.medium_green}
                      _hover={{
                        bg: theme.colors.light_green_sub[700],
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
                <ButtonGroup mt={6} justifyContent={"flex-end"} d={"flex"}>
                  <ResetButton
                    colorScheme={"green"}
                    mr={3}
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                  >
                    Reiniciar
                  </ResetButton>
                  <SubmitButton
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    colorScheme={"green"}
                    color={"white"}
                    isLoading={loading}
                    disabled={
                      Object.keys(errors).length > 0 ||
                      !Object.values(values)[0].length
                        ? true
                        : false
                    }
                  >
                    Confirmar
                  </SubmitButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Password;
