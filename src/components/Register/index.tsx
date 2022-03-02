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
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

interface DataInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialValues: DataInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo electronico invalido")
    .required("El correo es requerido"),
  phone: Yup.number().required("El numero de telefono es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .required("Debe confirmar la contraseña")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Las contraseñas deben coincidir"
      ),
    }),
});

const Register: React.FC<{
  setIsAuth(value: boolean): void;
  setIsLogin(value: boolean): void;
}> = ({ setIsAuth, setIsLogin }) => {
  const theme = useTheme();
  const { onClose } = useDisclosure();
  const [show, setShow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [verified, setVerified] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async (values: DataInitialValues) => {
    const user = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
      phone: `${values.phone}`,
    };
    try {
      const { data } = await axios.post("/api/auth/signup", user);

      toast({
        title: `¡Felicidades ${data.user.name}!`,
        description: "Tu cuenta fue creada con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "¡Lo Sentimos!.",
        description: "Hubo un error al crear la cuenta.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      //console.log(err);
    }
  };

  return (
    <ModalContent position={"relative"}>
      {step === 2 && (
        <ChevronLeftIcon
          w={6}
          h={6}
          position={"absolute"}
          top={"13px"}
          left={"15px"}
          onClick={() => setStep(1)}
          cursor={"pointer"}
        />
      )}

      <ModalHeader textAlign={"center"} color={theme.colors.medium_green}>
        Registrate
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
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
                        onClose(), setIsAuth(false);
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
                        onClose(), setIsAuth(false);
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
      </ModalBody>
    </ModalContent>
  );
};

export default Register;

/* 
import {useCallback} from 'react
import Image from "next/image";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
//assets
import User from "assets/user.png";

  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,

 const [fileUrl, setFileUrl] = useState<string>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log("a", croppedArea, croppedAreaPixels);
    },
    []
  );

  const processImage = (e: any) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
    }
  };

<Box
                    d={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    {!fileUrl?.length ? (
                      <Box w={"12rem"} height={"12rem"} position={"relative"}>
                        <Image
                          src={fileUrl ? fileUrl : User}
                          alt="defaultUserPic"
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    ) : (
                      <Box
                        w={"20rem"}
                        height={"20rem"}
                        marginBottom={"1rem"}
                        position={"relative"}
                      >
                        <Cropper
                          restrictPosition={true}
                          cropShape="round"
                          image={fileUrl}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropSize={{ width: 200, height: 200 }}
                          style={{
                            containerStyle: {
                              borderRadius: "50%",
                            },
                          }}
                        />
                      </Box>
                    )}

                    <Input
                      type={"file"}
                      p={"1.5"}
                      accept="image/*"
                      onChange={processImage}
                      marginTop={"1rem"}
                    />
                  </Box>
*/
