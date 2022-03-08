import {
  Flex,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
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
} from "@chakra-ui/react";
import Image from "next/image";
import User from "assets/user.png";
import { Session } from "next-auth/core/types";
import { DeleteIcon, EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import DeleteUser from "components/Profile/DeleteUser";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Formik } from "formik";
import useHelper from "./useHelper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AccountSettings: React.FC<{ session: Session }> = ({ session }) => {
  return (
    <Tabs
      w={"100%"}
      minH={"94%"}
      variant={"enclosed"}
      defaultIndex={0}
      position={"relative"}
    >
      <Flex position={"absolute"} top={-12} left={9} alignItems={"center"}>
        <Image src={User} alt="user-image" width={"32px"} height={"32px"} />
        <Text fontSize={"32px"} fontWeight={500}>
          Cuenta
        </Text>
      </Flex>
      <TabList>
        <Tab
          fontSize={{ base: "sm", md: "xl" }}
          color={"blue.500"}
          _selected={{
            color: useColorModeValue("#2D3748", "#fafafa"),
            bg: useColorModeValue("#fafafa", "#2D3748"),
            borderTop: "2px solid gray",
            borderLeft: "2px solid gray",
            borderRight: "2px solid gray",
          }}
          _focus={{
            border: "transparent",
          }}
        >
          Ajustes
        </Tab>
        <Tab
          fontSize={{ base: "sm", md: "xl" }}
          color={"blue.500"}
          _selected={{
            color: useColorModeValue("#2D3748", "#fafafa"),
            bg: useColorModeValue("#fafafa", "#2D3748"),
            borderTop: "2px solid gray",
            borderLeft: "2px solid gray",
            borderRight: "2px solid gray",
          }}
          _focus={{
            border: "transparent",
          }}
        >
          Notificaciones
        </Tab>
      </TabList>
      <TabPanels
        bg={useColorModeValue("#fafafa", "#2D3748")}
        w={"100%"}
        minH={"100%"}
        /* border="2px solid gray" */
        borderBottom="2px solid gray"
        borderLeft="2px solid gray"
        borderRight="2px solid gray"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderTopRightRadius={5}
      >
        <TabPanel>
          <Settings {...{ session }} />
        </TabPanel>
        <TabPanel>Notificaciones</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountSettings;

const Settings: React.FC<{
  session: Session;
}> = ({ session }) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    isOpen: isOpenDeleteUser,
    onOpen: onOpenDeleteUser,
    onClose: onCloseDeleteUser,
  } = useDisclosure();
  const { isAuthenticated, code } = router.query;

  const {
    toast,
    show,
    loading,
    initialValues,
    validationSchema,
    initialValuesChangePassword,
    validationSchemaChangePassword,
    loadingResend,
    resend,
    setShow,
    setLoading,
    onSubmit,
    onSubmitChangePassword,
  } = useHelper(session, `${isAuthenticated}`, `${code}`);

  return (
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
                Contraseña
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pt={4}>
          <Box mt={4}>
            <Formik
              initialValues={initialValuesChangePassword}
              validationSchema={validationSchemaChangePassword}
              onSubmit={onSubmitChangePassword}
            >
              {({ handleSubmit, values, errors, handleBlur }) => (
                <Box as="form" onSubmit={handleSubmit as any}>
                  <InputControl
                    name="passwordChange"
                    label={
                      isAuthenticated === "true"
                        ? "Codigo de verificación"
                        : "Contraseña Actual"
                    }
                    inputProps={{
                      placeholder: "Contraseña",
                      type: "password",
                      autoComplete: "off",
                    }}
                  />
                  {isAuthenticated === "true" && (
                    <Text mt={2}>
                      No elimine el Codigo de verificación de usuario. Una vez
                      haya cambiado la constraseña, este quedara invalido.
                    </Text>
                  )}
                  <FormLabel mt={4}>Contraseña</FormLabel>
                  <InputGroup>
                    <InputControl
                      inputProps={{
                        placeholder: "Nueva Contraseña",
                        type: show ? "text" : "password",
                        autoComplete: "off",
                      }}
                      name="newPassword"
                    />
                    <InputRightElement>
                      <Button
                        bg={theme.colors.medium_green}
                        _hover={{
                          bg: theme.colors.light_green_sub[700],
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

                  <FormLabel mt={4}>Repetir Contraseña</FormLabel>
                  <InputGroup>
                    <InputControl
                      name="confirmNewPassword"
                      onBlur={handleBlur}
                      inputProps={{
                        placeholder: "Contraseña",
                        type: show ? "text" : "password",
                        autoComplete: "off",
                      }}
                    />
                    <InputRightElement>
                      <Button
                        bg={theme.colors.medium_green}
                        _hover={{
                          bg: theme.colors.light_green_sub[700],
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
                      Actualizar Contraseña
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
            <Text pt={4}>
              Al confirmar la sesión finalizara y debera ingresas nuevamente.
            </Text>
            <Text pt={4}>¿No te acuerdas de tu contraseña actual?</Text>
            <Button
              fontSize={{ base: "xs", md: "l", lg: "l" }}
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              variant="outline"
              mt={2}
              onClick={resend}
              isLoading={loadingResend}
            >
              Restablecer por correo
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      {/**/}
      <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
        <h2>
          <AccordionButton
            _focus={{ border: "transparent" }}
            _hover={{ bg: "transparent" }}
          >
            <Box flex={1} textAlign={"left"}>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight={500}>
                Dirección De Correo
              </Text>
              <Text d={"inline"} fontSize={{ base: "xs", md: "lg" }}>
                Tu dirección de correo actual es{" "}
              </Text>
              <Text
                d={"inline"}
                fontWeight={600}
                fontSize={{ base: "xs", md: "lg" }}
              >
                {session?.email}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pt={4}>
          Al cambiar la dirección de correo se le enviara un nuevo código de
          verificación para activar su cuenta. No perdera la información
          recolectada.
          <Box mt={4}>
            <Formik {...{ initialValues, validationSchema, onSubmit }}>
              {({ handleSubmit, values, errors, handleBlur }) => (
                <Box as="form" onSubmit={handleSubmit as any}>
                  <InputControl
                    name="email"
                    label="Nueva Dirección de Correo"
                    inputProps={{
                      placeholder: "Email",
                      autoComplete: "off",
                    }}
                  />
                  <FormLabel mt={4}>Contraseña</FormLabel>
                  <InputGroup>
                    <InputControl
                      inputProps={{
                        placeholder: "Contraseña",
                        type: show ? "text" : "password",
                        autoComplete: "off",
                      }}
                      name="password"
                    />
                    <InputRightElement>
                      <Button
                        bg={theme.colors.medium_green}
                        _hover={{
                          bg: theme.colors.light_green_sub[700],
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

                  <FormLabel mt={4}>Repetir Contraseña</FormLabel>
                  <InputGroup>
                    <InputControl
                      name="confirmPassword"
                      onBlur={handleBlur}
                      inputProps={{
                        placeholder: "Contraseña",
                        type: show ? "text" : "password",
                        autoComplete: "off",
                      }}
                    />
                    <InputRightElement>
                      <Button
                        bg={theme.colors.medium_green}
                        _hover={{
                          bg: theme.colors.light_green_sub[700],
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
                  <ButtonGroup
                    mt={6}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "" }}
                  >
                    <SubmitButton
                      mb={{ base: "1rem", md: 0 }}
                      w={"10rem"}
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
                      Actualizar Correo
                    </SubmitButton>

                    <ResetButton
                      colorScheme={"green"}
                      fontSize={{ base: "xs", md: "l", lg: "l" }}
                      w={"10rem"}
                    >
                      Reiniciar
                    </ResetButton>
                  </ButtonGroup>
                </Box>
              )}
            </Formik>
            <Text pt={4}>
              Al confirmar la sesión finalizara y debera ingresas nuevamente.
            </Text>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      {/**/}
      <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
        <h2>
          <AccordionButton
            _focus={{ border: "transparent" }}
            _hover={{ bg: "transparent" }}
          >
            <Box flex={1} textAlign={"left"}>
              <Text fontSize={"lg"} fontWeight={500}>
                Dirección Principal
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pt={4}>Dirección Principal</AccordionPanel>
      </AccordionItem>
      {/**/}
      <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
        <h2>
          <AccordionButton
            _focus={{ border: "transparent" }}
            _hover={{ bg: "transparent" }}
          >
            <Box flex={1} textAlign={"left"}>
              <Text fontSize={"lg"} fontWeight={500}>
                Desactivar Cuenta
              </Text>
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pt={4} w={"95%"}>
          <Flex flexDirection={{ base: "column", md: "row" }} align={"center"}>
            <Text width={{ base: "100%", md: "80%" }}>
              Tenga en cuenta que esta acción es irreversible, por lo que
              perdera toda la información cargada, servicios activos e
              inactivos. Si posee la suscripcion premium, esta sera suspendida
              de manera automatica.
            </Text>
            <Button
              w={{ base: "100%", md: "17rem" }}
              mt={{ base: "1rem", md: 0 }}
              bg={theme.colors.warning_red}
              color="#fafafa"
              _hover={{
                boxShadow: "2px 2px 5px gray",
              }}
              rightIcon={<DeleteIcon />}
              onClick={onOpenDeleteUser}
            >
              Desactivar Cuenta
            </Button>
            <DeleteUser
              {...{ isOpenDeleteUser, onCloseDeleteUser }}
              warningColor={theme.colors.warning_red}
              user={session}
            />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
