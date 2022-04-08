import {
  Box,
  Button,
  Center,
  Container,
  Text,
  Flex,
  useColorModeValue,
  Image,
  Avatar,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
//assets
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

interface CardFindProfesionalProps {
  img: string;
  _id: string;
  name: string;
  city: string;
  avatar: string;
  description: string;
  categories?: string[];
  isPremium: boolean;
}

const CardProfesional: React.FC<CardFindProfesionalProps> = ({
  _id,
  name,
  img,
  avatar,
  city,
  description,
  categories,
  isPremium,
}) => {
  const { data: Session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Container maxW={"container.xl"} centerContent py={2}>
      <Flex position={"relative"}>
        {isPremium === true && (
          <Flex
            position={"absolute"}
            top={"0"}
            right={"-15px"}
            w={"3.5rem"}
            h={"3.5rem"}
            borderRadius={"50%"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"#efb810"}
          >
            <StarIcon color={"#fafafa"} boxSize={"2rem"} />
          </Flex>
        )}
        <Center py={6}>
          <Box
            key={name}
            maxW={{ base: "250px", md: "350px" }}
            height={"500px"}
            w={"100%"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Image
              h={"120px"}
              w={"100%"}
              src={img}
              objectFit={"cover"}
              alt="bg"
            />

            <>
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={avatar}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={{ base: "sm", md: "2xl" }}
                    fontWeight={500}
                    fontFamily={"body"}
                    textAlign={"center"}
                    overflow="hidden"
                    css={{
                      display: "-webkit-box",
                      ["WebkitBoxOrient"]: "vertical",
                      ["WebkitLineClamp"]: "1",
                    }}
                  >
                    {name}
                    {isPremium === true && (
                      <CheckIcon color={"medium_green"} ml={2} mb={1} />
                    )}
                  </Heading>
                  <Text
                    color={"gray.500"}
                    fontSize={"small"}
                    textAlign={"center"}
                    overflow="hidden"
                    css={{
                      display: "-webkit-box",
                      ["WebkitBoxOrient"]: "vertical",
                      ["WebkitLineClamp"]: "1",
                    }}
                  >
                    {city}
                  </Text>
                </Stack>
                <Stack
                  direction={"row"}
                  justify={"center"}
                  spacing={6}
                  marginBottom={4}
                >
                  <Stack spacing={0} align={"center"}>
                    <Text
                      align={"center"}
                      fontSize={{ base: "xs", md: "md" }}
                      pl={8}
                      pr={8}
                      color={"green.500"}
                      w={"296px"}
                      h={"50px"}
                      lineHeight={{ base: 2, md: 1.5 }}
                      overflow="hidden"
                      css={{
                        display: "-webkit-box",
                        ["WebkitBoxOrient"]: "vertical",
                        ["WebkitLineClamp"]: "2",
                      }}
                    >
                      {description}
                    </Text>
                  </Stack>
                </Stack>
                {categories && (
                  <>
                    <Divider mt={3} />
                    <Box minH={"80px"}>
                      <Text textAlign={"center"} mt={5} color={"medium_green"}>
                        Rubros
                      </Text>
                      {categories.map((m: string, i: number) => (
                        <Box
                          key={i}
                          bg={"green.100"}
                          borderRadius={5}
                          _hover={{
                            textDecoration: "none",
                            color: "green.400",
                          }}
                        >
                          <Text textAlign={"center"} mt={1}>
                            {m}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
                {isPremium === true && (
                  <Text
                    textAlign={"center"}
                    color={"gray.500"}
                    fontSize={"small"}
                  >
                    Usuario Verificado por Rubrit App
                  </Text>
                )}
                <Link href={`/professional/${_id}`} passHref>
                  <a>
                    <Button
                      w={"100%"}
                      mt={8}
                      bg={"medium_green"}
                      color={"white"}
                      rounded={"md"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      onClick={() => setLoading(true)}
                      isLoading={loading}
                    >
                      {status === "authenticated" && `${Session._id}` === _id
                        ? "Mi Perfil Profesional"
                        : "Contactar"}
                    </Button>
                  </a>
                </Link>
              </Box>
            </>
          </Box>
        </Center>
      </Flex>
    </Container>
  );
};

export default CardProfesional;
