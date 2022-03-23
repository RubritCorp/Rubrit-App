//types
import { Session } from "next-auth/core/types";
//from modules
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

type Values = {
  city: string;
  addressName: string;
  lat: number;
  lng: number;
  rangeCoverage: number;
};

type Props = {
  session: Session;
  serviceRange: Values;
  setServiceRange(values: Values): void;
  onClose(): void;
};

const useHelper = ({
  session,
  serviceRange,
  setServiceRange,
  onClose,
}: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  type DataInitialValues = {
    name: string;
    city: string;
    lat: number;
    lng: number;
    rangeCoverage: number;
  };

  const initialValues: DataInitialValues = {
    name: serviceRange.addressName,
    city: serviceRange.city,
    lat: serviceRange.lat,
    lng: serviceRange.lng,
    rangeCoverage: serviceRange.rangeCoverage,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("La direccion es requerida"),
    city: Yup.string().required("La ciudad es requerida"),
    rangeCoverage: Yup.number().required("El rango de servicio es requerido"),
  });

  const onSubmit = async (values: DataInitialValues) => {
    const finalData = {
      city: values.city,
      addressName: values.name,
      lat: values.lat,
      lng: values.lng,
      rangeCoverage: values.rangeCoverage,
    };
    setServiceRange({ ...finalData });
    onClose();
  };

  return { loading, initialValues, validationSchema, onSubmit };
};

export default useHelper;
