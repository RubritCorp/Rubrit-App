//library
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Center,
  Stack,
  Heading,
  Button,
  useTheme,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Star, Check, Checks, CheckCircle } from "phosphor-react";

//native libraries
import Link from "next/link";
import { useState } from "react";

//components
import Layout from "../layout";
import Comments from "../Comments";
import Loading from "../Loading";
import Map from "../Maps/Map";
import { Session } from "next-auth/core/types";

const ProfessionalLanding: React.FC<any> = (props) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const user = JSON.parse(props.user);
  const { workerData } = user;
  const scoreTotal = Math.ceil(
    user.rating?.reduce((total: any, el: any) => (total += el.score), 0) /
      user.rating.length
  );

  if (!user) return <Loading />;
  return (
    <Layout>
      <Container maxW={"container.xl"}>
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
                    {Array(scoreTotal)
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
                <Link
                  href={{
                    pathname: "/request/new",
                    query: { id: `${user._id}` },
                  }}
                  passHref
                >
                  <a>
                    <Button
                      as={"button"}
                      width={{ base: "150px", md: "200px", lg: "250px" }}
                      height={{ base: "30px", md: "35px", lg: "40px" }}
                      borderRadius={"10px"}
                      bg={"medium_green"}
                      color={"white"}
                      fontSize={{ base: "1rem", md: "1.2rem", lg: "1.4rem" }}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      isLoading={loading}
                      onClick={() => setLoading(true)}
                    >
                      Pedir Cotizacion
                    </Button>
                  </a>
                </Link>
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
            <Container maxW={"container.xl"}>
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
            >
              <Stack><Flex flexDirection={"column"}>
                <Box margin={"1em 0"}>
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
                    flexDirection={"row"}
                    flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
                  >
                    {user.workerData.images.map((n: any, i: number) => {
                      if (i < 3) {
                        return (
                          <Image
                            p={1.5}
                            key={i}
                            src={n}
                            alt="jobs-pic"
                            maxW="12em"
                            borderRadius={"0.3rem"}
                            marginTop={"1rem"}
                          />
                        );
                      }
                    })}
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
                    flexDirection={"row"} justifyContent={"left"}
                    flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
                  >
                    {user.workerData.certification.map((n: any, i: number) => {
                      if (i < 3) {
                        return (
                          <Image
                            p={1.5}
                            key={i}
                            src={n}
                            alt="worker-cert"
                            maxW="12em"
                            borderRadius={"0.3rem"}
                            marginTop={"1rem"}
                          />
                        );
                      }
                    })}
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Flex>
              </Stack><Flex flexDirection={"column"} margin={{ base: "0", md: "0", lg: "1rem" }} justifyContent="center">
              <Box>
                <Heading
                  fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                  color={"light_grey_sub"}
                  marginLeft="0.6em"
                >
                  UBICACION
                </Heading>
                <Box
                  height={{ base: "23em", md: "25em", lg: "27em" }}
                  width={{ base: "24em", md: "28em", lg: "34em" }}
                  margin={"1.3em 0 1.7em 1em"}
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
              </Box></Flex>
            </Flex>
            <Container maxW={"container.lg"}>
              <Flex flexDirection={"row"}
          justifyContent={"space-evenly"}         
          flexWrap={{ base: "wrap", md: "wrap", lg: "wrap" }} marginBottom={10}>
                <Flex
                  maxH={"540px"}
                  overflowY="auto"
                >
                  <Comments {...{ user }} />
                </Flex>
                <Box borderRadius={"10px"} margin={{ base: "2em", lg: "2em 0 0 10em"}}>
                  <Flex
                    flexDirection={"column"}
                    padding={{ base: "1em", lg: "2em"}}
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
                            {cat.subcategories?.map(
                              (sub: any, index: number) => (
                                <Text key={index}>{sub.name}</Text>
                              )
                            )}
                          </Box>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Flex>
        </Container>
      </Container>
    </Layout>
  );
};

export default ProfessionalLanding;
