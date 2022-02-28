//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";

export const useHelper = () => {
  const toast = useToast();

  interface DataInitialValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  const initialValues: DataInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Correo electronico invalido")
      .required("El correo es requerido"),
    phone: Yup.number().required("El numero de telefono es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .required("Debe confirmar la contraseña")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Las contraseñas deben coincidir"
        ),
      }),
  });

  const onSubmit = async (values: DataInitialValues) => {
    const user = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
      phone: `${values.phone}`,
    };
    try {
      const { data } = await axios.post("/api/auth/signup", user);

      toast({
        title: `¡Felicidades ${data.user.name}!`,
        description: "Tu cuenta fue creada con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "¡Lo Sentimos!.",
        description: "Hubo un error al crear la cuenta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      //console.log(err);
    }
  };

  return { initialValues, validationSchema, onSubmit };
};
