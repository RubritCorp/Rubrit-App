//chakra

import { useDisclosure, useToast } from "@chakra-ui/react";
//types
import { Session } from "next-auth/core/types";
//from modules
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
//assets
import { ARG, COL, MEX, PAR, PER, URU } from "assets/flags";

interface Props {
  user: Session;
  onCloseEditProfile(): void;
}

const useHelper = ({ user, onCloseEditProfile }: Props) => {
  const toast = useToast();
  const [countryCode, setCountryCode] = useState<string>(
    user.phone.diallingCode
  );
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {}, [user]);

  const {
    isOpen: isOpenDeleteImage,
    onOpen: onOpenDeleteImage,
    onClose: onCloseDeleteImage,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateImage,
    onOpen: onOpenUpdateImage,
    onClose: onCloseUpdateImage,
  } = useDisclosure();

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
  interface DataInitialValues {
    name: string;
    phone: string;
    address: string;
    lat: number;
    lng: number;
    searchRange: number;
    timeZone: string;
  }

  const loadFiles = (pic: File) => {
    if (!pic) {
      toast({
        title: "Seleccione una imagen",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      setImage(URL.createObjectURL(pic));
      onOpenUpdateImage();
    } else {
      toast({
        title: "Seleccione una imagen valida",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const initialValues: DataInitialValues = {
    name: user.name,
    phone: user.phone.number,
    address: user.address.name ? user.address.name : "",
    lat: user.address.lat ? user.address.lat : 0,
    lng: user.address.lng ? user.address.lng : 0,
    searchRange: user.address.searchRange ? user.address.searchRange : 10,
    timeZone: new Date().toTimeString().slice(9),
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre no puede estar vacio."),
    phone: Yup.string()
      .required("El numero de telefono es requerido")
      .matches(/^[0-9,+]*$/, "Este campo solo acepta números")
      .min(8, "Número de teléfono invalido."),
    address: Yup.string().required("La ciudad es requerida"),
    searchRange: Yup.number(),
    timeZone: Yup.string().required("La Zona Horaria es Requerida"),
  });

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const onSubmit = async (values: DataInitialValues) => {
    setLoading(true);

    try {
      interface UpdateData {
        name: string;
        phone: {
          diallingCode: string;
          number: string;
        };
        address: {
          name: string;
          lat: number;
          lng: number;
          searchRange: number;
          timeZone: string;
        };
      }

      const newData: UpdateData = {
        name: values.name,
        phone: {
          diallingCode: countryCode,
          number: values.phone,
        },
        address: {
          name: values.address,
          lat: values.lat,
          lng: values.lng,
          searchRange: values.searchRange,
          timeZone: values.timeZone,
        },
      };

      await axios.put("/api/user", {
        email: user.email,
        ...newData,
      });
      setLoading(false);
      reloadSession();
      toast({
        title: "Su perfil fue modificado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCloseEditProfile();
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error al modificar la información.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    image,
    loading,
    countries,
    countryCode,
    inputFileRef,
    initialValues,
    validationSchema,
    isOpenDeleteImage,
    isOpenUpdateImage,
    onCloseUpdateImage,
    onCloseDeleteImage,
    onOpenDeleteImage,
    setCountryCode,
    loadFiles,
    onSubmit,
    setImage,
  };
};

export default useHelper;
