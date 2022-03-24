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
  Text,
  Box,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

//from modules
import { useState } from "react";
import { signIn } from "next-auth/react";

//assets
import facebook from "assets/facebook.png";
import google from "assets/google.png";
import Image from "next/image";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import ForgotPassword from "./ForgotPassword";

interface ICredentials {
  email: string;
  password: string;
}

const Login: React.FC<{
  setIsLogin(value: boolean): void;
  onClose(): void;
  status: string;
}> = ({ setIsLogin, onClose, status }) => {
  const theme = useTheme();
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [credentials, setCredentails] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const {
    isOpen: isOpenForgotPassword,
    onOpen: onOpenForgotPassword,
    onClose: onCloseForgotPassword,
  } = useDisclosure();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentails({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    interface DataResponse {
      error: string;
      status: number;
      ok: boolean;
      url: null;
    }

    const status: any = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (status && !status.ok) {
      setLoading(false);
      if (!toast.isActive("signIn-error-credentials")) {
        toast({
          title: "Error al iniciar sesión.",
          description: "El correo o la contraseña son incorrectos.",
          status: "error",
          duration: 9000,
          isClosable: true,
          id: "signIn-error-credentials",
        });
      }
    }

    setLoading(false);
  };

  return (
    <>
      <ModalContent>
        <ModalHeader textAlign={"center"} color={theme.colors.medium_green}>
          Inicia Sesión
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>

            <Input
              placeholder="example@mail.com"
              name="email"
              value={credentials.email}
              onChange={onChange}
              autoComplete="off"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
                placeholder="Ingrese su contraseña"
                type={show ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="off"
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
          </FormControl>
          <Text paddingTop={"30px"} display={"inline-block"}>
            No tienes una cuenta?
          </Text>
          <Text
            display={"inline"}
            color={theme.colors.medium_green}
            cursor={"pointer"}
            onClick={() => setIsLogin(false)}
          >
            {" "}
            Registrarse Gratis
          </Text>
        </ModalBody>
        <ModalFooter justifyContent={"center"} flexDirection={"column"}>
          <Button
            colorScheme="blue"
            w={"90%"}
            onClick={(e) => {
              handleSubmit(e), setLoading(true);
            }}
            disabled={
              !credentials.email.length || !credentials.password.length
                ? true
                : false
            }
            isLoading={loading}
          >
            Iniciar Sesión
          </Button>
          <Text mt={4}>¿Olvidaste tu constraseña?</Text>
          <Button
            fontSize={{ base: "sm", md: "l", lg: "l" }}
            leftIcon={<EmailIcon />}
            colorScheme="blue"
            variant="ghost"
            mt={2}
            onClick={onOpenForgotPassword}
          >
            Restablecer por correo
          </Button>
          <ForgotPassword
            {...{ isOpenForgotPassword, onCloseForgotPassword }}
          />
        </ModalFooter>
        <Box d={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Text>O</Text>

          <Button
            colorScheme="facebook"
            variant={"outline"}
            paddingLeft={"3rem"}
            marginTop={"1rem"}
            w={"80%"}
            textAlign={"center"}
            fontSize={"sm"}
            onClick={() => signIn("facebook")}
          >
            Continuar con Facebook
            <Box position={"absolute"} w={"1.2rem"} height={"1.2rem"} left={5}>
              <Image
                src={facebook}
                alt="fbLogo"
                // layout="fill"
                objectFit="cover"
              />
            </Box>
          </Button>
          <Button
            colorScheme="red"
            variant={"outline"}
            position={"relative"}
            paddingLeft={"3rem"}
            marginTop={"1rem"}
            w={"80%"}
            marginBottom={"2rem"}
            textAlign={"center"}
            fontSize={"sm"}
            onClick={() => signIn("google")}
          >
            Continuar con Google
            <Box position={"absolute"} w={"1.2rem"} height={"1.2rem"} left={5}>
              <Image
                src={google}
                alt="googleLogo"
                // layout="fill"
                objectFit="cover"
              />
            </Box>
          </Button>
        </Box>
      </ModalContent>
    </>
  );
};

export default Login;
