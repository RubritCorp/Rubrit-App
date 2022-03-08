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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  InputLeftAddon,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import {
  ChevronDownIcon,
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
//assets
import SocialButtons from "./SocialButtons";

const Register: React.FC<{
  setIsAuth(value: boolean): void;
  setIsLogin(value: boolean): void;
}> = ({ setIsAuth, setIsLogin }) => {
  const {
    initialValues,
    validationSchema,
    countries,
    countryCode,
    setCountryCode,
    onSubmit,
  } = useHelper({ setIsLogin });
  const theme = useTheme();
  const { onClose } = useDisclosure();
  const [mailProfile, setMailProfile] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

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
      <ModalCloseButton onClick={() => setCountryCode("País")} />
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
                    <InputLeftAddon p={0}>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          {countryCode}
                        </MenuButton>
                        <MenuList>
                          {countries.map((m, i: number) => (
                            <MenuItem key={i}>
                              <Button
                                leftIcon={m.img}
                                value={m.code}
                                fontWeight={400}
                                variant={"ghost"}
                                onClick={() => setCountryCode(m.code)}
                                _hover={{ bg: "transparent" }}
                              >
                                {m.name} {m.code}
                              </Button>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </InputLeftAddon>
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
                            Mediante tu número de celular hacemos una aplicación
                            mas segura para todos, gracias por su colaboración!
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
                  <Box d={"flex"} justifyContent={"center"} marginTop={"2rem"}>
                    <ReCAPTCHA
                      sitekey={`${process.env.CAPTCHA_ID}`}
                      onChange={(e: any) => {
                        setVerified(true);
                      }}
                    />
                  </Box>
                  <ModalFooter p={"40px 0px 0px 0px"}>
                    <Button
                      mr={3}
                      fontSize={{ base: "xs", md: "l", lg: "l" }}
                      onClick={() => {
                        onClose(), setIsAuth(false), setIsLogin(true);
                      }}
                    >
                      Cancelar
                    </Button>
                    <ResetButton
                      colorScheme={"green"}
                      mr={3}
                      fontSize={{ base: "xs", md: "l", lg: "l" }}
                    >
                      Reiniciar
                    </ResetButton>

                    <SubmitButton
                      colorScheme="blue"
                      fontSize={{ base: "xs", md: "l", lg: "l" }}
                      disabled={
                        Object.keys(errors).length > 0 ||
                        !Object.values(values)[0].length ||
                        countryCode === "País" ||
                        !verified
                          ? true
                          : false
                      }
                    >
                      Registrarse
                    </SubmitButton>
                  </ModalFooter>
                </>
              </Box>
            )}
          </Formik>
        )}
      </ModalBody>
    </ModalContent>
  );
};

export default Register;
