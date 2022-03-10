//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";

const useHelper = (session: Session) => {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  interface DataNewPassword {
    createPassword: string;
    confirmCreatePassword: string;
  }

  const initialValuesNewPassword: DataNewPassword = {
    createPassword: "",
    confirmCreatePassword: "",
  };

  const validationSchemaNewPassword = Yup.object({
    createPassword: Yup.string()
      .required("La contraseña es requerida.")
      .min(8, "Contraseña demasiado corta.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Mínimo 8 caracteres, una letra mayúscula, una minúscula y al menos un número. No se aceptan caracteres especiales."
      ),
    confirmCreatePassword: Yup.string()
      .required("Debe confirmar la contraseña")
      .when("createPassword", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("createPassword")],
          "Las contraseñas deben coincidir"
        ),
      }),
  });

  const onSubmitCreatePassword = async (values: DataNewPassword) => {
    setLoading(true);
    try {
      const { data } = await axios.put("/api/user/createPassword", {
        email: session.email,
        password: values.createPassword,
      });

      setLoading(false);
      if (!data.user) {
        toast({
          title: "¡Ya posee una contraseña!",
          description: data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "¡Su contraseña fue modificada!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      values.confirmCreatePassword = "";
      values.createPassword = "";
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
    initialValuesNewPassword,
    validationSchemaNewPassword,
    onSubmitCreatePassword,
    setShow,
  };
};

export default useHelper;
