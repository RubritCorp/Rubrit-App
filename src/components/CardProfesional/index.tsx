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

interface CardFindProfesionalProps {
  img: string;
  _id: string;
  name: string;
  city: string;
  avatar: string;
  description: string;
  categories?: string[];
}

const CardProfesional: React.FC<CardFindProfesionalProps> = ({
  _id,
  name,
  img,
  avatar,
  city,
  description,
  categories,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Container maxW={"container.xl"} centerContent py={10}>
      <Flex>
        <Center py={6}>
          <Box
            key={name}
            maxW={{ base: "250px", md: "350px" }}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Image
              h={"120px"}
              w={"full"}
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
                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text
                      
                      align={"center"}
                      fontSize={{ base: "xs", md: "md" }}
                      pl={8}
                      pr={8}
                      color={"green.500"}
                      w={"296px"}
                      h={"55px"}
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
                    <Text textAlign={"center"} mt={1}>
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
                  </>
                )}
                <Link href={`/professional/${_id}`} passHref>
                  <a>
                    <Button
                      w={"full"}
                      mt={8}
                      bg="green.500"
                      color={"white"}
                      rounded={"md"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      onClick={() => setLoading(true)}
                      isLoading={loading}
                    >
                      Contactar
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
