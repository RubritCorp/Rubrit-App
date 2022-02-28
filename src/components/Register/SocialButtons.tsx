//assets
import { Mail, Facebook, Google, Microsoft, Github } from "assets/icons";
//from chakra
import { Box, Button, Text } from "@chakra-ui/react";
//from modules
import { signIn } from "next-auth/react";

const SocialButtons: React.FC<{
  setMailProfile(value: boolean): void;
  setIsLogin(value: boolean): void;
  color: string;
}> = ({ setMailProfile, setIsLogin, color }) => {
  return (
    <>
      <Box d={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Button
          colorScheme="yellow"
          variant={"outline"}
          paddingLeft={"3rem"}
          marginTop={"1rem"}
          w={"100%"}
          textAlign={"center"}
          fontSize={"sm"}
          onClick={() => setMailProfile(true)}
          leftIcon={<Mail />}
        >
          Continuar con Correo Electronico
          {/* <Box
                  position={"absolute"}
                  w={"1.2rem"}
                  height={"1.2rem"}
                  left={5}
                >
                  <Image
                    src={mail}
                    alt="mailLogo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box> */}
        </Button>
        <Button
          colorScheme="facebook"
          variant={"outline"}
          paddingLeft={"3rem"}
          marginTop={"1rem"}
          w={"100%"}
          textAlign={"center"}
          fontSize={"sm"}
          onClick={() => signIn("facebook")}
          leftIcon={<Facebook />}
        >
          Continuar con Facebook
          {/* <Box
                  position={"absolute"}
                  w={"1.2rem"}
                  height={"1.2rem"}
                  left={5}
                >
                  <Image
                    src={facebook}
                    alt="fbLogo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box> */}
        </Button>
        <Button
          colorScheme="red"
          variant={"outline"}
          /* position={"relative"} */
          paddingLeft={"3rem"}
          marginTop={"1rem"}
          w={"100%"}
          textAlign={"center"}
          fontSize={"sm"}
          onClick={() => signIn("google")}
          leftIcon={<Google />}
        >
          Continuar con Google
          {/* <Box
                  position={"absolute"}
                  w={"1.2rem"}
                  height={"1.2rem"}
                  left={5}
                >
                  <Image
                    src={google}
                    alt="googleLogo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box> */}
        </Button>
        <Button
          colorScheme="green"
          variant={"outline"}
          /* position={"relative"} */
          paddingLeft={"3rem"}
          marginTop={"1rem"}
          w={"100%"}
          textAlign={"center"}
          fontSize={"sm"}
          leftIcon={<Microsoft />}
        >
          Continuar con Microsoft
          {/* <Box
                  position={"absolute"}
                  w={"1.2rem"}
                  height={"1.2rem"}
                  left={5}
                >
                  <Image
                    src={microsoft}
                    alt="microsoftLogo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box> */}
        </Button>
        <Button
          variant={"outline"}
          /* position={"relative"} */
          paddingLeft={"3rem"}
          marginTop={"1rem"}
          marginBottom={"2rem"}
          w={"100%"}
          textAlign={"center"}
          fontSize={"sm"}
          onClick={() => signIn("github")}
          leftIcon={<Github />}
        >
          Continuar con Github
          {/* <Box
                  position={"absolute"}
                  w={"1.2rem"}
                  height={"1.2rem"}
                  left={5}
                >
                  <Image
                    src={github}
                    alt="githubLogo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box> */}
        </Button>
      </Box>
      <Box d={"flex"} justifyContent={"center"} paddingTop={"30px"}>
        <Text>Ya tienes una cuenta?</Text>
        <Text
          color={color}
          cursor={"pointer"}
          paddingLeft={"5px"}
          onClick={() => setIsLogin(true)}
        >
          Inicia Sesión
        </Text>
      </Box>
    </>
  );
};

export default SocialButtons;
