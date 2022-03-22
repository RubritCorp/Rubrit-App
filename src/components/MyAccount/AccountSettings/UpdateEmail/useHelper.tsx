//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";
import { signOut } from "next-auth/react";
import { validateYupSchema } from "formik";

type Props = {
  session: Session;
};

const useHelper = ({ session }: Props) => {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  interface DataInitialValues {
    password: string;
    confirmPassword: string;
    email: string;
    confirmEmail: string;
  }

  const initialValues: DataInitialValues = {
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
  };

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
      .required("El Email es requerido")
      .email("Correo electronico invalido"),
    confirmEmail: Yup.string()
      .required("Debe confirmar el correo")
      .when("email", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("email")],
          "El correo debe coincidir"
        ),
      }),
  });

  const onSubmit = async (values: DataInitialValues) => {
    setLoading(true);
    if (values.email === session.email) {
      if (!toast.isActive("same-mail")) {
        toast({
          title:
            "¡La nueva dirección de correo no puede ser igual a la anterior!",
          status: "warning",
          duration: 9000,
          isClosable: true,
          id: "same-mail",
        });
      }
      setLoading(false);
      return;
    }
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
      } else if (data.message === "Ya existe una cuenta con ese correo") {
        if (!toast.isActive("email-in-use")) {
          toast({
            title: "Ya existe una cuenta con ese correo",
            status: "warning",
            duration: 9000,
            isClosable: true,
            id: "email-in-use",
          });
        }
        setLoading(false);
        return;
      } else {
        setLoading(false);
        signOut();
        toast({
          title: "Compruebe su casilla de correo",
          description:
            "Se envio un correo de verificacón al nuevo correo electronico.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
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

  return {
    show,
    loading,
    initialValues,
    validationSchema,
    onSubmit,
    setShow,
  };
};

export default useHelper;
