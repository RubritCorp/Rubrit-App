//from chakra
import {
  Flex,
  Box,
  Text,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
  Alert,
  AlertIcon,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
//from modules
import { Formik } from "formik";
import Image from "next/image";
import { SubmitButton, TextareaControl } from "formik-chakra-ui";
//components
import UploadImages from "./UploadImages";
import UploadCategories from "./UploadCategories";
import Map from "components/Maps/Map";
//helper
import useHelper from "./useHelper";
//assets
import WorkerIcon from "assets/worker.png";
import { ChevronDownIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
//types
import { Session } from "next-auth/core/types";
import UploadRange from "./UploadRange";

type Props = {
  session: Session;
};

const ProfessionalForm = ({ session }: Props) => {
  const {
    loading,
    categories,
    serviceRange,
    serviceImages,
    initialValues,
    userCategories,
    validationSchema,
    certificationImages,
    userCategoriesAsArray,
    setCertificationImages,
    setUserCategories,
    setServicesImages,
    setServiceRange,
    onSubmit,
  } = useHelper({ session });

  const {
    isOpen: isOpenUploadCategories,
    onOpen: onOpenUploadCategories,
    onClose: onCloseUploadCategories,
  } = useDisclosure();

  const {
    isOpen: isOpenUploadImages,
    onOpen: onOpenUploadImages,
    onClose: onCloseUploadImages,
  } = useDisclosure();

  const {
    isOpen: isOpenUploadCertification,
    onOpen: onOpenUploadCertification,
    onClose: onCloseUploadCertification,
  } = useDisclosure();

  const {
    isOpen: isOpenUploadRange,
    onOpen: onOpenUploadRange,
    onClose: onCloseUploadRange,
  } = useDisclosure();

  return (
    <Box mt={16} w={"100%"} position={"relative"}>
      <Flex position={"absolute"} top={-12} left={9} alignItems={"center"}>
        <Image
          src={WorkerIcon}
          alt="user-image"
          width={"32px"}
          height={"32px"}
        />
        <Text fontSize={{ base: "md", md: "28px" }} ml={2} fontWeight={500}>
          Modificar Perfil Profesional
        </Text>
      </Flex>
      <Flex
        bg={useColorModeValue("#fafafa", "#1A202C")}
        w={"100%"}
        border="1px solid gray"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderTopRightRadius={5}
        borderTopLeftRadius={5}
        alignItems={"center"}
        flexDirection={"column"}
        width={"100%"}
        minH={"100%"}
        padding={"1rem"}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, errors }) => (
            <Box as="form" onSubmit={handleSubmit as any} w={"90%"}>
              <TextareaControl
                name="description"
                label="Descripcion de tu experiencia"
                padding={"0.5rem 0"}
                textareaProps={{
                  resize: "none",
                  placeholder: "Soy diseñador de interiores . . .",
                }}
              />
              <TextareaControl
                name="shortDescription"
                label="Descripcion corta de tu trabajo"
                padding={"0.5rem 0"}
                textareaProps={{
                  resize: "none",
                  placeholder: "Me especializo en . . .",
                }}
              />
              <Alert
                status={"info"}
                textAlign={"center"}
                color={"gray.500"}
                fontSize={"small"}
                borderRadius={5}
                mt={2}
              >
                <AlertIcon />
                Esta es una descripción corta acerca de lo que haces, servirá
                para dar una primera impresión a quienes vean tu perfil
              </Alert>

              <Flex
                padding={"0.5rem 0"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
              >
                <Text fontWeight={500}>Imagenes de trabajos realizados</Text>
                <Button
                  rightIcon={
                    <EditIcon boxSize={{ base: "15px", md: "25px" }} />
                  }
                  onClick={onOpenUploadImages}
                  size={"md"}
                >
                  {serviceImages.length ? "Editar" : "Añadir"}
                </Button>
                <UploadImages
                  isOpen={isOpenUploadImages}
                  onClose={onCloseUploadImages}
                  images={serviceImages}
                  setImages={setServicesImages}
                  typeImages={"images"}
                />
              </Flex>

              {serviceImages.length > 0 ? (
                <>
                  <Flex justifyContent={"space-evenly"} w={"100%"} mt={7}>
                    {serviceImages.slice(0, 3).map((m, i) => (
                      <Box
                        key={i}
                        position={"relative"}
                        w={"32%"}
                        h={"150px"}
                        bgGradient="linear(to-r, #ddd, #e8e8e8)"
                        backgroundImage={m}
                        backgroundPosition={"center"}
                        backgroundSize={"cover"}
                        borderRadius={7}
                      ></Box>
                    ))}
                  </Flex>
                  <Text
                    color="gray"
                    fontSize={{ base: "sm", md: "lg" }}
                    textAlign={{ base: "center", md: "start" }}
                    mt={2}
                  >
                    Mostrando {serviceImages.slice(0, 3).length} de{" "}
                    {serviceImages.length}{" "}
                    {serviceImages.length === 1 ? "Elemento" : "Elementos"}
                  </Text>
                </>
              ) : (
                <Text
                  textAlign={"center"}
                  color={"gray.500"}
                  fontSize={"small"}
                >
                  ¡Aún no tienes imagenes cargadas, empecemos a cargar algunas!
                </Text>
              )}

              <Divider mt={4} mb={4} />

              <Flex
                padding={"0.5rem 0"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
              >
                <Text fontWeight={500}>Imagenes de certificaciones</Text>
                <Button
                  rightIcon={
                    <EditIcon boxSize={{ base: "15px", md: "25px" }} />
                  }
                  onClick={onOpenUploadCertification}
                  size={"md"}
                >
                  {certificationImages.length ? "Editar" : "Añadir"}
                </Button>
                <UploadImages
                  isOpen={isOpenUploadCertification}
                  onClose={onCloseUploadCertification}
                  images={certificationImages}
                  setImages={setCertificationImages}
                  typeImages={"certification"}
                />
              </Flex>

              {certificationImages.length > 0 ? (
                <>
                  <Flex justifyContent={"space-evenly"} w={"100%"} mt={7}>
                    {certificationImages.slice(0, 3).map((m, i) => (
                      <Box
                        key={i}
                        position={"relative"}
                        w={"32%"}
                        h={"150px"}
                        bgGradient="linear(to-r, #ddd, #e8e8e8)"
                        backgroundImage={m}
                        backgroundPosition={"center"}
                        backgroundSize={"cover"}
                        borderRadius={7}
                      ></Box>
                    ))}
                  </Flex>
                  <Text
                    color="gray"
                    fontSize={{ base: "sm", md: "lg" }}
                    textAlign={{ base: "center", md: "start" }}
                    mt={2}
                  >
                    Mostrando {certificationImages.slice(0, 3).length} de{" "}
                    {certificationImages.length}{" "}
                    {certificationImages.length === 1
                      ? "Elemento"
                      : "Elementos"}
                  </Text>
                </>
              ) : (
                <Text
                  textAlign={"center"}
                  color={"gray.500"}
                  fontSize={"small"}
                >
                  ¡Aún no tienes imagenes cargadas, empecemos a cargar algunas!
                </Text>
              )}

              {!session.isPremium && (
                <Alert
                  status={"info"}
                  textAlign={"center"}
                  color={"gray.500"}
                  fontSize={"small"}
                  borderRadius={5}
                  mt={4}
                >
                  <AlertIcon />
                  ¡Recorda que podés subir un máximo de 20 imagenes! Actualiza
                  tu cuenta a Premium y disfruta de imagenes ilimitadas.
                </Alert>
              )}
              <Divider mt={4} mb={4} />
              <Box mt={8}>
                <Flex
                  justifyContent={"space-between"}
                  h={"2rem"}
                  alignItems={"center"}
                  cursor={"pointer"}
                  mb={2}
                >
                  <Text fontWeight={500}>Servicios Ofrecidos</Text>
                  <Button
                    rightIcon={
                      <EditIcon boxSize={{ base: "15px", md: "25px" }} />
                    }
                    size={"md"}
                    onClick={onOpenUploadCategories}
                  >
                    {Object.keys(userCategories).length > 0
                      ? "Editar"
                      : "Añadir"}
                  </Button>
                </Flex>
                <UploadCategories
                  isOpen={isOpenUploadCategories}
                  onClose={onCloseUploadCategories}
                  session={session}
                  {...{ categories, setUserCategories }}
                />

                {userCategoriesAsArray.length > 0 ? (
                  <Accordion allowToggle mt={3} mb={4}>
                    {userCategoriesAsArray.map((m, i: number) => (
                      <AccordionItem key={i}>
                        <h2>
                          <AccordionButton>
                            <Flex key={i} alignItems={"center"}>
                              <ChevronDownIcon color={"green"} mr={2} />
                              <Text mb={1} fontSize={{ base: "sm", md: "lg" }}>
                                {m.category}
                              </Text>
                            </Flex>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {m.subcategories.map((m, i: number) => (
                            <Flex key={i} alignItems={"center"} ml={6}>
                              <MinusIcon color={"green"} mr={2} />
                              <Text fontSize={{ base: "sm", lg: "md" }}>
                                {m}
                              </Text>
                            </Flex>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <Text
                    textAlign={"center"}
                    color={"gray.500"}
                    fontSize={"small"}
                    mt={4}
                  >
                    ¡Aún no tienes categorias cargadas, empecemos a cargar
                    algunas!
                  </Text>
                )}
              </Box>
              {!session.isPremium && (
                <Alert
                  status={"info"}
                  textAlign={"center"}
                  color={"gray.500"}
                  fontSize={"small"}
                  borderRadius={5}
                  mt={4}
                >
                  <AlertIcon />
                  Recorda que solo podes seleccionar hasta TRES categorias,
                  ¡Pasate a la versión Premium y elegí la cantidad de categorias
                  que quieras!
                </Alert>
              )}
              <Divider mt={4} mb={4} />

              <Box mt={8} mb={5}>
                <Flex
                  justifyContent={"space-between"}
                  h={"2rem"}
                  alignItems={"center"}
                  cursor={"pointer"}
                >
                  <Flex alignItems={"center"}>
                    <Text fontWeight={500}>Rango de Cobertura</Text>
                    <Text
                      ml={{ base: 0, md: 3 }}
                      color={"medium_green"}
                      fontSize={{ base: "sm", md: "lg" }}
                    >
                      {serviceRange.rangeCoverage} km
                    </Text>
                  </Flex>
                  <Button
                    rightIcon={
                      <EditIcon boxSize={{ base: "15px", md: "25px" }} />
                    }
                    onClick={onOpenUploadRange}
                  >
                    Editar
                  </Button>
                  <UploadRange
                    isOpen={isOpenUploadRange}
                    onClose={onCloseUploadRange}
                    {...{ session, serviceRange, setServiceRange }}
                  />
                </Flex>
                {serviceRange.lat !== 0 &&
                  serviceRange.lng !== 0 &&
                  serviceRange.rangeCoverage > 0 && (
                    <Box w={"100%"} h={"20rem"} mt={4} mb={4}>
                      <Map
                        location={{
                          lat: serviceRange.lat,
                          lng: serviceRange.lng,
                        }}
                        coverage={serviceRange.rangeCoverage}
                      />
                    </Box>
                  )}
              </Box>

              <Flex justifyContent={"flex-end"}>
                <SubmitButton
                  isLoading={loading}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    !Object.values(values)[0].length
                      ? true
                      : false
                  }
                >
                  Convertirme en Profesional
                </SubmitButton>
              </Flex>
            </Box>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default ProfessionalForm;
