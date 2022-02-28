//from chakra
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  Text,
  Box,
  useTheme,
  HStack,
  PinInput,
  PinInputField,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import {
  ChevronLeftIcon,
  InfoIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
//from modules
import { useState } from "react";
import { Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
//helper
import { useHelper } from "./useHelper";
import SocialButtons from "./SocialButtons";

const Register: React.FC<{
  setIsAuth(value: boolean): void;
  setIsLogin(value: boolean): void;
}> = ({ setIsAuth, setIsLogin }) => {
  const { initialValues, validationSchema, onSubmit } = useHelper();
  const theme = useTheme();
  const { onClose } = useDisclosure();
  const [mailProfile, setMailProfile] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [verified, setVerified] = useState<boolean>(false);

  return (
    <ModalContent position={"relative"}>
      {step === 2 ||
        (mailProfile && (
          <ChevronLeftIcon
            w={6}
            h={6}
            position={"absolute"}
            top={"13px"}
            left={"15px"}
            onClick={() => setMailProfile(false)}
            cursor={"pointer"}
          />
        ))}

      <ModalHeader textAlign={"center"} color={theme.colors.medium_green}>
        Registrate
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        {!mailProfile && (
          <SocialButtons
            {...{ setIsLogin, setMailProfile }}
            color={theme.colors.medium_green}
          />
        )}
        {mailProfile && (
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                {step === 1 ? (
                  <>
                    <InputControl
                      name="firstName"
                      label="Nombre"
                      inputProps={{
                        placeholder: "Nombre",
                        autoComplete: "off",
                      }}
                    />
                    <InputControl
                      name="lastName"
                      label="Apellido"
                      inputProps={{
                        placeholder: "Apellido",
                        autoComplete: "off",
                      }}
                    />
                    <InputControl
                      name="email"
                      label="Email"
                      inputProps={{
                        placeholder: "Email",
                        autoComplete: "off",
                      }}
                    />

                    <FormLabel>Numero de Teléfono</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>+54</InputLeftAddon>
                      <InputControl
                        name="phone"
                        inputProps={{
                          placeholder: "Numero de teléfono",
                          autoComplete: "off",
                        }}
                      />
                      <InputRightElement position={"absolute"} zIndex={999}>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              bg={theme.colors.medium_green}
                              _hover={{
                                bg: theme.colors.light_green_sub[700],
                              }}
                            >
                              <InfoIcon color={"#fafafa"} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader textAlign={"center"} color={"red"}>
                              ¡No compartiremos tu número a nadie!
                            </PopoverHeader>
                            <PopoverBody>
                              Mediante tu número de celular hacemos una
                              aplicación mas segura para todos, gracias por su
                              colaboración!
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </InputRightElement>
                    </InputGroup>

                    <FormLabel>Contraseña</FormLabel>
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

                    <FormLabel>Repetir Contraseña</FormLabel>
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

                    <Text paddingTop={"30px"} d={"inline-block"}>
                      Ya tienes una cuenta?
                    </Text>
                    <Text
                      display={"inline"}
                      color={theme.colors.medium_green}
                      cursor={"pointer"}
                      onClick={() => setIsLogin(true)}
                    >
                      {" "}
                      Inicia Sesión
                    </Text>
                    <Box
                      d={"flex"}
                      justifyContent={"center"}
                      marginTop={"2rem"}
                    >
                      <ReCAPTCHA
                        sitekey={`${process.env.CAPTCHA_ID}`}
                        onChange={(e: any) => {
                          setVerified(true);
                        }}
                      />
                    </Box>
                    <ModalFooter p={"40px 0px 0px 0px"}>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                        onClick={() => setStep(2)}
                        disabled={
                          Object.keys(errors).length > 0 ||
                          !Object.values(values)[0].length ||
                          !verified
                            ? true
                            : false
                        }
                      >
                        Registrarse
                      </Button>

                      <ResetButton
                        colorScheme={"green"}
                        mr={3}
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                      >
                        Reiniciar
                      </ResetButton>
                      <Button
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                        onClick={() => {
                          onClose(), setIsAuth(false), setIsLogin(true);
                        }}
                      >
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                ) : (
                  <>
                    <HStack d={"flex"} justifyContent={"center"} h={"10rem"}>
                      <PinInput type="alphanumeric">
                        <PinInputField w={"4rem"} h={"4rem"} />
                        <PinInputField w={"4rem"} h={"4rem"} />
                        <PinInputField w={"4rem"} h={"4rem"} />
                        <PinInputField w={"4rem"} h={"4rem"} />
                      </PinInput>
                    </HStack>

                    <ModalFooter p={"40px 0px 0px 0px"}>
                      <SubmitButton
                        colorScheme="blue"
                        mr={3}
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                      >
                        Registrarse
                      </SubmitButton>
                      <ResetButton
                        colorScheme="green"
                        mr={3}
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                      >
                        Reiniciar
                      </ResetButton>
                      <Button
                        fontSize={{ base: "xs", md: "l", lg: "l" }}
                        onClick={() => {
                          onClose(), setIsAuth(false), setIsLogin(true);
                        }}
                      >
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </Box>
            )}
          </Formik>
        )}
      </ModalBody>
    </ModalContent>
  );
};

export default Register;
