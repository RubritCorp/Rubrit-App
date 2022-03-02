import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

const whatTheySay = [
  {
    image:
      "https://homesolution.net/blog/wp-content/uploads/2019/02/gasista.jpg",
    name: "Rodolfo Perez",
    city: "Calamuchita",
    province: "Cordoba",
    opinion:
      "RUBRIT ME PERMTIO EMPEZAR A TRABAJAR MAS ORDENADAMENTE GRACIAS A SU AGENDA",
    avatar: "https://avatars0.githubusercontent.com/u/1164541?v=4",
    whoYouAre:
      "Soy gasista de la cuna hasta al cajon. Gasista se nace, no se hace.",
  },
  {
    image:
      "https://cimacnoticias.com.mx/wp-content/uploads/2016/05/carpintera01citlallilopez.jpg",
    name: "Gabriela Perez",
    city: "Rosario",
    province: "Santa Fe",
    opinion:
      "RUBRIT ME PERMITIO AUMENTAR MI CARTERA DE CLIENTES AL DOBLE DE LO QUE TENIA ANTES",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/001/158/381/non_2x/portrait-of-a-focused-female-carpenter-hard-at-work-photo.jpg",
    whoYouAre:
      "Herede la pasion por el oficio de la carpinteria de mi papa desde muy chica",
  },
  {
    image:
      "https://www.avanzaentucarrera.com/orientacion/comp/uploads/2017/03/soldador.jpg",
    name: "Roman Nuñez",
    city: "Toay",
    province: "La Pampa",
    opinion:
      "RUBRIT ME CAMBIO LA VIDA, EN MI ANTIGUO TRABAJO ME EXPLOTABAN, ESTOY FELIZ",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwpI95Iv1CZt28y1SXtMTWv5ky1IRTyG6hw&usqp=CAU",
    whoYouAre:
      "Soy soldador gracias a un amigo que me invito a tomar unos cursos de soldadura",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbtI-Q1GY_zuR8rWplvkVW5xnxJN3TeMhIlQ&usqp=CAU",
    name: "romina paez",
    city: "Capital Federal",
    province: "Buenos Aires",
    opinion:
      "A TRAVEZ DE MIS BUENAS CALIFICACIONES EN RUBRIT, ME HICE CONOCER A MUCHOS CLIENTES",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-Sj-ohJS3J6K-LeRdQ5Vp-TAZ9MDfReWxw&usqp=CAU",
    whoYouAre:
      "Tengo una gran pasion por los niños,a ellos les encanta pasar el tiempo con migo.",
  },
];

const NearProfesionals: React.FC = () => {
  return (
    <Container maxW={"container.xl"} centerContent py={10}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
        {whatTheySay.map((item, index) => (
          <Flex key={index}>
            <Center py={6}>
              <Box
                maxW={"350px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  alt=""
                  h={"120px"}
                  w={"full"}
                  src={item.image}
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={item.avatar}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {item.name}
                    </Heading>
                    <Text color={"gray.500"} fontSize={"small"}>
                      {item.city}-{item.province}
                    </Text>
                  </Stack>
                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Text
                        align={"center"}
                        fontSize={"medium"}
                        color={"green.500"}
                      >
                        Precio por hora promedio $300 / $500
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("green.500", "green.500")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Contactar
                  </Button>
                </Box>
              </Box>
            </Center>
          </Flex>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default NearProfesionals;
