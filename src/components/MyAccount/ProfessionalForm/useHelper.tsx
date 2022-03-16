import axios from "axios";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useCategories } from "../../../Provider/CategoriesProvider";
import { useState } from "react";
import envConfig from "../../../../next-env-config";

export const useHelper = () => {
  const { categories } = useCategories();
  const { data: session } = useSession();
  const toast = useToast();
  const [values, setValues] = useState<any>({
    description: "",
    rangeCoverage: 0,
    images: [],
    categories: [],
    certification: [],
  });

  interface DataInitialValues {
    description: string;
    rangeCoverage: number;
    images?: string[];
    categories: string[];
    certification?: string[];
  }

  const initialValues: DataInitialValues = {
    description: "",
    rangeCoverage: 0,
    images: [],
    categories: [],
    certification: [],
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Una descripcion es requerida"),
    rangeCoverage: Yup.number()

      .test({
        message: "La distancia minima es de 5km",
        test: (n: any) => n >= 5,
      })
      .required("El rango de cobertura es requerido"),
  });

  const handleOnSubmit = async (event: any, values: any) => {
    event.preventDefault();
    let categoriesArray: any[] = [];
    const { description, rangeCoverage, images, certification } = values;
    for (let val in values) {
      if (Array.isArray(values[val]) && val !== "images") {
        let obj = { name: val, subcategories: values[val] };
        if (obj.subcategories.length > 0) {
          categoriesArray.push({ name: val, subcategories: values[val] });
        }
      }
    }

    let finalValues = {
      description,
      rangeCoverage,
      images,
      categoriesArray,
      certification,
    };

    const formData = new FormData();
    formData.append("path", `users/${session!._id}/files/form/images`);
    formData.append("title", "imagenes");

    const formDataCertification = new FormData();
    formDataCertification.append(
      "path",
      `users/${session!._id}/files/form/certification`
    );
    formDataCertification.append("title", "certification");

    if (finalValues.images) {
      for (let i = 0; i < finalValues.images.length; i++) {
        formData.append("files", finalValues.images[i] as any);
      }
    }
    if (finalValues.certification) {
      for (let i = 0; i < finalValues.certification.length; i++) {
        formDataCertification.append(
          "files",
          finalValues.certification[i] as any
        );
      }
    }

    const imagesWorks = await axios.post(
      `${envConfig?.apiUrl}/aws/upload-files`,
      formData
    );

    const imagesCertification = await axios.post(
      `${envConfig?.apiUrl}/aws/upload-files`,
      formDataCertification
    );

    try {
      const data = await axios.put("/api/user/updateToProfessional", {
        id: session!._id,
        categories: finalValues.categoriesArray,
        images: imagesWorks.data.urls,
        description: finalValues.description,
        rangeCoverage: finalValues.rangeCoverage,
        certification: imagesCertification.data.urls,
      });

      setValues({
        ...finalValues,
        images: imagesWorks.data.urls,
        certification: imagesCertification.data.urls,
      });

      toast({
        title: `¡Felicidades!`,
        description: "Tu perfil como profesional fue creado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "¡Lo Sentimos!.",
        description: "Hubo un error en configurar la cuenta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return { initialValues, validationSchema, handleOnSubmit, values };
};

export default useHelper;
