//library
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  useDisclosure,
  useColorModeValue,
  Heading,
  Button,
  useTheme,
  Image,
  useToast,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { Star, Check, Checks, User } from "phosphor-react";

//interfaces
import { IUser } from "../../Provider/UsersProvider";

//from modules
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//components
import Layout from "../layout";
import Comments from "../Comments";
import Map from "../Maps/Map";
import ReportProfile from "./ReportProfile";
import Images from "./Images";

interface IUserProps {
  user: string;
}

const ProfessionalLanding: React.FC<IUserProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: Session } = useSession();
  const user: IUser = JSON.parse(props.user);

  const { workerData } = user;

  const {
    onOpen: onOpenReportProfile,
    onClose: onCloseReportProfile,
    isOpen: isOpenReportProfile,
  } = useDisclosure();

  //average rating
  const scoreTotal: number = user.rating.averageScore;

  return (
    <Layout>
      <Container maxW={"container.xl"} py={5}>
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
            />
          </Box>
          <Flex flexDirection={"column"}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
              justifyContent={"center"}
            >
              <Flex padding={"1rem"} flexDirection={"column"}>
                <Heading
                  fontSize={{ base: "1rem", md: "1.2rem", lg: "2rem" }}
                  textTransform={"capitalize"}
                >
                  {user.name}
                </Heading>
                <Flex>
                  {workerData.items?.map((cat: any, i: number) => {
                    if (i <= 2) {
                      return (
                        <Flex flexDirection={"column"} key={i}>
                          <Text color={"medium_green"}>
                            {`${cat.category.name}`}
                            {(workerData.items?.length > 1 &&
                              i === workerData.items?.length - 1) ||
                            i === 2
                              ? ""
                              : "-"}
                          </Text>
                        </Flex>
                      );
                    }
                  })}
                </Flex>
                <Text>{user.address.name}</Text>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"row"}>
                    {scoreTotal !== 0 &&
                      Array(Math.floor(scoreTotal))
                        .fill(undefined)
                        .map((el: any, index: number) => (
                          <Star
                            key={index}
                            size={20}
                            weight="fill"
                            color={theme.colors.medium_green}
                          />
                        ))}
                    {scoreTotal < 5 &&
                      Array(5 - Math.floor(scoreTotal))
                        .fill(undefined)
                        .map((el: any, index: number) => (
                          <Star
                            key={index}
                            size={20}
                            color={theme.colors.medium_green}
                          />
                        ))}
                    <Text
                      ml={"0.5rem"}
                      mr={2}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                      fontWeight="bold"
                    >
                      {scoreTotal.toFixed(scoreTotal === 0 ? 0 : 1)}
                    </Text>
                    <User size={20} color={"gray"} />
                    <Text
                      ml={1}
                      d={"flex"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      {user.rating.comments.length} en total
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Check size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{
                        base: "0.7rem",
                        md: "0.8rem",
                        lg: "1rem",
                      }}
                    >
                      {user.requests.completed > 0 ? (
                        <>
                          <b>{user.requests.completed}</b>
                          <span>&nbsp; Trabajos realizados</span>
                        </>
                      ) : (
                        "Ningun trabajo Realizado"
                      )}
                    </Text>
                  </Flex>
                  {scoreTotal > 0 && (
                    <Flex flexDirection={"row"}>
                      <Checks size={20} weight="fill" />
                      <Text
                        ml={"0.5rem"}
                        fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                      >
                        Más del <b>{Math.floor(scoreTotal * 20)} %</b> de
                        satisfacción
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex
                flexDirection={{ base: "row", md: "column" }}
                alignItems={"center"}
                justifyContent={{ base: "space-between", md: "" }}
              >
                {user._id !== `${Session?._id}` ? (
                  <Button
                    width={{ base: "140px", md: "200px", lg: "250px" }}
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
                ) : (
                  <Button
                    width={{ base: "150px", md: "200px", lg: "250px" }}
                    mr={{ base: 1, md: 0 }}
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
                        pathname: "/myAccount",
                        query: { site: `offerServices` },
                      });
                      setLoading(true);
                    }}
                  >
                    Editar Perfil
                  </Button>
                )}
                <Button
                  ml={{ base: 1, md: 0 }}
                  variant={"outline"}
                  colorScheme={"red"}
                  width={{ base: "150px", md: "200px", lg: "250px" }}
                  height={{ base: "45px", md: "45px", lg: "45px" }}
                  borderRadius={7}
                  mt={{ base: 0, md: 4 }}
                  onClick={onOpenReportProfile}
                  isDisabled={user._id === `${Session?._id}`}
                >
                  Reportar Perfil
                </Button>
                <ReportProfile
                  {...{ isOpenReportProfile, onCloseReportProfile }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          mt={4}
        >
          <Box
            w={{ base: "100%", md: "62%" }}
            bg={useColorModeValue("#fafafa", "#1A202C")}
            borderRadius={7}
            p={"1rem"}
            boxShadow={"2xl"}
            d={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box mb={5}>
              <Heading
                fontSize={{
                  base: ".8rem",
                  md: "1.2rem",
                }}
                color={"light_grey_sub"}
                d={"flex"}
                alignItems={"center"}
              >
                <QuestionIcon color={"light_blue"} mr={2} />
                DESCRIPCION LABORAL
              </Heading>
              <Divider mt={4} mb={4} />
              <Text fontSize={{ base: "0.9rem", md: "1.2rem", lg: "1.4rem" }}>
                {user.workerData.workerDescription}
              </Text>
            </Box>

            <Box mt={5}>
              <Heading
                fontSize={{
                  base: ".8rem",
                  md: "1.2rem",
                }}
                color={"light_grey_sub"}
                d={"flex"}
                alignItems={"center"}
              >
                <QuestionIcon color={"light_blue"} mr={2} />
                DESCRIPCION PERSONAL
              </Heading>
              <Divider mt={4} mb={4} />
              <Text fontSize={{ base: "0.9rem", md: "1.2rem", lg: "1.4rem" }}>
                {user.description}
              </Text>
            </Box>
          </Box>
          <Box
            w={{ base: "100%", md: "35%" }}
            maxH={"700px"}
            mt={{ base: 4, md: 0 }}
            bg={useColorModeValue("#fafafa", "#1A202C")}
            borderRadius={7}
            p={"1rem"}
            boxShadow={"2xl"}
            overflow={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                width: "3px",
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
            <Heading
              fontSize={{
                base: ".8rem",
                md: "1.2rem",
              }}
              color={"light_grey_sub"}
              d={"flex"}
              alignItems={"center"}
            >
              <QuestionIcon color={"light_blue"} mr={2} />
              SERVICIOS
            </Heading>
            <Divider mt={4} mb={4} />
            {workerData.items?.map((cat: any, index: number) => {
              return (
                <Flex flexDirection={"column"} key={cat.category.name}>
                  <Heading
                    fontSize={{
                      base: ".9rem",
                      md: "1.2rem",
                    }}
                    color={"light_grey_sub"}
                    key={cat.category.name}
                  >
                    {cat.category.name}
                  </Heading>
                  <Box>
                    {cat.subcategories?.map((sub: any, index: number) => (
                      <Text
                        key={index}
                        fontSize={{
                          base: "0.9rem",
                          md: "1rem",
                          lg: "1.2rem",
                        }}
                      >
                        {sub.name}
                      </Text>
                    ))}
                  </Box>
                  <Divider mt={2} mb={2} />
                </Flex>
              );
            })}
          </Box>
        </Flex>

        <Flex
          mt={4}
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderRadius={7}
          p={"1rem"}
          boxShadow={"2xl"}
          flexDirection={"column"}
          position={"relative"}
        >
          {user.workerData.images.length ? (
            <>
              <Box w={"100%"}>
                <Heading
                  color={"light_grey_sub"}
                  d={"flex"}
                  alignItems={"center"}
                  fontSize={{
                    base: ".8rem",
                    md: "1.2rem",
                  }}
                >
                  <QuestionIcon color={"light_blue"} mr={2} />
                  TRABAJOS REALIZADOS
                </Heading>
                <Divider mt={4} mb={4} />
              </Box>

              <Images images={workerData.images} />
            </>
          ) : (
            <>
              <Box w={"100%"}>
                <Heading
                  color={"light_grey_sub"}
                  d={"flex"}
                  alignItems={"center"}
                  fontSize={{
                    base: ".8rem",
                    md: "1.2rem",
                  }}
                  textAlign={{ base: "start", md: "center" }}
                >
                  <QuestionIcon color={"light_blue"} mr={2} />
                  {user.name} aún no ha cargado trabajos realizados.
                </Heading>
              </Box>
            </>
          )}
        </Flex>

        <Flex
          mt={4}
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderRadius={7}
          p={"1rem"}
          boxShadow={"2xl"}
          flexDirection={"column"}
          position={"relative"}
        >
          {workerData.certification.length ? (
            <>
              <Box w={"100%"}>
                <Heading
                  color={"light_grey_sub"}
                  d={"flex"}
                  alignItems={"center"}
                  fontSize={{
                    base: ".8rem",
                    md: "1.2rem",
                  }}
                >
                  <QuestionIcon color={"light_blue"} mr={2} />
                  DOCUMENTACION
                </Heading>
                <Divider mt={4} mb={4} />
              </Box>
              <Images images={workerData.certification} />
            </>
          ) : (
            <Box w={"100%"}>
              <Heading
                color={"light_grey_sub"}
                d={"flex"}
                alignItems={"center"}
                fontSize={{
                  base: ".8rem",
                  md: "1.2rem",
                }}
                textAlign={{ base: "start", md: "center" }}
              >
                <QuestionIcon color={"light_blue"} mr={2} />
                {user.name} aún no ha cargado documentación.
              </Heading>
            </Box>
          )}
        </Flex>

        <Flex
          flexDirection={
            user.rating.comments.length
              ? { base: "column", lg: "row" }
              : "column"
          }
          justifyContent={"space-between"}
          position={"relative"}
        >
          <Box
            mt={4}
            bg={useColorModeValue("#fafafa", "#1A202C")}
            borderRadius={7}
            p={"1rem"}
            boxShadow={"2xl"}
            flexDirection={"column"}
            w={
              user.rating.comments.length ? { base: "100%", lg: "49%" } : "100%"
            }
          >
            <Box w={"100%"}>
              <Heading
                color={"light_grey_sub"}
                d={"flex"}
                alignItems={"center"}
                fontSize={{
                  base: ".8rem",
                  md: "1.2rem",
                }}
              >
                <QuestionIcon color={"light_blue"} mr={2} />
                ÁREA DE SERVICIO
              </Heading>
              <Divider mt={4} mb={4} />
            </Box>
            <Box height={"505px"} width={"100%"} p={2}>
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

          <Box
            mt={4}
            bg={useColorModeValue("#fafafa", "#1A202C")}
            borderRadius={7}
            p={"1rem"}
            boxShadow={"2xl"}
            flexDirection={"column"}
            w={
              user.rating.comments.length ? { base: "100%", lg: "49%" } : "100%"
            }
          >
            {user.rating.comments.length ? (
              <>
                <Box
                  w={"100%"}
                  d={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Heading
                    color={"light_grey_sub"}
                    d={"flex"}
                    alignItems={"center"}
                    fontSize={{
                      base: ".8rem",
                      md: "1.2rem",
                    }}
                  >
                    <QuestionIcon color={"light_blue"} mr={2} />
                    OPINIONES
                  </Heading>
                  <Text
                    fontSize={{
                      base: ".6rem",
                      md: ".8rem",
                    }}
                  >
                    {user.rating.comments.length} opiniones en total.
                  </Text>
                </Box>
                <Divider mt={4} mb={4} />
                <Box
                  height={"505px"}
                  overflow="auto"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "3px",
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
                </Box>
              </>
            ) : (
              <Box w={"100%"}>
                <Heading
                  color={"light_grey_sub"}
                  d={"flex"}
                  alignItems={"center"}
                  fontSize={{
                    base: ".8rem",
                    md: "1.2rem",
                  }}
                >
                  <QuestionIcon color={"light_blue"} mr={2} />
                  Aún no hay comentarios
                </Heading>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default ProfessionalLanding;
