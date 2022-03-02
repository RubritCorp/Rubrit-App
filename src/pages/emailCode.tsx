//from modules
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
//components
import Loading from "components/Loading";
import Layout from "components/layout";
//from chakra
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";

const Code: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [status, setStatus] = useState<string>("empty");
  const [isAlreadyValid, setIsAlreadyValid] = useState<boolean>(true);
  const { code, email } = router.query;

  useEffect(() => {
    const session = async () => {
      const storage = await JSON.parse(localStorage.getItem("user") || "");
      if (storage.user && storage.user.isAuthenticated === true) {
        Router.push("http://localhost:3000/");
      } else {
        setIsAlreadyValid(false);
      }
    };
    session();
  }, []);

  const validate = async () => {
    setIsLoading(true);
    try {
      await axios.get(`api/auth/emailVerification?code=${code}&email=${email}`);
      toast({
        title: "¡La cuenta ha sido verificada!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setIsLoading(false);
      setStatus("resolved");
    } catch (err) {
      console.log("Error ocurred in EMAIL_CODE VERIFICATION");
      toast({
        title: "¡Hubo un error al verificar la cuenta!",
        description: `${err}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setIsLoading(false);
      setStatus("rejected");
    }
  };

  if (isLoading || isAlreadyValid) {
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
        h={"64.7vh"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        transition={"0.3"}
        position={"relative"}
      >
        {!code || !email ? (
          <>
            <Text fontSize={{ base: "sm", md: "xl" }}>
              Estamos intentado recuperar tus datos de verificación!
            </Text>
            <Loading />
          </>
        ) : (
          <>
            {isLoading === undefined && (
              <>
                <Button
                  leftIcon={<CheckCircleIcon />}
                  colorScheme={"green"}
                  variant={"outline"}
                  size={"lg"}
                  onClick={() => validate()}
                >
                  Activar mi cuenta
                </Button>
              </>
            )}
            {status === "resolved" && (
              <Text fontSize={{ base: "sm", md: "xl" }}>
                Su cuenta fue verificada con exito
              </Text>
            )}
            {status === "rejected" && (
              <>
                <Text fontSize={{ base: "sm", md: "xl" }}>
                  Tuvimos problemas verificando su cuenta
                </Text>
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="green"
                  variant="solid"
                  marginTop={"2rem"}
                >
                  Reenviar Email
                </Button>
              </>
            )}
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default Code;