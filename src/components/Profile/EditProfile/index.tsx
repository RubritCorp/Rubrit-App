//chakra
import {
  ChevronDownIcon,
  EditIcon,
  InfoIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
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
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormLabel,
} from "@chakra-ui/react";
//types
import { Session } from "next-auth/core/types";
//from modules
import { Formik } from "formik";
import { InputControl, SliderControl, SubmitButton } from "formik-chakra-ui";
//components
import DeleteImage from "../DeleteImage";
import { LocationControl } from "components/CustomFormControls/LocationControl";
import { CityControl } from "components/CustomFormControls/CityControl";
//assets
import UpdateImage from "../UpdateImage";
import useHelper from "./useHelper";

const EditProfile: React.FC<{
  user: Session;
  isOpenEditProfile: boolean;
  onCloseEditProfile(): void;
}> = ({ user, isOpenEditProfile, onCloseEditProfile }) => {
  const {
    image,
    loading,
    countries,
    countryCode,
    inputFileRef,
    initialValues,
    validationSchema,
    isOpenDeleteImage,
    isOpenUpdateImage,
    onCloseUpdateImage,
    onCloseDeleteImage,
    onOpenDeleteImage,
    setCountryCode,
    loadFiles,
    onSubmit,
    setImage,
  } = useHelper({ user, onCloseEditProfile });

  return (
    <Modal isOpen={isOpenEditProfile} onClose={onCloseEditProfile}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"medium_green"}>Modificar tu Perfil</ModalHeader>
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
            {({ handleSubmit, values, errors }) => {
              return (
                <Box as="form" onSubmit={handleSubmit as any}>
                  <InputControl
                    name="name"
                    label="Nombre"
                    inputProps={{
                      placeholder: "Nombre",
                      autoComplete: "off",
                    }}
                  />
                  <FormLabel pt={4}>Número de Celular</FormLabel>
                  <InputGroup>
                    <InputLeftAddon p={0}>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          {countryCode}
                        </MenuButton>
                        <MenuList>
                          {countries.map((m, i: number) => (
                            <MenuItem key={i} value={m.code}>
                              {m.img}
                              <Text
                                ml={3}
                                fontWeight={400}
                                variant={"ghost"}
                                onClick={() => setCountryCode(m.code)}
                                _hover={{ bg: "transparent" }}
                              >
                                {m.name} {m.code}
                              </Text>
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
                            bg={"medium_green"}
                            _hover={{
                              bg: "light_green_sub.700",
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

                  <Box mt={3}>
                    <CityControl label="Ciudad" name="city" />
                  </Box>

                  <Box mt={3}>
                    <LocationControl label="Dirección" name="address" />
                  </Box>

                  <Flex mt={2} justifyContent={"space-between"}>
                    <FormLabel>Rango de Busqueda</FormLabel>
                    <Text>{values.searchRange} km</Text>
                  </Flex>
                  <SliderControl
                    name="searchRange"
                    sliderProps={{ max: 140, min: 2 }}
                  />

                  <FormLabel mt={3}>Zona Horaria</FormLabel>

                  <InputGroup flexDirection={"column"}>
                    <InputControl
                      name="timeZone"
                      inputProps={{
                        placeholder: "Zona Horaria",
                        autoComplete: "off",
                      }}
                    />
                  </InputGroup>

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
                        isLoading={loading}
                        colorScheme={"green"}
                        disabled={
                          Object.keys(errors).length > 0 ||
                          !Object.values(values)[0].length ||
                          countryCode === "País"
                            ? true
                            : false
                        }
                      >
                        Actualizar
                      </SubmitButton>
                    </ButtonGroup>
                  </ModalFooter>
                </Box>
              );
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
