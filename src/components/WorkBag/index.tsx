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
  Button,
  SimpleGrid,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";

import { Cards, CurrencyDollarSimple, Envelope, Phone } from "phosphor-react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
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

const workBag = [
  {
    name: "Juan Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Cama",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Pedro Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Hall",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Roberto Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Patio",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "tomas Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Baño",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Bernardo Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Living",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Ramon Casares",
    title: "Mar del Plata - Buenos Aires",
    testimonialHeading: "Pintar Rama",
    testimonialWork:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];

const WorkBag: React.FC = () => {
  const [card, setCard] = useState([{}]);
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let [text, setText] = useState("");

  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  useEffect(() => {
    const cardworker = workBag?.map((item: any) => {
      return {
        name: item.name,
        title: item.title,
        testimonialHeading: item.testimonialHeading,
        testimonialWork: item.testimonialWork,
        src: item.src,
      };
    });
    setCard(cardworker);
  }, []);

  console.log(card);

  const handleOnCloseCard = (name: any) => {
    console.log(name);
    const newCard = card.filter((item: any) => item.name !== name);
    setCard(newCard);
  };

  return (
    <Layout>
      <Box bg={useColorModeValue("gray.100", "gray.700")}>
        <Container maxW={"container.xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={5} align={"center"}>
            <Heading>Bolsa De Trabajo</Heading>
            <Text align={"center"} fontSize={"large"}>
              Busca en nuestra bolsa de trabajo potenciales clientes y enviale
              tu presupuesto
            </Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <SimpleGrid columns={[1, null, 3]} spacing="40px">
              {card?.map((item: any, index: number) => (
                <Testimonial key={index}>
                  <TestimonialContent>
                    <Box marginTop={"-6"} marginRight={"-5"} alignSelf={"end"}>
                      <Button
                        w={"5px"}
                        size={"xs"}
                        variant="outline"
                        onClick={() => handleOnCloseCard(item.name)}
                      >
                        x
                      </Button>
                    </Box>
                    <TestimonialHeading>
                      {item.testimonialHeading}
                    </TestimonialHeading>

                    <TestimonialText>{item.testimonialWork}</TestimonialText>
                    <Stack p={3} align={"center"}>
                      <Button
                        onClick={onOpen}
                        bg={"green.500"}
                        _hover={{ bg: "green.400" }}
                      >
                        <Text color={"white"}>Enviar Presupuesto</Text>
                      </Button>
                    </Stack>
                  </TestimonialContent>
                  <TestimonialAvatar
                    src={item.src}
                    name={item.name}
                    title={item.title}
                  />
                </Testimonial>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
      <Drawer size={"md"} isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Presupuesto A Enviar</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Phone size={30} color="#6bdaae" weight="light" />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Envelope size={30} color="#6bdaae" weight="light" />
                </InputLeftElement>
                <Input type="email" placeholder="Email" />
              </InputGroup>
              <Text color="#6bdaae" mb="8px">
                {" "}
                Detalle del trabajo a realizar:{" "}
              </Text>
              <Textarea
                value={text}
                onChange={handleInputChange}
                placeholder="Realice su detalle aca ..."
                size="sm"
              />

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <CurrencyDollarSimple
                    size={30}
                    color="#6bdaae"
                    weight="light"
                  />
                </InputLeftElement>
                <Input placeholder="Enter amount" />
              </InputGroup>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" mr={3}>
              Enviar
            </Button>
            <Button colorScheme="red">Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
};

export default WorkBag;
