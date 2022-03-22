//types
import { Session } from "next-auth/core/types";
//from modules
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

type Props = {
  session: Session;
  onClose(): void;
};

const useHelper = ({ session, onClose }: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  type DataInitialValues = {
    name: string;
    city: string;
    lat: number;
    lng: number;
    rangeCoverage: number;
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const initialValues: DataInitialValues = {
    name: session.address.name ? session.address.name : " ",
    city:
      session.address.city && session.address.country
        ? `${session.address.city},${session.address.country}`
        : " ",
    lat: session.address.lat,
    lng: session.address.lng,
    rangeCoverage: session.workerData.rangeCoverage,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("La direccion es requerida"),
    city: Yup.string().required("La ciudad es requerida"),
    rangeCoverage: Yup.number().required("El rango de servicio es requerido"),
  });

  const onSubmit = async (values: DataInitialValues) => {
    setLoading(true);
    const finalData = {
      _id: session._id,
      city: values.city.split(",")[0],
      country: values.city.split(",")[1],
      addressName: values.name,
      lat: values.lat,
      lng: values.lng,
      rangeCoverage: values.rangeCoverage,
    };
    try {
      await axios.put("/api/user/updateServiceLocation", {
        ...finalData,
      });
      setLoading(false);
      toast({
        title: "¡La información fue actualizada!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      reloadSession();
    } catch (err) {
      console.log(err);

      setLoading(false);
      toast({
        title: "¡Ocurrio un erro al actualizar la información!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return { loading, initialValues, validationSchema, onSubmit };
};

export default useHelper;
