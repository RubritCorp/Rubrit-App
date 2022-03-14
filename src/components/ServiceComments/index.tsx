//componentes
import Layout from "../layout";

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialAvatar = ({
  src,
  name,
  city,
  province,
  date,
}: {
  src: string;
  name: string;
  city: string;
  province: string;
  date: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {city}-{province}
        </Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {date}
        </Text>
      </Stack>
    </Flex>
  );
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      maxW={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const serviceComments = [
  {
    name: "Daniela P.",
    city: "La Falda",
    province: "Cordoba",
    date: "17/02/2022",
    category: "Plomero",
    testimonialHeading: "Reforma de baño",
    testimonialWork:
      "Necesito presupuesto de plomería para remodelación completa de baño",
    src: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    name: "Juan H.",
    city: "Lanus",
    province: "Buenos Aires",
    date: "22/02/2022",
    category: "Plomero",
    testimonialHeading: "Arreglo desagues",
    testimonialWork:
      "Necesito presupuestar urgente cambio de desagues en departamento",
    src: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Juliana A.",
    city: "Vicente LOpez",
    province: "Buenos Aires",
    date: "24/02/2022",
    category: "Plomero",
    testimonialHeading: "Instalación vanitory",
    testimonialWork:
      "Quiero reemplazar el lavatorio existente por un vanitory. Necesito presupuesto urgente",
    src: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Daniela P.",
    city: "La Falda",
    province: "Cordoba",
    date: "17/02/2022",
    category: "Plomero",
    testimonialHeading: "Reforma de baño",
    testimonialWork:
      "Necesito presupuesto de plomería para remodelación completa de baño",
    src: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    name: "Juan H.",
    city: "Lanus",
    province: "Buenos Aires",
    date: "22/02/2022",
    category: "Plomero",
    testimonialHeading: "Arreglo desagues",
    testimonialWork:
      "Necesito presupuestar urgente cambio de desagues en departamento",
    src: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Juliana A.",
    city: "Vicente LOpez",
    province: "Buenos Aires",
    date: "24/02/2022",
    category: "Plomero",
    testimonialHeading: "Instalación vanitory",
    testimonialWork:
      "Quiero reemplazar el lavatorio existente por un vanitory. Necesito presupuesto urgente",
    src: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const ServiceComments: React.FC = () => {
  return (
    <Layout>
      <Box bg={useColorModeValue("gray.100", "gray.700")}>
        <Container maxW={"container.xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={5} align={"center"}>
            <Heading>Ultimas solicitudes de PLOMERO</Heading>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <SimpleGrid columns={[1, null, 3]} spacing="40px">
              {serviceComments.map((item, index) => (
                <Testimonial key={index}>
                  <TestimonialContent>
                    <TestimonialHeading>
                      {item.testimonialHeading}
                    </TestimonialHeading>
                    <TestimonialText>{item.testimonialWork}</TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar
                    src={item.src}
                    name={item.name}
                    city={item.city}
                    province={item.province}
                    date={item.date}
                  />
                </Testimonial>
              ))}
            </SimpleGrid>
          </Stack>
          <Container
            maxW={"container.xl"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"lg"}
            p={8}
            rounded={"xl"}
            pos={"relative"}
            marginBottom={10}
          >
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={"sm"}
            >
              ¿Cuánto tiempo lleva eso roto? Todos tenemos una lista
              interminable de tareas o problemas a resolver en nuestro hogar, no
              te preocupes. Gracias a RUBRIT podés contactar con cientos de
              albañiles para reformas, construcciones o tareas de bricolage en
              casa. Con la app de RUBRIT es fácil encontrar en Buenos Aires un
              albañil o una empresa de reformas u obras que se adapte a tus
              necesidades y presupuesto. Desde la app podés realizar solicitudes
              de trabajo y chatear con los profesionales. ¿Qué estás esperando?
              Es totalmente gratuito.
            </Text>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default ServiceComments;
