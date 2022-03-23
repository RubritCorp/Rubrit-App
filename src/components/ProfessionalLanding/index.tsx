//library
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Heading,
  Button,
  useTheme,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Star, Check, Checks, CheckCircle } from "phosphor-react";

//from modules
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//components
import Layout from "../layout";
import Comments from "../Comments";
import Loading from "../Loading";
import Map from "../Maps/Map";
import ReportProfile from "./ReportProfile";


const ImageModal: React.FC<any> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Flex justifyContent={"space-evenly"}>
          <Image
            src={url}
            alt={`img-solicitud ${url}`}
            boxSize={"200px"}
            bgGradient="linear(to-r, #ddd, #e8e8e8)"
            mt={2}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            borderRadius={7}
            onClick={onOpen}
            objectFit="cover"
            _hover={{ cursor: "zoom-in" }}
          ></Image>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent={"center"}>
                <Image src={url} alt={`img-solicitud ${url}`}></Image>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

const ProfessionalLanding: React.FC<any> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: Session } = useSession();
  const user = JSON.parse(props.user);
  const { workerData } = user;
  const {
    onOpen: onOpenReportProfile,
    onClose: onCloseReportProfile,
    isOpen: isOpenReportProfile,
  } = useDisclosure();
  
  //average rating

  const scoreTotal = Math.ceil(
    user.rating?.reduce((total: any, el: any) => (total += el.score), 0) /
      user.rating.length
  );

  //pagination states
  const [numberPage, setNumberPage] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user) return <Loading />;
  return (
    <Layout>
      <Container maxW={"container.xl"} py={10}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
        >
          <Box margin={"1rem"}>
            <Image
              src={user.profilePic}
              borderRadius="full"
              boxSize={{ base: "150px", md: "200px", lg: "250px" }}
              margin={{ base: "0rem", md: "1rem", lg: "1rem" }}
              alt={user.name}
              objectFit={"cover"}
            ></Image>
          </Box>
          <Flex flexDirection={"column"}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
              justifyContent={"center"}
            >
              <Flex padding={"1rem"} flexDirection={"column"}>
                <Heading fontSize={{ base: "1rem", md: "1.2rem", lg: "2rem" }}>
                  {user.name}
                </Heading>
                <Flex>
                  {workerData.items?.map((cat: any, i: number) => {
                    return (
                      <Flex flexDirection={"column"} key={i}>
                        <Text color={"medium_green"}>
                          {`${cat.category.name}`}&nbsp;
                        </Text>
                      </Flex>
                    );
                  })}
                </Flex>
                <Text>{user.address.name}</Text>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"row"}>
                    {scoreTotal &&
                      Array(scoreTotal)
                        .fill(null)
                        .map((el: any, index: number) => (
                          <Star
                            key={index}
                            size={20}
                            weight="fill"
                            color={theme.colors.medium_green}
                          />
                        ))}
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    ></Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Check size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      900 Trabajos realizados
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Checks size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      97% formalidad
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Button
                  as={"button"}
                  width={{ base: "150px", md: "200px", lg: "250px" }}
                  height={{ base: "45px", md: "45px", lg: "45px" }}
                  borderRadius={"10px"}
                  bg={"medium_green"}
                  color={"white"}
                  fontSize={{ base: "1rem", md: "1.2rem", lg: "1.4rem" }}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  isLoading={loading}
                  onClick={() => {
                    if (!Session?.isAuthenticated) {
                      if (!toast.isActive("no-authenticated")) {
                        toast({
                          title: "¡Aún no has verificado tu identidad!",
                          description:
                            "Hemos detectado que aún no has verificado tu correo electronico, porfavor revisa tu casilla de correo, si no has recibido el codigo puedes reenviar el mail.",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                          position: "bottom-left",
                          id: "no-authenticated",
                        });
                      }
                      return;
                    }
                    router.push({
                      pathname: "/request/new",
                      query: { id: `${user._id}` },
                    });
                    setLoading(true);
                  }}
                >
                  Pedir Cotizacion
                </Button>
                 <Button
                  variant={"outline"}
                  colorScheme={"red"}
                  width={{ base: "150px", md: "200px", lg: "250px" }}
                  height={{ base: "45px", md: "45px", lg: "45px" }}
                  borderRadius={7}
                  mt={4}
                  onClick={onOpenReportProfile}
                >
                  Reportar Perfil
                </Button>
                <ReportProfile
                  {...{ isOpenReportProfile, onCloseReportProfile }}
                />
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  padding={"0.5rem"}
                >
                  <CheckCircle
                    size={30}
                    weight="fill"
                    color={theme.colors.medium_green}
                  />
                  <Text fontSize={"0.6rem"}>
                    TOP (dentro de los 20 mejores de la zona)
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDirection={"column"}>
          <Heading
            fontSize={{
              base: "1rem",
              md: "1.2rem",
              lg: "1.5rem",
            }}
            color={"light_grey_sub"}
          >
            DESCRIPCION
          </Heading>
          <Text fontSize={{ base: "0.9rem", md: "1.2rem", lg: "1.4rem" }}>
            {user.description}
          </Text>

          <Divider margin={"1em 0"}></Divider>
          <Flex
            w={"100%"}
            flexWrap={{
              base: "wrap",
              md: "wrap",
              lg: "nowrap",
            }}
            justifyContent={"space-between"}
          >
            <Stack>
              <Flex flexDirection={"column"} justifyContent={"space-between"}>
                <Box>
                  <Heading
                    fontSize={{
                      base: "1rem",
                      md: "1.2rem",
                      lg: "1.5rem",
                    }}
                    color={"light_grey_sub"}
                  >
                    TRABAJOS REALIZADOS
                  </Heading>
                  <Flex
                    flexWrap={"wrap"}
                    justifyContent={"space-evenly"}
                    gap={5}
                    w={{ base: "md", lg: "xl" }}
                  >
                    {workerData.images
                      ?.slice(numberPage, numberPage + 4)
                      .map((m: any, i: number) => (
                        <ImageModal url={m} title={m}>
                          <Box key={i} backgroundImage={m}></Box>
                        </ImageModal>
                      ))}
                  </Flex>
                  <Flex
                    justifyContent={{ base: "center", md: "space-evenly" }}
                    flexDirection={{ base: "column", md: "row" }}
                    mt={3}
                  >
                    <Text
                      color="gray"
                      fontSize={{ base: "sm", md: "lg" }}
                      textAlign={{ base: "start", md: "start" }}
                    >
                      Mostrando{" "}
                      {
                        workerData.images.slice(numberPage, numberPage + 4)
                          .length
                      }{" "}
                      de {workerData.images.length}{" "}
                      {workerData.images.length === 1
                        ? "Elemento"
                        : "Elementos"}
                    </Text>
                    <Flex w={{ base: "100%", md: "50%" }}>
                      {numberPage !== 0 ? (
                        <Text
                          cursor={"pointer"}
                          onClick={() => {
                            numberPage === 0
                              ? ""
                              : setNumberPage(numberPage - 4);
                          }}
                          width={"50%"}
                          textAlign={"center"}
                        >
                          <ChevronLeftIcon w={6} h={6} />
                          Anterior
                        </Text>
                      ) : (
                        <Text width={"50%"}></Text>
                      )}
                      {numberPage / 4 + 1 !==
                        Math.ceil(workerData.images.length / 4) &&
                      workerData.images.length !== 0 ? (
                        <Text
                          cursor={"pointer"}
                          onClick={() => {
                            numberPage / 4 ===
                            Math.ceil(workerData.images.length / 4) - 1
                              ? ""
                              : setNumberPage(numberPage + 4);
                          }}
                          width={"50%"}
                          textAlign={"right"}
                        >
                          Siguiente
                          <ChevronRightIcon w={6} h={6} />
                        </Text>
                      ) : (
                        <Text width={"50%"}></Text>
                      )}
                    </Flex>
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Box>
                <Heading
                  fontSize={{
                    base: "1rem",
                    md: "1.2rem",
                    lg: "1.5rem",
                  }}
                  color={"light_grey_sub"}
                >
                  DOCUMENTACION
                </Heading>
                <Flex
                  flexWrap={"wrap"}
                  justifyContent={"space-evenly"}
                  w={{ base: "md", lg: "2xl" }}
                >
                  {workerData.certification.map((m: any, i: number) => {
                    if (i < 2) {
                      return (
                        <Box
                          key={i}
                          position={"relative"}
                          w={"48%"}
                          h={{ base: "150px", lg: "180px" }}
                          bgGradient="linear(to-r, #ddd, #e8e8e8)"
                          mt={7}
                          borderRadius={7}
                          backgroundImage={m}
                          backgroundPosition={"center"}
                          backgroundSize={"cover"}
                        ></Box>
                      );
                    }
                  })}
                </Flex>
                <Divider margin={"1em 0"}></Divider>
              </Flex>
            </Stack>
            <Flex justifyContent="center">
              <Box>
                <Heading
                  fontSize={{
                    base: "1rem",
                    md: "1.2rem",
                    lg: "1.5rem",
                  }}
                  color={"light_grey_sub"}
                >
                  UBICACION
                </Heading>
                <Box
                  height={{ base: "sm", md: "md", lg: "lg" }}
                  width={{ base: "md", md: "lg", lg: "xl" }}
                  p={2}
                >
                  {user.address.lat && user.address.lng ? (
                    <Map
                      location={{
                        lat: user.address.lat,
                        lng: user.address.lng,
                      }}
                      coverage={user.address.searchRange}
                    />
                  ) : (
                    <Map />
                  )}
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={"space-evenly"}
            marginTop={"10"}
            marginBottom={"10"}
          >
            <Flex
              maxH={{ base: "100%", lg: "450px" }}
              overflow={{ base: "hidden", lg: "auto" }}
              css={{
                "&::-webkit-scrollbar": {
                  width: "7px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "15px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#38a169",
                  borderRadius: "24px",
                },
              }}
            >
              <Comments {...{ user }} />
            </Flex>
            <Box borderRadius={"10px"} margin={"2em"}>
              <Flex justifyContent="center">
                <Flex
                  flexDirection={"column"}
                  padding={{ base: "1em", lg: "2em" }}
                  boxShadow={"lg"}
                  overflowY={"auto"}
                >
                  {workerData.items?.map((cat: any, index: number) => {
                    return (
                      <Flex flexDirection={"column"} key={cat.category.name}>
                        <Heading
                          fontSize={{
                            base: "1rem",
                            md: "1.2rem",
                            lg: "1.5rem",
                          }}
                          color={"light_grey_sub"}
                          key={cat.category.name}
                        >
                          {cat.category.name}
                        </Heading>
                        <Box>
                          {cat.subcategories?.map((sub: any, index: number) => (
                            <Text key={index}>{sub.name}</Text>
                          ))}
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default ProfessionalLanding;
