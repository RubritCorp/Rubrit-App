import { InfoIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const EmailAuthModal: React.FC<{ email: any }> = ({ email }) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const resend = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/emailVerification", { email });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: "¡Hubo un error al reenviar el correo!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <Flex
      minW={"411.653px"}
      minH={"107.943px"}
      p={"13.500px"}
      bg={"#DD6B20"}
      borderRadius={"7px"}
    >
      <InfoIcon w={5} h={5} color={"white"} m={".2rem 1rem 0 0 "} />
      <Box>
        <Text fontWeight={"bold"} color={"#fafafa"}>
          ¡Aún no has verificado tu cuenta!
        </Text>
        <Text color={"#fafafa"}>
          Recuerda que para utilizar todas las funcionalidades que Rubrit te
          ofrece debes verificar tu identidad
        </Text>
        <Text color={"#fafafa"}>¿No recibiste el correo?</Text>
        <Button
          leftIcon={<EmailIcon />}
          color={"white"}
          variant="outline"
          marginTop={"1rem"}
          w={"100%"}
          _hover={{
            bg: "#fafafa44",
            color: "white",
          }}
          onClick={resend}
          isLoading={loading}
        >
          Reenviar Email
        </Button>
      </Box>
    </Flex>
  );
};

export default EmailAuthModal;
