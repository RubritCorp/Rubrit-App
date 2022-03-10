//from chakra
import {
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  Button,
  AccordionIcon,
  AccordionPanel,
  FormLabel,
  InputGroup,
  InputRightElement,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//from modules
import { Session } from "next-auth/core/types";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
//helper
import useHelper from "./useHelper";

type Props = {
  session: Session;
};

const CreatePassword = ({ session }: Props) => {
  const {
    show,
    loading,
    initialValuesNewPassword,
    validationSchemaNewPassword,
    onSubmitCreatePassword,
    setShow,
  } = useHelper(session);
  return (
    <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
      <h2>
        <AccordionButton
          _focus={{ border: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          <Box flex={1} textAlign={"left"}>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>
              Crear Contraseña
            </Text>
            <Text d={"inline"} fontSize={{ base: "xs", md: "md" }}>
              Solo funcionará en caso de que haya registrado su cuenta con algun
              servicio externo a Rubrit App.
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pt={4}>
        <Box mt={4}>
          <Formik
            initialValues={initialValuesNewPassword}
            validationSchema={validationSchemaNewPassword}
            onSubmit={onSubmitCreatePassword}
          >
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <Flex>
                  <Flex flexDirection={"column"} mr={10}>
                    <FormLabel mt={4}>Contraseña</FormLabel>
                    <InputGroup>
                      <InputControl
                        inputProps={{
                          placeholder: "Nueva Contraseña",
                          type: show ? "text" : "password",
                          autoComplete: "off",
                        }}
                        name="createPassword"
                      />
                      <InputRightElement>
                        <Button
                          bg={"medium_green"}
                          _hover={{
                            bg: "light_green_sub.700",
                          }}
                          onClick={() => setShow(!show)}
                        >
                          {show ? (
                            <ViewOffIcon color={"#fafafa"} />
                          ) : (
                            <ViewIcon color={"#fafafa"} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Flex>
                  <Flex flexDirection={"column"}>
                    <FormLabel mt={4}>Repetir Contraseña</FormLabel>
                    <InputGroup>
                      <InputControl
                        name="confirmCreatePassword"
                        onBlur={handleBlur}
                        inputProps={{
                          placeholder: "Contraseña",
                          type: show ? "text" : "password",
                          autoComplete: "off",
                        }}
                      />
                      <InputRightElement>
                        <Button
                          bg={"medium_green"}
                          _hover={{
                            bg: "light_green_sub.700",
                          }}
                          onClick={() => setShow(!show)}
                        >
                          {show ? (
                            <ViewOffIcon color={"#fafafa"} />
                          ) : (
                            <ViewIcon color={"#fafafa"} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Flex>
                </Flex>
                <ButtonGroup
                  mt={6}
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={{ base: "center", md: "" }}
                >
                  <SubmitButton
                    w={"10rem"}
                    mb={{ base: "1rem", md: 0 }}
                    colorScheme="blue"
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    disabled={
                      Object.keys(errors).length > 0 ||
                      !Object.values(values)[0].length
                        ? true
                        : false
                    }
                    isLoading={loading}
                  >
                    Crear Contraseña
                  </SubmitButton>

                  <ResetButton
                    colorScheme={"green"}
                    mr={3}
                    fontSize={{ base: "xs", md: "l", lg: "l" }}
                    w={"10rem"}
                  >
                    Reiniciar
                  </ResetButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CreatePassword;
