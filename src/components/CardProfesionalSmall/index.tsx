import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  useColorModeValue,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface CardFindProfesionalProps {
  _id: string;
  name: string;
  avatar: string;
}

const CardProfesionalSmall: React.FC<CardFindProfesionalProps> = ({
  _id,
  name,
  avatar,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Container maxW={"container.xl"} centerContent py={2}>
      <Flex position={"relative"}>
        <Center>
          <Box
            key={name}
            minW={{ base: "250px", md: "340px" }}
            w={"100%"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Flex justify={"center"}></Flex>
            <Box p={6}>
              <Flex direction={"row"} gap={4} align={"center"} marginLeft={3}>
                <Avatar
                  size={"md"}
                  src={avatar}
                  css={{
                    border: "2px solid white",
                  }}
                />
                <Heading
                  fontSize={{ base: "sm", md: "lg" }}
                  fontWeight={500}
                  fontFamily={"body"}
                  overflow="hidden"
                  css={{
                    display: "-webkit-box",
                    ["WebkitBoxOrient"]: "vertical",
                    ["WebkitLineClamp"]: "1",
                  }}
                >
                  {name}
                </Heading>
              </Flex>
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
                    Contactar
                  </Button>
                </a>
              </Link>
            </Box>
          </Box>
        </Center>
      </Flex>
    </Container>
  );
};

export default CardProfesionalSmall;
