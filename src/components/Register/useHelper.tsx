//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
//assets
import { ARG, COL, MEX, PAR, PER, URU } from "assets/flags";

interface props {
  setIsLogin(value: boolean): void;
}

export const useHelper = ({ setIsLogin }: props) => {
  const toast = useToast();
  const [countryCode, setCountryCode] = useState<string>("País");
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
    phone: Yup.string()
      .required("El numero de telefono es requerido")
      .matches(/^[0-9]*$/, "Este campo solo acepta números")
      .min(8, "Número de teléfono invalido."),
    password: Yup.string()
      .required("La contraseña es requerida.")
      .min(8, "Contraseña demasiado corta.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Mínimo 8 caracteres, una letra mayúscula, una minúscula y al menos un número. No se aceptan caracteres especiales."
      ),
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
      name:
        values.firstName.toLowerCase() + " " + values.lastName.toLowerCase(),
      email: values.email.toLowerCase(),
      password: values.password,
      phone: {
        diallingCode: countryCode,
        number: values.phone,
      },
      withProvider: false,
    };
    try {
      const { data } = await axios.post("/api/auth/signup", user);

      if (data.message === "User already exists") {
        if (!toast.isActive("user-already-exist")) {
          toast({
            title: `¡Ya existe un usuario con el correo provisto!`,
            description:
              "Prueba iniciando sesión, si no recuerdas tu contraseña puedas recuperarla mediante tu correo electronico.",
            status: "warning",
            duration: 8000,
            isClosable: true,
            id: "user-already-exist",
          });
        }
        return;
      }

      toast({
        title: `¡Felicidades ${data.user.name}!`,
        description:
          "Tu cuenta fue creada con exito. Revise su casilla de correo electronico para verificar su cuenta",
        status: "success",
        duration: 8000,
        isClosable: true,
      });

      setIsLogin(true);
    } catch (err) {
      toast({
        title: "¡Lo Sentimos!.",
        description: "Hubo un error al crear la cuenta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  interface DataCountry {
    name: string;
    img: JSX.Element;
    code: string;
  }

  const countries: DataCountry[] = [
    {
      name: "Argentina",
      img: <ARG />,
      code: "+54",
    },
    {
      name: "Colombia",
      img: <COL />,
      code: "+57",
    },
    {
      name: "México",
      img: <MEX />,
      code: "+52",
    },
    {
      name: "Paraguay",
      img: <PAR />,
      code: "+595",
    },
    {
      name: "Perú",
      img: <PER />,
      code: "+51",
    },
    {
      name: "Uruguay",
      img: <URU />,
      code: "+598",
    },
  ];

  return {
    initialValues,
    countries,
    countryCode,
    setCountryCode,
    validationSchema,
    onSubmit,
  };
};
