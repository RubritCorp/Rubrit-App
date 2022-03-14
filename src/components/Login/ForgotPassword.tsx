//from chakra
import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
//from modules
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";
import axios from "axios";

const ForgotPassword: React.FC<{
  isOpenForgotPassword: boolean;
  onCloseForgotPassword(): void;
}> = ({ isOpenForgotPassword, onCloseForgotPassword }) => {
  const toast = useToast();

  interface DataValues {
    email: string;
  }

  const initialValues: DataValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electronico invalido")
      .required("El correo es requerido"),
  });

  const onSubmit = async (values: DataValues) => {
    try {
      await axios.put("/api/user/updatePassword", {
        email: values.email,
      });
      onCloseForgotPassword();
      toast({
        title: "Revisa tu casilla de correo.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Hubo en error al enviar el correo.",
        description: "Revisa la dirección de correo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpenForgotPassword} onClose={onCloseForgotPassword}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Reestablecer Contraseña
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            {({ values, errors, handleSubmit }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <InputControl name="email" label="Correo Electronico" />
                <ModalFooter>
                  <SubmitButton
                    fontSize={{ base: "sm", md: "l", lg: "l" }}
                    leftIcon={<EmailIcon />}
                    colorScheme="blue"
                    variant="ghost"
                    mt={2}
                    disabled={
                      Object.keys(errors).length > 0 ||
                      !Object.values(values)[0].length
                        ? true
                        : false
                    }
                  >
                    Enviar correo
                  </SubmitButton>
                </ModalFooter>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPassword;
