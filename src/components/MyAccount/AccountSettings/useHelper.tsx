//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";
import { signOut } from "next-auth/react";

const useHelper = (session: Session, isAuthenticated: string, code: string) => {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);

  interface DataInitialValues {
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface DataChangePassword {
    passwordChange: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  const initialValues: DataInitialValues = {
    password: "",
    confirmPassword: "",
    email: "",
  };

  const initialValuesChangePassword: DataChangePassword = {
    passwordChange: isAuthenticated === "true" ? code : "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchemaChangePassword = Yup.object({
    passwordChange: Yup.string().required("La contraseña es requerida."),
    newPassword: Yup.string()
      .required("La contraseña es requerida.")
      .min(8, "Contraseña demasiado corta.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Mínimo 8 caracteres, una letra mayúscula, una minúscula y al menos un número."
      ),
    confirmNewPassword: Yup.string()
      .required("Debe confirmar la contraseña")
      .when("newPassword", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Las contraseñas deben coincidir"
        ),
      }),
  });

  const validationSchema = Yup.object({
    password: Yup.string().required("La contraseña es requerida."),
    confirmPassword: Yup.string()
      .required("Debe confirmar la contraseña")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Las contraseñas deben coincidir"
        ),
      }),
    email: Yup.string()
      .required("El Email is requerido")
      .email("Correo electronico invalido"),
  });

  const onSubmit = async (values: DataInitialValues) => {
    setLoading(true);
    try {
      const { data } = await axios.put("/api/user/updateEmail", {
        email: session.email,
        password: values.password,
        newEmail: values.email,
      });

      if (!data) {
        setLoading(false);
        toast({
          title: "Error al actualizar el correo.",
          description:
            "Comprueba las contraseñas, si el error persiste no dude en contactarnos.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        signOut();
      }
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error al actualizar el correo.",
        description:
          "Comprueba las contraseñas, si el error persiste no dude en contactarnos.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const resend = async () => {
    try {
      setLoadingResend(true);
      await axios.put("/api/user/updatePassword?isAuthenticated=true", {
        email: session.email,
      });
      setLoadingResend(false);
      toast({
        title: "¡El correo fue enviado!",
        description: "Revise su casilla de correo",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      setLoadingResend(false);
      toast({
        title: "¡Hubo un error al reenviar el correo!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const onSubmitChangePassword = async (values: DataChangePassword) => {
    setLoading(true);
    try {
      await axios.post("/api/user/updatePassword", {
        [isAuthenticated === "true" ? "code" : "password"]:
          values.passwordChange,
        email: session.email,
        newPassword: values.newPassword,
      });
      setLoading(false);
      toast({
        title: "¡Su contraseña fue modificada!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      values.confirmNewPassword = "";
      values.newPassword = "";
      values.passwordChange = "";
    } catch (err) {
      setLoading(false);
      toast({
        title:
          "¡Comprueba las contraseñas, si el error persiste no dude en contactarnos!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return {
    show,
    loading,
    initialValues,
    loadingResend,
    validationSchema,
    initialValuesChangePassword,
    validationSchemaChangePassword,
    onSubmitChangePassword,
    setLoading,
    onSubmit,
    setShow,
    resend,
  };
};

export default useHelper;
