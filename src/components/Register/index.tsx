//from chakra
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  Text,
  Box,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  InputControl,
  ResetButton,
  SubmitButton,
  BaseProps,
} from "formik-chakra-ui";
import { useTheme } from "@chakra-ui/react";
//from components
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("El nombre es requerido").min(5),
  lastName: Yup.string().required("El apellido es requerido").min(5),
  email: Yup.string()
    .email("Correo electronico invalido")
    .required("El correo es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
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

const Login: React.FC<{
  setIsAuth(value: boolean): void;
  setIsLogin(value: boolean): void;
}> = ({ setIsAuth, setIsLogin }) => {
  const theme = useTheme();
  const { onClose } = useDisclosure();
  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <ModalContent>
      <ModalHeader textAlign={"center"} color={theme.colors.medium_green}>
        Registrate
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, errors, handleBlur }) => (
            <Box>
              <InputControl
                name="firstName"
                label="Nombre"
                aria-autocomplete="none"
              />
              <InputControl
                name="lastName"
                label="Apellido"
                aria-autocomplete="none"
              />
              <InputControl
                name="email"
                label="Email"
                aria-autocomplete="none"
              />

              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <InputControl
                  name="password"
                  aria-autocomplete="none"
                  aria-placeholder="hola"
                />
                <InputRightElement width={"4.5rem"}>
                  <Button
                    h="1.75rem"
                    size={"sm"}
                    bg={"white"}
                    m={"0 10px 0 0"}
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormLabel>Repetir Contraseña</FormLabel>
              <InputGroup>
                <InputControl name="confirmPassword" onBlur={handleBlur} />
                <InputRightElement width={"4.5rem"}>
                  <Button
                    h="1.75rem"
                    size={"sm"}
                    bg={"white"}
                    m={"0 10px 0 0"}
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Text paddingTop={"30px"}>
                Ya tienes una cuenta?
                <Text
                  display={"inline"}
                  color={theme.colors.medium_green}
                  cursor={"pointer"}
                  onClick={() => setIsLogin(true)}
                >
                  {" "}
                  Inicia Sesión
                </Text>
              </Text>
              <ModalFooter p={"40px 0px 0px 0px"}>
                <SubmitButton colorScheme="blue" mr={3}>
                  Registrarse
                </SubmitButton>
                <ResetButton colorScheme="green" mr={3}>
                  Limpiar Campos
                </ResetButton>
                <Button
                  onClick={() => {
                    onClose(), setIsAuth(false);
                  }}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Box>
          )}
        </Formik>
        {/* <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder="Nombre" autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Apellido</FormLabel>

          <Input placeholder="Apellido" autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>

          <Input placeholder="example@mail.com" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              autoComplete="off"
              placeholder="Ingrese su contraseña"
              type={show ? "text" : "password"}
            />
            <InputRightElement width={"4.5rem"}>
              <Button
                h="1.75rem"
                size={"sm"}
                bg={"white"}
                m={"0 10px 0 0"}
                onClick={() => setShow(!show)}
              >
                {show ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Cofirmar Contraseña</FormLabel>
          <InputGroup>
            <Input
              autoComplete="off"
              placeholder="Repita su contraseña"
              type={show ? "text" : "password"}
            />
            <InputRightElement width={"4.5rem"}>
              <Button
                h="1.75rem"
                size={"sm"}
                bg={"white"}
                m={"0 10px 0 0"}
                onClick={() => setShow(!show)}
              >
                {show ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl> */}
      </ModalBody>
    </ModalContent>
  );
};

export default Login;
