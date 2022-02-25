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
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

//from modules
import { useState } from "react";
import { signIn } from "next-auth/react";

//assets
import facebook from "assets/facebook.png";
import google from "assets/google.png";
import microsoft from "assets/microsoft.png";
import github from "assets/github.png";
import Image from "next/image";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface ICredentials {
  email: string;
  password: string;
}

const Login: React.FC<{
  setIsLogin(value: boolean): void;
}> = ({ setIsLogin }) => {
  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
  const [credentials, setCredentails] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentails({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(credentials);
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
    });
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
        <ModalFooter justifyContent={"center"}>
          <Button
            colorScheme="blue"
            w={"90%"}
            onClick={handleSubmit}
            disabled={
              !credentials.email.length || !credentials.password.length
                ? true
                : false
            }
          >
            Iniciar Sesión
          </Button>
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
                layout="fill"
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
            textAlign={"center"}
            fontSize={"sm"}
            onClick={() => signIn("google")}
          >
            Continuar con Google
            <Box position={"absolute"} w={"1.2rem"} height={"1.2rem"} left={5}>
              <Image
                src={google}
                alt="googleLogo"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Button>
          <Button
            colorScheme="green"
            variant={"outline"}
            position={"relative"}
            paddingLeft={"3rem"}
            marginTop={"1rem"}
            w={"80%"}
            textAlign={"center"}
            fontSize={"sm"}
          >
            Continuar con Microsoft
            <Box position={"absolute"} w={"1.2rem"} height={"1.2rem"} left={5}>
              <Image
                src={microsoft}
                alt="microsoftLogo"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Button>
          <Button
            variant={"outline"}
            position={"relative"}
            paddingLeft={"3rem"}
            marginTop={"1rem"}
            marginBottom={"2rem"}
            w={"80%"}
            textAlign={"center"}
            fontSize={"sm"}
            onClick={() => signIn("github")}
          >
            Continuar con Github
            <Box position={"absolute"} w={"1.2rem"} height={"1.2rem"} left={5}>
              <Image
                src={github}
                alt="githubLogo"
                layout="fill"
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
