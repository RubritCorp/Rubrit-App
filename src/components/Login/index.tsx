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
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
//from components
import { useState } from "react";

const Login: React.FC<{
  setIsAuth(value: boolean): void;
  setIsLogin(value: boolean): void;
}> = ({ setIsAuth, setIsLogin }) => {
  const theme = useTheme();
  const { onClose } = useDisclosure();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <ModalContent>
        <ModalHeader textAlign={"center"} color={theme.colors.medium_green}>
          Inicia Sesión
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>

            <Input placeholder="example@mail.com" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
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
          <Text paddingTop={"30px"}>
            Aun no tienes cuenta?
            <Text
              display={"inline"}
              color={theme.colors.medium_green}
              cursor={"pointer"}
              onClick={() => setIsLogin(false)}
            >
              {" "}
              Registrate gratis
            </Text>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => {
              onClose(), setIsAuth(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default Login;
