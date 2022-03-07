//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";
import { signOut } from "next-auth/react";

const useHelper = (session: Session) => {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  interface DataInitialValues {
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface DataChangePassword {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  const initialValues: DataInitialValues = {
    password: "",
    confirmPassword: "",
    email: "",
  };

  const initialValuesChangePassword: DataChangePassword = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchemaChangePassword = Yup.object({
    password: Yup.string().required("La contraseña es requerida."),
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
          [Yup.ref("password")],
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

  const onSubmitChangePassword = (values: DataChangePassword) => {
    setLoading(true);
  };

  return {
    toast,
    show,
    loading,
    initialValues,
    validationSchema,
    initialValuesChangePassword,
    validationSchemaChangePassword,
    setShow,
    setLoading,
    onSubmit,
    onSubmitChangePassword,
  };
};

export default useHelper;
