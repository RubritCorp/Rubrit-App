import axios from "axios";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
const useHelper = () => {
  const toast = useToast();

  interface Items {
    category: string[];
    subcategories: string[];
  }
  interface DataInitialValues {
    companyName: string;
    description: string;
    location: string;
    items: Items;
    rangeCoverage: number;
    images?: string[];
  }

  const initialValues: DataInitialValues = {
    companyName: "",
    description: "",
    location: "",
    rangeCoverage: 0,
    items: { category: [], subcategories: [] },
    images: [],
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("Una descripcion es requerido"),
    location: Yup.string().required("Tu ubicacion es requerida"),
    rangeCoverage: Yup.number().required("El rango de cobertura es requerido"),
    items: Yup.string().required(""),
  });

  const onSubmit = async (values: DataInitialValues) => {
    const { companyName, description, location, rangeCoverage, items, images } =
      values;

    const userProfessional = {
      companyName,
      description,
      location,
      rangeCoverage,
      items,
      images,
    };
    try {
      const { data } = await axios.put(
        "/rutaPerfilProgesional",
        userProfessional
      );

      toast({
        title: `¡Felicidades NOMBRE DE USUARIO!`,
        description: "Tu cuenta como profesional fue creada con exito.",
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
      //console.log(err);
    }
  };

  return { initialValues, onSubmit, validationSchema };
};

export default useHelper;
