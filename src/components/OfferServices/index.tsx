//Style library
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Divider,
  Select,
  Box,
  Button,
  Avatar,
  Center,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

import Slider from "react-slick";
//native libraries

//componentes
import Layout from "../layout";
//icons
import {
  AddressBook,
  CalendarCheck,
  CircleWavyCheck,
  CreditCard,
  ListChecks,
  PersonSimpleRun,
  SignIn,
  Star,
  UserList,
  ArrowLeft,
  ArrowRight,
} from "phosphor-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
      "Soy gasista de la cuna hasta al cajon. Gasista se nace, no se hace,decia mi abuelo.",
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
      "RUBRIT ME CAMBIO LA VIDA, EN MI ANTIGUO TRABAJO ME EXPLOTABAN MUCHO, ESTOY MUY FELIZ",
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

const Offerservices: React.FC = () => {
  const { status } = useSession();
  const [slider, setSlider] = useState<Slider | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Layout>


      <Container centerContent py={10} maxW={"container.xl"}>
        <Heading>POSTULATE Y ENCONTRA TRABAJO</Heading>
        <Text color={"gray.500"} fontSize={"lg"}>
          En nuestra pagina vas a poder postularte y llegar a miles de personas
          que se encuentran en tu ciudad en busca de tus cualidades
        </Text>
      </Container>
      <Container maxW={"container.xl"} paddingBottom={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <ListChecks size={50} color="#6bdaae" />
            <Heading fontSize={"lg"}>SE TU PROPIO JEFE</Heading>
            <Text>
              Vas a poder ofrecerte seun el trabajo que realices. Manejar tu
              agenda a gusto. Hacerlo como y cuando quieras segun lo acordado
              con el cliente
            </Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <AddressBook size={50} color="#6bdaae" />
            <Heading fontSize={"lg"}>LISTA DE CLIENTES</Heading>
            <Text>
              Tu lista de clientes crecera de sobre manera gracias a la cantidad
              de gente a la cual vas a poder ofrecerte.
            </Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Stack direction={"row"} spacing={3}>
              <Star size={50} color="#ffea00" weight="duotone" />
              <Star size={50} color="#ffea00" weight="duotone" />
              <Star size={50} color="#ffea00" weight="duotone" />
              <Star size={50} color="#ffea00" weight="duotone" />
              <Star size={50} color="#ffea00" weight="duotone" />
            </Stack>
            <Heading fontSize={"lg"}>SISTEMA DE ESTRELLAS</Heading>
            <Text>
              Las personas que te contraten van a poder calificar tus trabajos,
              esto va a permitir que te destaques sobre el resto por hacerlo de
              la mejor manera.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      <Divider />
      <Stack py={10}>
        <Container maxW={"5xl"} centerContent>
          <Stack spacing={2}>
            <Heading>¿COMO EMPEZAR?</Heading>
          </Stack>
        </Container>
      </Stack>
      <Container maxW={"container.xl"} paddingBottom={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <SignIn size={50} color="#6bdaae" weight="duotone" />
            <Heading fontSize={"lg"}>1. Sign Up</Heading>
            <Text>Primero que nada te logueas en nuestra aplicacion.</Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <UserList size={50} color="#6bdaae" />
            <Heading fontSize={"lg"}> 2. Construi tu perfil</Heading>
            <Text>selecciona los oficios que sabes hacer.</Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Stack direction={"row"} spacing={3}>
              <CircleWavyCheck size={50} color="#6bdaae" />
            </Stack>
            <Heading fontSize={"lg"}> 3. Verifica tu identidad</Heading>
            <Text>Confirma que sos vos quien se esta subscribiendo.</Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <CreditCard size={50} color="#6bdaae" />
            <Heading fontSize={"lg"}>4. Paga por unica vez </Heading>
            <Text>
              Pagas una pequeña subscripcion de $500 que nos ayuda a brindarte
              el mejor servicio.
            </Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <CalendarCheck size={50} color="#6bdaae" />
            <Heading fontSize={"lg"}>5. Setea tu calendario</Heading>
            <Text>
              Nos indicas cuales son los dias y horarios en los cuales estas
              disponible para trabjar.
            </Text>
          </Stack>
          <Stack
            spacing={2}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Stack direction={"row"} spacing={3}>
              <PersonSimpleRun size={50} color="#6bdaae" />
            </Stack>
            <Heading fontSize={"lg"}>6. Empeza a trabajar </Heading>
            <Text>
              Una vez que hayas completados los pasos anteriores ya estas
              listo/a para empezar a recibir ofertas.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider />
      <Container maxW={"container.xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://homesolution.net/blog/wp-content/uploads/2019/01/IMG_5613.jpg"
              }
              objectFit={"cover"}
            />
          </Flex>
          <Stack spacing={4}>
            <Heading>Aumenta tus clientes a traves nuestro</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Subscribite en nuestra pagina y empeza a ver el cambio en tu lista
              de clientes
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Heading fontSize={"lg"}>¿TENES TU PERFIL DE TRABAJADOR ARMADO?</Heading>
              <Popover


                placement='bottom'
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button
                    size="lg"
                    bg="green.400"
                    borderColor="green.100"
                    color={useColorModeValue("white", "gray.700")}
                    _hover={
                      {
                        bg: "green.300",
                        borderColor: "green.600",
                      }
                    }
                  >
                    EDITAR MI PERFIL!
                  </Button>
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    ARMAR UN BUEN PERFIL
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Para poder mostrar lo que haces, es esencial tener un perfil bien armado. En el vas
                    a poder setear multiples oficios, cargar fotos , titulos , diplomas y mucho mas.
                  </PopoverBody>
                  <PopoverFooter
                    border='0'
                    d='flex'
                    justifyContent='flex-end'
                    pb={4}
                  >
                    <Button
                      size='sm'
                      bg="green.400"
                      borderColor="green.100"
                      color={useColorModeValue("white", "gray.700")}
                      _hover={
                        {
                          bg: "green.300",
                          borderColor: "green.600",
                        }
                      }
                      onClick={() => {
                        status === "authenticated" ? (
                          (window.location.href = "/myAccount?site=offerServices")
                        ) : (
                          document.getElementById('signInButton')?.click()
                        )
                      }}
                    >HAGAMOSLO!</Button>

                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Heading fontSize={"lg"}>¿QUERES OBTENER TRABAJOS LO MAS RAPIDO POSIBLE?</Heading>
              <Popover


                placement='bottom'
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button
                    size="lg"
                    bg="green.400"
                    borderColor="green.100"
                    color={useColorModeValue("white", "gray.700")}
                    _hover={
                      {
                        bg: "green.300",
                        borderColor: "green.600",
                      }
                    }
                  >
                    BOLSA DE TRABAJO!
                  </Button>
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    MULTIPLES OFERTAS DE TRABAJO!
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    En BOLSA DE TRABAJO podras elegir entre varias ofertas que se ajustan
                    a tu perfil y tu disponibilidad.
                  </PopoverBody>
                  <PopoverFooter
                    border='0'
                    d='flex'
                    justifyContent='flex-end'
                    pb={4}
                  >


                    <Button
                      size='sm'
                      bg="green.400"
                      borderColor="green.100"
                      color={useColorModeValue("white", "gray.700")}
                      _hover={
                        {
                          bg: "green.300",
                          borderColor: "green.600",
                        }}
                      onClick={() => {
                        status === "authenticated" ? (
                          (window.location.href = "/workbag")
                        ) : (
                          document.getElementById('signInButton')?.click()
                        )
                      }}
                    >VAMOS YA!!!</Button>

                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Heading fontSize={"lg"}>
                ¿TE GUSTARIA TENER MAS VISIBILIDAD QUE EL RESTO?
              </Heading>
              <Popover


                placement='bottom'
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button
                    size="lg"
                    bg="green.400"
                    borderColor="green.100"
                    color={useColorModeValue("white", "gray.700")}
                    _hover={
                      {
                        bg: "green.300",
                        borderColor: "green.600",
                      }
                    }
                  >
                    RUBRIT PREMIUM!
                  </Button>
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    Mejora tu visibilidad!
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    En RUBRIT PREMIUM podras pagar una pequeña subscripcion que te va a ayudar
                    a mejorar tu visibilidad en la pagina.
                  </PopoverBody>
                  <PopoverFooter
                    border='0'
                    d='flex'
                    justifyContent='flex-end'
                    pb={4}
                  >


                    <Button
                      size='sm'
                      bg="green.400"
                      borderColor="green.100"
                      color={useColorModeValue("white", "gray.700")}
                      _hover={
                        {
                          bg: "green.300",
                          borderColor: "green.600",
                        }}
                      onClick={() => {
                        status === "authenticated" ? (
                          (window.location.href = "/myAccount?site=becomePremium")
                        ) : (
                          document.getElementById('signInButton')?.click()
                        )
                      }}
                    >QUIERO SER PREMIUM!</Button>

                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Stack>
          </Stack>
        </SimpleGrid>


      </Container>
      <Divider />
      <Stack py={10} spacing={3}>
        <Stack align={"center"} alignSelf={"center"} spacing={3}>
          <Heading>¿QUE DICEN LOS RUBRITS?</Heading>
        </Stack>
      </Stack>

      <Container maxW={"container.xl"} paddingBottom={20}>
        <Box position={"relative"} width={"full"} overflow={"hidden"}>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <IconButton
            background={"green.500"}
            aria-label="left-arrow"
            position="absolute"
            left="20px"
            top="40%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <ArrowLeft />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            background={"green.500"}
            aria-label="right-arrow"
            position="absolute"
            right="20px"
            top="40%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <ArrowRight />
          </IconButton>
          <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
            {whatTheySay.map((category, index) => (
              <WhatTheySayCard
                key={index}
                opinion={category.opinion}
                imagen={category.image}
                name={category.name}
                city={category.city}
                province={category.province}
                whoYouAre={category.whoYouAre}
                avatar={category.avatar}
              />
            ))}
          </Slider>
        </Box>
      </Container>
    </Layout>
  );
};

const WhatTheySayCard: React.FC<WhatTheySayCardProps> = ({
  imagen,
  name,
  city,
  province,
  whoYouAre,
  avatar,
  opinion,
}) => {
  return (
    <Center py={12}>
      <Box
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"200px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src={imagen}
            alt={name}
            objectFit={"fill"}
            w={"full"}
            h={"full"}
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            fontSize={{ base: "md", xl: "sm" }}
          >{`"${opinion}"`}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={avatar} />
          <Stack direction={"column"} spacing={0}>
            <Text fontSize={"lg"} fontWeight={600}>
              {name}
            </Text>
            <Text fontSize={"xs"} color={"gray.500"}>
              {city}-{province}
            </Text>
            <Text color={"gray.500"}>{whoYouAre}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "170px",
  slidesToShow: 2,
  speed: 500,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 843,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "1px",
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
};

interface WhatTheySayCardProps {
  imagen: string;
  name: string;
  city: string;
  province: string;
  whoYouAre: string;
  avatar: string;
  opinion: string;
}

export default Offerservices;
