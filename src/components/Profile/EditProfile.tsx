//chakra
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Skeleton,
} from "@chakra-ui/react";
import { IUser } from "models/User/IUser";
//types
import { Session } from "next-auth/core/types";
//from modules
import { useEffect, useState, useRef, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import axios from "axios";

//crop
import Image from "next/image";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { getCroppedImg } from "./cropperUtils";

const EditProfile: React.FC<{
  user: Session;
  isOpenEditProfile: boolean;
  onCloseEditProfile(): void;
  greenColor: string;
  warningColor: string;
}> = ({
  user,
  isOpenEditProfile,
  onCloseEditProfile,
  greenColor,
  warningColor,
}) => {
  useEffect(() => {}, [user]);
  const toast = useToast();

  const {
    isOpen: isOpenDeleteImage,
    onOpen: onOpenDeleteImage,
    onClose: onCloseDeleteImage,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateImage,
    onOpen: onOpenUpdateImage,
    onClose: onCloseUpdateImage,
  } = useDisclosure();

  interface DataInitialValues {
    name: string;
    phone: string;
    adress: string;
    timeZone: string;
  }

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string>("");

  const loadFiles = (pic: File) => {
    if (!pic) {
      toast({
        title: "Seleccione una imagen",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      setImage(URL.createObjectURL(pic));
      onOpenUpdateImage();
    } else {
      toast({
        title: "Seleccione una imagen valida",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const initialValues: DataInitialValues = {
    name: user.name,
    phone: user.phone,
    adress: "",
    timeZone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre no puede estar vacio."),
    phone: Yup.string()
      .required("El numero de telefono es requerido")
      .matches(/^[0-9,+]*$/, "Este campo solo acepta números")
      .min(8, "Número de teléfono invalido."),
    adress: Yup.string().required("requerido"),
  });

  const onSubmit = async (values: DataInitialValues) => {
    console.log(values);
  };

  return (
    <Modal isOpen={isOpenEditProfile} onClose={onCloseEditProfile}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={greenColor}>Modificar tu Perfil</ModalHeader>
        <ModalCloseButton size={"lg"} />
        <ModalBody>
          <Flex justifyContent={"center"}>
            <Avatar w={180} h={180} src={user.image} name={user.name}>
              <Tooltip label="Eliminar Foto">
                <AvatarBadge
                  as={IconButton}
                  size="md"
                  rounded="full"
                  top="-10px"
                  right="14px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={onOpenDeleteImage}
                />
              </Tooltip>
              <Tooltip label="Editar foto">
                <AvatarBadge
                  as={IconButton}
                  w={"1rem"}
                  size="md"
                  rounded="full"
                  bottom="0"
                  left="0px"
                  colorScheme="green"
                  aria-label="remove Image"
                  icon={<EditIcon />}
                  onClick={() => inputFileRef.current?.click()}
                />
              </Tooltip>
            </Avatar>
            <DeleteImage {...{ user, isOpenDeleteImage, onCloseDeleteImage }} />
            <Input
              type={"file"}
              accept="image/*"
              ref={inputFileRef}
              d={"none"}
              onChange={(e: any) => loadFiles(e.target.files[0])}
            />
            <UpdateImage
              {...{
                user,
                isOpenUpdateImage,
                onCloseUpdateImage,
                image,
                setImage,
                inputFileRef,
              }}
            />
          </Flex>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors, handleBlur }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <InputControl
                  name="name"
                  label="Nombre"
                  inputProps={{
                    placeholder: "Nombre",
                    autoComplete: "off",
                  }}
                />
                <InputControl
                  name="phone"
                  label="Número de Celular"
                  inputProps={{
                    placeholder: "Número",
                    autoComplete: "off",
                  }}
                />
                <InputControl
                  name="adress"
                  label="Dirección"
                  inputProps={{
                    placeholder: "Dirección",
                    autoComplete: "off",
                  }}
                />
                <InputControl
                  name="timeZone"
                  label="Zona Horaria"
                  inputProps={{
                    placeholder: "Zona Horaria",
                    autoComplete: "off",
                  }}
                />
                <Alert
                  status="info"
                  borderRadius={"10px"}
                  marginTop={10}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <AlertIcon />
                  Recordá que para modificar datos sensibles como contraseñas,
                  correos y más, debes ingresar en Ajustes de Cuenta.
                </Alert>
                <ModalFooter p={"40px 0px 20px 0px"}>
                  <ButtonGroup>
                    <Button colorScheme={"blue"} onClick={onCloseEditProfile}>
                      Cancelar
                    </Button>
                    <SubmitButton
                      colorScheme={"green"}
                      disabled={Object.keys(errors).length > 0 ? true : false}
                    >
                      Actualizar
                    </SubmitButton>
                  </ButtonGroup>
                </ModalFooter>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const DeleteImage: React.FC<{
  user: Session;
  isOpenDeleteImage: boolean;
  onCloseDeleteImage(): void;
}> = ({ user, isOpenDeleteImage, onCloseDeleteImage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const deleteImage = async () => {
    setLoading(true);
    try {
      await axios.put("/api/user/deleteImage", { email: user.email });
      reloadSession();
      setLoading(false);
      onCloseDeleteImage();
    } catch (err) {
      setLoading(false);

      toast({
        title: "Error al eliminar la foto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseDeleteImage();
  };

  return (
    <Modal isOpen={isOpenDeleteImage} onClose={onCloseDeleteImage}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          ¿Esta seguro que desea eliminar su imagen de perfil?
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onCloseDeleteImage} colorScheme={"blue"}>
              Cancelar
            </Button>
            <Button
              onClick={deleteImage}
              colorScheme={"red"}
              isLoading={loading}
            >
              Confirmar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const UpdateImage: React.FC<{
  user: Session;
  isOpenUpdateImage: boolean;
  onCloseUpdateImage(): void;
  image: string;
  setImage(value: string): void;
  inputFileRef: any;
}> = ({
  user,
  isOpenUpdateImage,
  onCloseUpdateImage,
  image,
  setImage,
  inputFileRef,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      const newImage = await fetch(croppedImage)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `${user.name} ProfilePic`, {
              type: "image/png",
            })
        );
      setCroppedImage(newImage);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, croppedAreaPixels, rotation]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const editProfilePic = async () => {
    try {
      setLoading(true);
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      const newImage = await fetch(croppedImage)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `${user.name} ProfilePic`, {
              type: "image/png",
            })
        );

      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("path", `users/${user.email}`);
      formData.append("title", `${user.name}-profile-pic`);

      const { data } = await axios.post(
        "http://localhost:8080/aws/upload-file",
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );

      await axios.put("/api/user", { email: user.email, image: data.url });

      setLoading(false);
      reloadSession();
      onCloseUpdateImage();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Error al cargar la foto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpenUpdateImage} onClose={onCloseUpdateImage}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Recortar la Foto
          <ModalCloseButton size={"lg"} />
        </ModalHeader>
        <ModalBody p={0}>
          <Box height={"20rem"} marginBottom={"1rem"} position={"relative"}>
            <Cropper
              restrictPosition={true}
              cropShape="round"
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 290, height: 290 }}
            />
            <Button
              position={"absolute"}
              bottom={0}
              variant={"ghost"}
              colorScheme={"white"}
              color={"white"}
              onClick={showCroppedImage}
            >
              Vista Previa
            </Button>
          </Box>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Text>Zoom</Text>
            <Slider
              width={"90%"}
              size={"lg"}
              value={zoom}
              min={1}
              max={3}
              step={0.001}
              aria-label="Zoom"
              onChange={(zoom) => setZoom(zoom)}
            >
              <SliderTrack bg="green.100" boxSize={2}>
                <SliderFilledTrack bg="green" />
              </SliderTrack>
              <SliderThumb boxSize={6} bg={"green"}>
                <Box bg="tomato" />
              </SliderThumb>
            </Slider>
          </Flex>
          {croppedImage && (
            <Box p={3}>
              <Text color={"grey"} marginTop={2}>
                Vista Previa
              </Text>
              <Flex marginTop={2}>
                <Avatar src={croppedImage} name={user.name} size="md" />
                <Box marginLeft={3}>
                  <Text textTransform={"capitalize"}>{user.name}</Text>
                  <Box
                    height="20px"
                    width={"140px"}
                    bg={"gray.700"}
                    borderRadius={"10px"}
                    marginTop={1}
                  />
                </Box>
              </Flex>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              onClick={() => {
                onCloseUpdateImage();
                setCrop({ x: 0, y: 0 });
                setRotation(0);
                setZoom(1);
                setImage("");
                setCroppedImage(null);
                inputFileRef.current.value = "";
              }}
              colorScheme={"blue"}
            >
              Cancelar
            </Button>
            <Button
              colorScheme={"green"}
              isLoading={loading}
              onClick={editProfilePic}
            >
              Confirmar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
