//from modules
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
//from chakra
import { useToast } from "@chakra-ui/react";
//from configs
import envConfig from "../../../../next-env-config";
//types
import { Session } from "next-auth/core/types";
import { Types } from "mongoose";
//from providers
import { useCategories } from "Provider/CategoriesProvider";

type Props = {
  session: Session;
};

interface ServiceRange {
  city: string;
  addressName: string;
  lat: number;
  lng: number;
  rangeCoverage: number;
}

export const useHelper = ({ session }: Props) => {
  const toast = useToast();
  const { categories } = useCategories();
  const [loading, setLoading] = useState<boolean>(false);

  false;
  const [certificationImages, setCertificationImages] = useState<string[]>([]);
  const [serviceImages, setServicesImages] = useState<string[]>([]);
  const [userCategories, setUserCategories] = useState<any>({});
  const [userCategoriesAsArray, setUserCategoriesAsArray] = useState<
    { category: string; subcategories: string[] }[]
  >([]);
  const [serviceRange, setServiceRange] = useState<ServiceRange>({
    addressName: session?.address ? session.address?.name : "",
    city:
      session?.address && session.address?.country.length
        ? `${session.address} ${session.address?.country}`
        : "",
    lat: session?.address ? session.address?.lat : 0,
    lng: session?.address ? session.address?.lng : 0,
    rangeCoverage: 0,
  });

  useEffect(() => {
    interface catAsArray {
      category: string;
      subcategories: string[];
    }

    const aux: catAsArray[] = [];
    Object.entries<[string, [string]]>(userCategories).map((m) => {
      let obj: catAsArray = {
        category: "",
        subcategories: [],
      };
      categories.filter((f) => {
        if (f._id.toString() === m[0]) {
          obj.category = f.name;
          f.subcategories.map((ms) => {
            if (m[1] && m[1].includes(`${ms._id}`)) {
              obj.subcategories.push(ms.name);
            }
          });
        }
      });
      aux.push(obj);
    });
    setUserCategoriesAsArray([...aux]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCategories]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  interface DataInitialValues {
    description: string;
    shortDescription: string;
  }

  const initialValues: DataInitialValues = {
    description: "",
    shortDescription: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string()
      .required("Una descripcion es requerida")
      .min(
        10,
        "El mínimo de caracteres admitidos es de 10, pero esmerate un poco mas!"
      )
      .max(
        250,
        "Dispones de un máximo de 250 caracteres, usalos con sabiduria!"
      ),
    shortDescription: Yup.string()
      .required("Una descripcion es requerida")
      .min(
        10,
        "El mínimo de caracteres admitidos es de 10, pero esmerate un poco mas!"
      )
      .max(
        100,
        "Dispones de un máximo de 100 caracteres, usalos con sabiduria!"
      ),
  });

  const blobToFiles = async (images: string[], typeImages: string) => {
    let blobImages: any = images.map(
      async (m: string) =>
        await fetch(m)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File(
                [blobFile],
                `${session._id}-${Math.floor(
                  Math.random() * (1000 - 1) + 1
                )}ceritification.png`,
                {
                  type: "image/png",
                }
              )
          )
    );
    blobImages = await Promise.all(blobImages);

    let formData = new FormData();
    formData.append(
      "path",
      `users/${session!._id}/files/form/${
        typeImages === "certification" ? "certification" : "services"
      }`
    );
    formData.append(
      "title",
      `${typeImages === "certification" ? "certification" : "images"}`
    );

    for (let i = 0; i < blobImages.length; i++) {
      formData.append("files", blobImages[i] as any);
    }

    const { data } = await axios.post(
      `${envConfig?.apiUrl}/aws/upload-files`,
      formData,
      {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data",
        },
      }
    );
    return data.urls;
  };

  const onSubmit = async (values: DataInitialValues) => {
    setLoading(true);
    if (values.description.length < 10 || values.shortDescription.length < 10) {
      if (!toast.isActive("error-description")) {
        toast({
          title: "Debes rellenar las descripciones para poder continuar.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          id: "error-description",
        });
      }
      setLoading(false);
      return;
    }
    if (Object.keys(userCategories).length < 1) {
      if (!toast.isActive("error-categories")) {
        toast({
          title:
            "Las categorias no pueden estar vacias, elige al menos una para continuar.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          id: "error-categories",
        });
      }
      setLoading(false);
      return;
    }
    if (
      Object.values(serviceRange).includes("") ||
      Object.values(serviceRange).includes(0)
    ) {
      if (!toast.isActive("error-service-range")) {
        toast({
          title:
            "El rango de cobertura esta incompleto, rellene el formulario antes de continuar.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          id: "error-service-range",
        });
      }
      setLoading(false);
      return;
    }

    try {
      interface DataFinalValues {
        _id: Types.ObjectId;
        certification?: string[];
        services?: string[];
        description: string;
        shortDescription: string;
        categories: any;
        serviceRange: ServiceRange;
      }

      const finalValues: DataFinalValues = {
        _id: session._id,
        description: values.description,
        shortDescription: values.shortDescription,
        categories: userCategories,
        serviceRange,
      };

      if (certificationImages.length >= 1) {
        let certUrls = await blobToFiles(certificationImages, "certification");
        finalValues["certification"] = certUrls;
      }
      if (serviceImages.length >= 1) {
        let certUrls = await blobToFiles(serviceImages, "images");
        finalValues["services"] = certUrls;
      }

      await axios.put("/api/user/updateToProfessional", {
        ...finalValues,
      });
      toast({
        title: "Felicitaciones, tu perfil profesional fue creado con exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      reloadSession();
      setLoading(false);
    } catch (err) {
      if (!toast.isActive("error-sending-form")) {
        toast({
          title:
            "Ocurrio un error al enviar el formulario, intentalo de nuevo, si el error persiste no dude en contactarnos.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          id: "error-sending-form",
        });
      }
      setLoading(false);
      return;
    }
  };

  return {
    loading,
    categories,
    serviceRange,
    serviceImages,
    initialValues,
    userCategories,
    validationSchema,
    certificationImages,
    userCategoriesAsArray,
    setCertificationImages,
    setUserCategories,
    setServicesImages,
    setServiceRange,
    onSubmit,
  };
};

export default useHelper;
