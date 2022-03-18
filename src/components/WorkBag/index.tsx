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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
//from modules
import React, { ReactNode, useEffect, useState } from "react";
//icons
import { CurrencyDollarSimple, Envelope, Phone } from "phosphor-react";
import { useSession } from "next-auth/react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialAvatar = ({
  src,
  name,
  location,
}: {
  src: string;
  name: string;
  location: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600} mb={2}>
          {name}
        </Text>
        <Text
          fontSize={"sm"}
          color={useColorModeValue("gray.600", "gray.400")}
          textAlign={"center"}
        >
          {location}
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
      h={"300px"}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      overflow="hidden"
      css={{
        display: "-webkit-box",
        ["WebkitBoxOrient"]: "vertical",
        ["WebkitLineClamp"]: "5",
      }}
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

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
      overflow="hidden"
      css={{
        display: "-webkit-box",
        ["WebkitBoxOrient"]: "vertical",
        ["WebkitLineClamp"]: "3",
      }}
    >
      {children}
    </Text>
  );
};

const WorkBag: React.FC<{ nearOffers: any }> = ({ nearOffers }) => {
  const [card, setCard] = useState([{}]);
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: Session, status } = useSession();
  let [text, setText] = useState("");
  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      const cardworker = nearOffers?.map((item: any) => {
        return {
          name: item.userId?.name,
          location: item.location?.formattedAddress,
          title: item.title,
          testimonialWork: item.description,
          src: item.userId?.profilePic,
          _id: item._id,
        };
      });
      setCard(cardworker);
    }
  }, [nearOffers, Session, status]);

  const handleOnCloseCard = (_id: string) => {
    const newCard = card.filter((item: any) => item._id !== _id);
    setCard(newCard);
  };

  if (nearOffers.lengt < 1) return <Text>No Hay Ofertas en Tu Zona</Text>;

  return (
    <Layout>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks*/}
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
                        onClick={() => handleOnCloseCard(item._id)}
                      >
                        x
                      </Button>
                    </Box>
                    {/* TESTIMONIAL HEADING */}
                    <Heading
                      as={"h3"}
                      fontSize={"xl"}
                      textAlign={"center"}
                      overflow="hidden"
                      css={{
                        display: "-webkit-box",
                        ["WebkitBoxOrient"]: "vertical",
                        ["WebkitLineClamp"]: "2",
                      }}
                    >
                      {item.title}
                    </Heading>

                    <TestimonialText>{item.testimonialWork}</TestimonialText>
                    <Stack p={3} align={"center"}>
                      <Button
                        onClick={() =>{
                          status === "authenticated"? (onOpen())
                          :
                          (document.getElementById('signInButton')?.click())
                          }} //acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        bg={"green.500"}
                        _hover={{ bg: "green.400" }}
                        position={"absolute"}
                        bottom={8}
                      >
                        <Text color={"white"}>Enviar Presupuesto</Text>
                      </Button>
                    </Stack>
                  </TestimonialContent>
                  <TestimonialAvatar
                    src={item.src}
                    name={item.name}
                    location={item.location}
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
            
              <Text color="#6bdaae" mb="8px">
                {" "}
                Detalle del trabajo a realizar:{" "}
              </Text>
              <Textarea
                h={"450px"}
                value={text}
                onChange={handleInputChange}
                placeholder="Realice su detalle aca ..."
                size="xl"
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
