import { useToast } from "@chakra-ui/react";
//from modules
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Session } from "next-auth/core/types";
import { signOut } from "next-auth/react";

const useHelper = (session: Session, isAuthenticated: string, code: string) => {
    const toast = useToast();
    const [input, setInput] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    interface DataInitialValues {
        nameClient: string;
        emailClient: string;
        addressClient: string;
        nameProfessional: string;
        emailProfessional: string;
        addressProfessional: string;
        currentDate: string;
        approxDuration: string;
        details: string;
        budget: Number;
        addressWorke: string;
        firmaClient: string;
        firmaProfessional: string;
    }

    const initialValues: DataInitialValues = {
        nameClient: "",
        emailClient: "",
        addressClient: "",
        nameProfessional: "",
        emailProfessional: "",
        addressProfessional: "",
        currentDate: "",
        approxDuration: "",
        details: "",
        budget: 0,
        addressWorke: "",
        firmaClient: "",
        firmaProfessional: "",
    };

    const validationSchema = Yup.object({
        approxDuration: Yup.string().required("La duración es requerida."),
        budget: Yup.string().required("El presupuesto es requerido."),
        detalles: Yup.string().required("Los detalles son requeridos."),
    });

    const onSubmit = async (values: DataInitialValues, actions: any) => {

        try {
            const { data } = await axios.post("/api/contract", {
                nameClient: values.nameClient,
                emailUser: values.emailClient,
                addressUser: values.addressClient,
                nameProfessional: values.nameProfessional,
                emailProfessional: values.emailProfessional,
                addressProfessional: values.addressProfessional,
                currentDate: values.currentDate,
                approxDuration: values.approxDuration,
                budget: values.budget,
                details: values.details,
                addressWork: values.addressWorke,
                firmaClient: values.firmaClient,
                firmaProfessional: values.firmaProfessional,
            });

            if (!data) {
                toast({
                    title: "Error al crear el Contrato.",
                    description:
                        "Comprueba las datos ingresados, si el error persiste no dude en contactarnos.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                alert("Error al crear el contrato");
                actions.resetForm()
            } else {
                signOut();
            }
        } catch (err) {
            toast({
                title: "Error al crear el Contrato.",
                description:
                    "Compruebe los datos ingresados, si el error persiste no dude en contactarnos.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return {
        initialValues,
        validationSchema,
        onSubmit,
        input,
        setInput,
        loading,
    }
}

export default useHelper