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
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Star, Check, Checks, User } from "phosphor-react";

//interfaces
import { IUser } from "../../Provider/UsersProvider";

//from modules
import { ReactChild, useEffect, useState } from "react";
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
  const { data: Session, status } = useSession();
  const user: IUser = JSON.parse(props.user);
  const { workerData } = user;

  const {
    onOpen: onOpenReportProfile,
    onClose: onCloseReportProfile,
    isOpen: isOpenReportProfile,
  } = useDisclosure();

  //average rating
  const scoreTotal: number = user.rating.averageScore;
  const formatNumber = new Intl.NumberFormat("en-US");
  const userWhoCommented = formatNumber.format(user.rating.comments.length);

  //graph

  const [ratings, setRatings] = useState<Number[]>([]);

  useEffect(() => {
    var one = 0;
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
    user.rating.comments?.forEach((f) => {
      interface ICases {
        1: () => void;
        2: () => void;
        3: () => void;
        4: () => void;
        5: () => void;
      }

      const cases: ICases = {
        1: () => (one += 1),
        2: () => (two += 1),
        3: () => (three += 1),
        4: () => (four += 1),
        5: () => (five += 1),
      };

      if (
        f.score === 1 ||
        f.score === 2 ||
        f.score === 3 ||
        f.score === 4 ||
        f.score === 5
      ) {
        cases[f.score]();
      }
    });
    setRatings([five, four, three, two, one]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                          <Text
                            color={"medium_green"}
                            fontSize={{
                              base: "0.7rem",
                              md: "0.8rem",
                              lg: "1rem",
                            }}
                          >
                            {`${cat.category.name}`}&nbsp;&nbsp;&nbsp;
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
                      {userWhoCommented} en total
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
                    fontSize={{ base: ".8rem", md: "1.2rem", lg: "1.4rem" }}
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
                    fontSize={{ base: ".8rem", md: "1.2rem", lg: "1.4rem" }}
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
                <InfoIcon color={"light_blue"} mr={2} />
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
                <InfoIcon color={"light_blue"} mr={2} />
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
            pb={"2rem"}
            bg={useColorModeValue("#fafafa", "#1A202C")}
            borderRadius={7}
            boxShadow={"2xl"}
            position={"relative"}
          >
            <Heading
              fontSize={{
                base: ".8rem",
                md: "1.2rem",
              }}
              color={"light_grey_sub"}
              bg={useColorModeValue("#fafafa", "#1A202C")}
              h={"4rem"}
              borderRadius={7}
              position={"sticky"}
              zIndex={1}
              top={0}
              d={"flex"}
              flexDirection={"column"}
            >
              <Box p={"1rem"}>
                <InfoIcon color={"light_blue"} mr={2} />
                SERVICIOS
              </Box>
              <Divider mb={4} />
            </Heading>
            <Box
              p={"0 1rem "}
              maxH={"610px"}
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
              {workerData.items?.map((cat: any) => {
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
                  <InfoIcon color={"light_blue"} mr={2} />
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
                  <InfoIcon color={"light_blue"} mr={2} />
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
                  <InfoIcon color={"light_blue"} mr={2} />
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
                <InfoIcon color={"light_blue"} mr={2} />
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
                <InfoIcon color={"light_blue"} mr={2} />
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
                    <InfoIcon color={"light_blue"} mr={2} />
                    VALORACIONES
                  </Heading>
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
                  <Flex h={"10rem"}>
                    <Box
                      w={"40%"}
                      d={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"3rem"} fontWeight={"light"}>
                        {scoreTotal.toFixed(scoreTotal === 0 ? 0 : 1)}
                      </Text>
                      <Flex>
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
                                weight="duotone"
                                size={20}
                                color={theme.colors.medium_green}
                              />
                            ))}
                      </Flex>
                      <Flex mt={2}>
                        <User size={20} color={"gray"} />
                        <Text
                          ml={1}
                          d={"flex"}
                          fontSize={{
                            base: "0.7rem",
                            md: "0.8rem",
                            lg: "1rem",
                          }}
                        >
                          {userWhoCommented} en total
                        </Text>
                      </Flex>
                    </Box>
                    <Flex
                      w={"60%"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                    >
                      {ratings.map((m, i) => (
                        <Tooltip key={i} label={`${m} opiniones`}>
                          <Flex>
                            <Text w={"5%"} mr={2} textAlign={"center"}>
                              {i === 0
                                ? 5
                                : i === 1
                                ? 4
                                : i === 2
                                ? 3
                                : i === 3
                                ? 2
                                : 1}
                            </Text>
                            <Box
                              h={"1.5rem"}
                              w={`${
                                typeof m === "number" &&
                                (m * 100) / user.rating.comments.length
                              }%`}
                              bg={
                                i === 0
                                  ? "#57bb8a"
                                  : i === 1
                                  ? "#9ace6a"
                                  : i === 2
                                  ? "#ffcf02"
                                  : i === 3
                                  ? "#ff9f02"
                                  : "#ff6f31"
                              }
                            />
                          </Flex>
                        </Tooltip>
                      ))}
                    </Flex>
                  </Flex>

                  <Comments {...{ user, Session }} />
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
                  <InfoIcon color={"light_blue"} mr={2} />
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
