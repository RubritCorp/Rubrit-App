import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";

const useHelper = (session: Session) => {
    const toast = useToast();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    interface DataValues {
        nameClient: string;
        emailClient: string;
        addressClient: string;
        nameProfessional: string;
        emailProfessional: string;
        addressProfessional: string;
        detailes: string;
        approxDuration: string;
        budget: Number;
        currentDate: string;
        addressWorke: string;

    };
    const initialValues: DataValues = {
        nameClient: "",
        emailClient: "",
        addressClient: "",
        nameProfessional: "",
        emailProfessional: "",
        addressProfessional: "",
        detailes: "",
        approxDuration: "",
        budget: 0,
        currentDate: "",
        addressWorke: "",
    };

    
    const validationSchema = Yup.object({
        nameClient: Yup.string()
            .required("El nombre del cliente es requerido"),
        emailClient: Yup.string()
            .email("Correo electronico invalido")
            .required("El correo del cliente es requerido"),
        addressClient: Yup.string()
            .required("La dirección del cliente es requerida"),
        nameProfessional: Yup.string()
            .required("El nombre del profesional es requerido"),
        emailProfessional: Yup.string()
            .email("Correo electronico invalido")
            .required("El correo del profesional es requerido"),
        addressProfessional: Yup.string()
            .required("La dirección del profesional es requerida"),
        detailes: Yup.string()
            .required("Detalles del trabajo es requerido"),
        approxDuration: Yup.string()
            .required("La duración del trabajo es requerida"),
        budget: Yup.number()
            .required("El presupuesto es requerido"),
        currentDate: Yup.string()
            .required("La fecha actual es requerida"),
        addressWorke: Yup.string()
            .required("La dirección del trabajo es requerida"),
    });

    const onSubmit = async (values: DataValues) => {
        try {
            setLoading(true);
           const {data} = await axios.post("/api/user/updateToCotract", {
                nameClient: values.nameClient,
                emailClient: session.emailClient,
                addressClient: values.addressClient,
                nameProfessional: values.nameProfessional,
                emailProfessional: session.emailProfessional,
                addressProfessional: values.addressProfessional,
                detailes: values.detailes,
                approxDuration: values.approxDuration,
                budget: values.budget,
                currentDate: values.currentDate,
                addressWorke: values.addressWorke,
            });
            setLoading(false);
            setShow(true);
            toast({
                title: "Exito",
                description: data.message,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } 
       
    };

    return {
        initialValues,
        validationSchema,
        onSubmit,
        show,
        setShow,
        loading,
        setLoading,
    };
};

export default useHelper;
