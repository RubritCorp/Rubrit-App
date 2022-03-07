import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

import Link from "next/link";

const professionals = [
  {
    name: "Juan F.",
    categories: ["Plomero", "Gasista", "Electricista"],
    city: "Calamuchita",
    province: "Cordoba",
    completed: 17,
    satisfaction: 90,
    avatar:
      "https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    votes: 17,
  },
  {
    name: "Jose M.",
    categories: ["Plomero", "Gasista"],
    city: "Cordoba",
    province: "Cordoba",
    completed: 52,
    satisfaction: 100,
    avatar:
      "https://images.pexels.com/photos/3846508/pexels-photo-3846508.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    votes: 34,
  },
  {
    name: "Martin M.",
    categories: ["Plomero"],
    city: "La Falda",
    province: "Cordoba",
    completed: 22,
    satisfaction: 95,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    votes: 20,
  },
  {
    name: "Martin M.",
    categories: ["Plomero"],
    city: "La Falda",
    province: "Cordoba",
    completed: 22,
    satisfaction: 95,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    votes: 20,
  },
  {
    name: "Martin M.",
    categories: ["Plomero"],
    city: "La Falda",
    province: "Cordoba",
    completed: 22,
    satisfaction: 95,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    votes: 20,
  },
  
];

interface ItemWTS {
  name: string;
  categories: string[];
  city: string;
  province: string;
  completed: number;
  satisfaction: number;
  avatar: string;
  votes: number;
}

const ProfessionalService: React.FC = () => {
  return (
    <Container maxW={"container.xl"} centerContent py={5}>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        {professionals.map((item, index) => (
          <Professionals key={index} item={item} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

function Professionals({ item }: { item: ItemWTS }) {
  return (
    <Center py={6}>
      <Box
        maxW={"250px"}
        minH={"450px"}
        w={"full"}
        h={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"} mt={6}>
          <Avatar
            size={"xl"}
            src={item.avatar}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
        <Box p={4}>
          <Stack spacing={0} align={"center"} mb={2}>
            <Heading
              fontSize={"lg"}
              fontWeight={500}
              fontFamily={"body"}
              marginBottom={1}
            >
              {item.name}
            </Heading>
            <Text align={"center"} color={"gray.500"} fontSize={15}>
              {item.city}-{item.province}
            </Text>
          </Stack>
          <Stack direction={"column"} justify={"center"} spacing={4}>
            <Stack spacing={2} align={"center"}>
              <Text align={"center"} fontSize={"small"} color={"green.500"}>
                {item.completed} tareas completadas
              </Text>
              <Text align={"center"} fontSize={"small"} color={"green.500"}>
                {item.satisfaction}% de satisfacción ({item.votes} votos)
              </Text>

              <Text
                align={"center"}
                fontSize={"xs"}
                color={"gray.500"}
                padding={2}
              >
                -------Principales rubros-------
              </Text>
              <Text align={"center"}>
                {item.categories.map((cat, index) => (
                  <Box
                    w={"l"}
                    h={"l"}
                    bg={useColorModeValue("green.50", "dark_green")}
                    color={useColorModeValue("dark_green", "medium_grey")}
                  >
                    <Text
                      padding={1}
                      fontSize={11}
                      fontWeight={"bold"}
                      color={"green.500"}
                      border={"solid 1px"}
                      minWidth={"10rem"}
                      borderRadius={"5px"}
                      marginBottom={2}
                      key={index}
                    >
                      {cat}
                    </Text>
                  </Box>
                ))}
              </Text>
              <Text
                fontSize={"xs"}
                color={"green.500"}
                position={"relative"}
              >
                <Link href={"#"}>Ver perfil del trabajador</Link>
              </Text></Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
export default ProfessionalService;
