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
        nameUser: string;
        emailUser: string;
        addressUser: string;
        nameProfessional: string;
        emailProfessional: string;
        addressProfessional: string;
        currentDate: Date;
        approxDuration: string;
        budget: string;
        detalles: string;
        state: Boolean;
    }

    const initialValues: DataInitialValues = {
        nameUser: "",
        emailUser: "",
        addressUser: "",
        nameProfessional: "",
        emailProfessional: "",
        addressProfessional: "",
        currentDate: new Date(),
        approxDuration: "",
        budget: "",
        detalles: "",
        state: false,
    };

    const validationSchema = Yup.object({
        approxDuration: Yup.string().required("La duración es requerida."),
        budget: Yup.string().required("El presupuesto es requerido."),
        detalles: Yup.string().required("Los detalles son requeridos."),
    });

    const onSubmit = async (values: DataInitialValues, actions: any) => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api//contract", {
                nameUser: values.nameUser,
                emailUser: values.emailUser,
                addressUser: values.addressUser,
                nameProfessional: values.nameProfessional,
                emailProfessional: values.emailProfessional,
                addressProfessional: values.addressProfessional,
                currentDate: values.currentDate,
                approxDuration: values.approxDuration,
                budget: values.budget,
                detalles: values.detalles,
                state: values.state,
            });

            if (!data) {
                setLoading(false);
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
                setLoading(false);
                signOut();
            }
        } catch (err) {
            setLoading(false);
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
        setLoading,
    }
}

export default useHelper