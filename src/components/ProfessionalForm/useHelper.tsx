import axios from "axios";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
const useHelper = () => {
  const toast = useToast();

  interface DataInitialValues {
    companyName: string;
    description: string;
    location: string;
    category: string[];
    subcategories: string[];
    rangeCoverage: number;
    images?: string[];
  }

  const initialValues: DataInitialValues = {
    companyName: "",
    description: "",
    location: "",
    rangeCoverage: 0,
    category: [],
    subcategories: [],
    images: [],
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("Una descripcion es requerida"),
    location: Yup.string().required("Tu ubicacion es requerida"),
    rangeCoverage: Yup.number().required("El rango de cobertura es requerido"),
    // items: Yup.boolean().required(""),
  });

  const onSubmit = async (values: DataInitialValues) => {
    console.log(values);
    const {
      companyName,
      description,
      location,
      rangeCoverage,
      category,
      subcategories,
      images,
    } = values;

    const userProfessional = {
      companyName,
      description,
      location,
      rangeCoverage,
      category,
      subcategories,
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

  return { initialValues, onSubmit, validationSchema };
};

export default useHelper;
