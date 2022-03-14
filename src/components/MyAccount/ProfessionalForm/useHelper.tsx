import axios from "axios";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";

export const useHelper = () => {
  const toast = useToast();
  interface DataInitialValues {
    companyName: string;
    description: string;
    rangeCoverage: number;
    images?: string[];
  }

  const initialValues: DataInitialValues = {
    companyName: "",
    description: "",
    rangeCoverage: 0,
    images: [],
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("Una descripcion es requerida"),

    rangeCoverage: Yup.number().required("El rango de cobertura es requerido"),
    images: Yup.array().required(""),
  });

  const onSubmit = async (values: DataInitialValues) => {
    console.log("eeee", values);

    const { companyName, description, rangeCoverage, images } = values;

    const userProfessional = {
      companyName,
      description,
      rangeCoverage,
      images,
    };
    try {
      const { data } = await axios.put(
        "/rutaPerfilProgesional",
        userProfessional
      );

      toast({
        title: `¡Felicidades NOMBRE DE USUARIO!`,
        description: "Tu perfil como profesional fue creado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "¡Lo Sentimos!.",
        description: "Hubo un error en configurar la cuenta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return { initialValues, toast, onSubmit, validationSchema };
};

export default useHelper;
