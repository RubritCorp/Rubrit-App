import {
    Flex,
    useColorModeValue,
    Container,
    Text,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    Button,
    AccordionIcon,
    AccordionPanel,
    useDisclosure,
    useTheme,
    FormLabel,
    InputGroup,
    InputRightElement,
    ButtonGroup,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import {
    InputControl,
    NumberInputControl,
    PercentComplete,
    RadioGroupControl,
    ResetButton,
    SelectControl,
    SliderControl,
    SubmitButton,
    SwitchControl,
    TextareaControl,
} from "formik-chakra-ui";
import useHelper from "./useHelper";
import { Session } from "next-auth/core/types";
import { useRouter } from "next/router";
import { ReactChild, ReactFragment, ReactPortal } from "react";

const Form: React.FC<{ session: Session }> = ({ session }) => {
    const theme = useTheme();
    const router = useRouter();
    const { isAuthenticated, code } = router.query;


    const {
        input,
        loading,
        initialValues,
        validationSchema,
        setLoading,
        onSubmit,
        setInput,
    } = useHelper(session, `${isAuthenticated}`, `${code}`);
    return (
        <VStack
            as="form"
            mx="auto"
            w={{ base: "90%", md: 500 }}
            h="100vh"
            justifyContent="center"
        >

            <Heading>
                Contrato de Acuerdo
            </Heading>
            <Accordion
                allowToggle
                borderTop={"transparent"}
                defaultIndex={isAuthenticated === "true" ? 0 : 99}
            >
                <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
                    <h2>
                        <AccordionButton
                            _focus={{ border: "transparent" }}
                            _hover={{ bg: "transparent" }}
                        >
                            <Box flex={1} textAlign={"left"}>
                                <Text fontSize={"lg"} fontWeight={500}>
                                    Cliente
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pt={4}>
                        <Box mt={4}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ handleSubmit, values, errors, handleBlur }) => (
                                    <Box as="form" onSubmit={handleSubmit as any}>
                                        <Field
                                            name="nameUser"
                                            type= "text"
                                            >
                                            {(blunde: { field: { value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }; }) => (
                                                <div>{blunde.field.value}</div>
                                            )}
                                            
                                        </Field>
                                        <InputControl
                                            name="emailUser"
                                            inputProps={{
                                                placeholder: "email",
                                                type: "email",
                                                autoComplete: "off",
                                            }}
                                        />
                                        <InputControl
                                            name="addressUser"
                                            inputProps={{
                                                placeholder: "dirección",
                                                type: "text",
                                                autoComplete: "off",
                                            }}
                                        />
                                    </Box>
                                )}
                            </Formik>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton
                            _focus={{ border: "transparent" }}
                            _hover={{ bg: "transparent" }}
                        >
                            <Box flex="1" textAlign={"left"}>
                                <Text fontSize={"lg"} fontWeight={500}>
                                    Profesional
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pt={4}>
                        <Box mt={4}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ handleSubmit, values, errors, handleBlur }) => (
                                    <Box as="form" onSubmit={handleSubmit as any}>
                                        <InputControl
                                            name="nameProfesional"
                                            inputProps={{
                                                placeholder: "nombre",
                                                type: "text",
                                                autoComplete: "off",
                                            }}
                                        />
                                        <InputControl
                                            name="emailProfesional"
                                            inputProps={{
                                                placeholder: "email",
                                                type: "email",
                                                autoComplete: "off",
                                            }}
                                        />
                                        <InputControl
                                            name="addressProfesional"
                                            inputProps={{
                                                placeholder: "dirección",
                                                type: "text",
                                                autoComplete: "off",
                                            }}
                                        />
                                    </Box>
                                )}
                            </Formik>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit, values, errors, handleBlur,handleChange }) => (
                    <Box as="form" onSubmit={handleSubmit as any}>
                        <InputControl
                            name="approxDuration"
                            inputProps={{
                                placeholder: "duracionAproximada",
                                type: "text",
                                autoComplete: "off",
                                onChange:handleChange,
                                onBlur: handleBlur,
                            }}
                        />
                        <InputControl
                            name="currentDate"
                            inputProps={{
                                placeholder: "Fecha",
                                type: "date",
                                autoComplete: "off",
                                onBlur: handleBlur,
                                onChange:handleChange,
                            }}
                        />
                        <InputControl
                            name="budget"
                            inputProps={{
                                placeholder: "presupuesto",
                                type: "Number",
                                autoComplete: "off",
                                onBlur: handleBlur,
                                onChange:handleChange,
                            }}
                        />
                        <TextareaControl
                            name="details"
                            label="detalles"
                            placeholder="detalles"
                            resize="vertical"
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </Box>
                )}
            </Formik>
            <Button type='submit' variant='outline' colorScheme='teal'>
                Crear Acuerdo
            </Button>
        </VStack>
    );
};

export default Form;
