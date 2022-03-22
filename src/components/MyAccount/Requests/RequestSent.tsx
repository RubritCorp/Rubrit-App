import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Flex,
  Avatar,
  Badge,
  Popover,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverTrigger,
  Image,
} from "@chakra-ui/react";
//import ModalImage from "react-modal-image";

import Link from "next/link";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface IProps {
  requests: any;
}

const RequestSent: React.FC<IProps> = ({ requests }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<any>(null);
  const initRef = useRef();
  const { sent } = requests;

  useEffect(() => {}, [deleteRequest]);

  function setIndexModal(event: any) {
    const { id } = event.target;
    setModal(sent[id]);
    onOpen();
  }
  async function deleteRequest(id: string) {
    const deleteRequest = await axios.delete("/api/serviceRequest/new", {
      data: { id: id },
    });
    onClose();
  }

  function setIndexDelete(event: any, i: number) {
    const idRequest = sent[i]._id;
    deleteRequest(idRequest);
  }

  function setIndexModalOnClose() {
    setModal(null);
    onClose();
  }

  return (
    <>
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={6}
        textAlign={"center"}
        fontWeight={600}
      >
        <GridItem w="100%" h="10">
          TITULO
        </GridItem>
        <GridItem w="100%" h="10">
          <Text>TIPO</Text>
        </GridItem>
        <GridItem w="100%" h="10" colSpan={2}>
          <Text>CATEGORIA - DESCRIPCION</Text>
        </GridItem>
        <GridItem w="100%" h="10">
          FECHA - ESTADO
        </GridItem>
        <GridItem w="100%" h="10"></GridItem>
      </Grid>
      <Divider />
      {sent?.map((request: any, index: number) => {
        return (
          <Box key={index}>
            <Grid
              templateColumns="repeat(6, 1fr)"
              gap={6}
              textAlign={"center"}
              alignItems={"center"}
            >
              <GridItem
                w="100%"
                h="10"
                d={"flex"}
                textAlign={"center"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text>{request.title}</Text>
              </GridItem>
              <GridItem
                w="100%"
                h="10"
                d={"flex"}
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"center"}
              >
                {request.category !== null ? (
                  <>
                    <Text>Publica</Text>
                  </>
                ) : (
                  <Text>Privada</Text>
                )}
              </GridItem>
              <GridItem
                w="100%"
                maxH={"100px"}
                d={"flex"}
                fontSize={"0.8rem"}
                alignItems={"center"}
                textAlign={"justify"}
                overflowY="auto"
                m={"5px"}
                colSpan={2}
              >
                <Flex flexDirection={"column"}>
                  <Text fontWeight={600}>{request.category?.name}</Text>
                  <Text> {request.description}</Text>
                </Flex>
              </GridItem>
              <GridItem
                w="100%"
                h="10"
                d={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex flexDirection={"column"}>
                  <Text fontSize={"0.8rem"}>
                    {request?.createdAt.substring(0, 10)}
                  </Text>
                  <Text fontSize={"0.7rem"}>
                    {request?.createdAt.substring(11, 16)}
                  </Text>
                  <Text>
                    {" "}
                    {request.isActive ? (
                      <Text color={"medium_green"} fontSize={"0.8rem"}>
                        ACTIVA
                      </Text>
                    ) : (
                      <Text color={"warning_red"} fontSize={"0.8rem"}>
                        PENDIENTE
                      </Text>
                    )}
                  </Text>
                  {console.log(request)}
                </Flex>
              </GridItem>
              <GridItem
                w="100%"
                h="10"
                minH={"100px"}
                d={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex flexDirection={"column"}>
                  <Box m={"2px"}>
                    <Button
                      onClick={setIndexModal}
                      variant="outline"
                      size="xs"
                      id={`${index}`}
                      bg={"medium_green"}
                    >
                      Detalle
                    </Button>
                  </Box>
                  <Box m={"2px"} key={index}>
                    {/* <Button
                      onClick={setIndexModal}
                      variant="outline"
                      size="xs"
                      id={`${index}`}
                      bg={"warning_red"}
                    >
                      ELIMINAR
                    </Button> */}

                    <Popover
                      closeOnBlur={false}
                      placement="left"
                      key={`${index}`}
                    >
                      {({ isOpen, onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Button
                              rightIcon={<DeleteIcon />}
                              bg={"warning_red"}
                              variant="outline"
                              size="xs"
                            >
                              Eliminar
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent>
                              <PopoverHeader color={"warning_red"}>
                                <Box textAlign={"center"}>AVISO IMPORTANTE</Box>
                              </PopoverHeader>
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Box>
                                  Si aceptas las confirmacion, la solicitud se
                                  eliminara de la base de datos y no podras
                                  recuperarla.
                                </Box>
                                <Flex
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  m={"10px"}
                                >
                                  <Button
                                    border={"2px solid #e74e2b"}
                                    _hover={{ bg: "warning_red" }}
                                    onClick={(e: any) =>
                                      setIndexDelete(e, index)
                                    }
                                  >
                                    CONFIRMAR
                                  </Button>
                                  <Button onClick={onClose}>Cancelar</Button>
                                </Flex>
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </>
                      )}
                    </Popover>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
            <Divider />
          </Box>
        );
      })}
      {modal !== null && (
        <Modal isOpen={isOpen} onClose={setIndexModalOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Link href={`/professional/${modal.professionalId?._id}`}>
                <a>
                  <Box>
                    <Flex m={"10px"} justifyContent={"center"}>
                      <Avatar src={modal.professionalId?.profilePic} />
                      <Box ml="3">
                        <Text fontWeight="bold">
                          {modal.professionalId?.name || "CATEGORIA"}
                          <Badge ml="1" colorScheme="green">
                            {modal.professionalId?.isAuthenticated
                              ? "Autenticado"
                              : "Normal"}
                          </Badge>
                        </Text>
                        <Text fontSize="sm">
                          {modal.professionalId?.description || "SUBCATEGORIA"}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </a>
              </Link>
              <Divider m={"10px auto"} />
              <Heading m={"0 auto"} fontSize={"1rem"} textAlign={"center"}>
                {modal.title}
              </Heading>
              <Flex justifyContent={"center"}>
                <Text m={"0 10px"} fontSize={"0.8rem"}>
                  {modal.createdAt.substring(0, 10)}
                </Text>
                <Text fontSize={"0.8rem"}>
                  {modal.createdAt.substring(11, 16)}
                </Text>
              </Flex>
              <Divider m={"10px auto"} />
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                textAlign={"center"}
              >
                <Heading m={"0 auto"} fontSize={"1rem"}>
                  Ubicacion
                </Heading>

                <Text m={"0 10px"} fontSize={"0.8rem"}>
                  {modal.location.formattedAddress}
                </Text>
                <Divider m={"10px auto"} />
              </Flex>
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                textAlign={"center"}
              >
                <Heading m={"0 auto"} fontSize={"1rem"}>
                  Descripcion
                </Heading>

                <Text m={"0 10px"} fontSize={"0.8rem"}>
                  {modal.description}
                </Text>
              </Flex>
              <Divider m={"10px auto"} />
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                textAlign={"center"}
              >
                <Heading m={"0 auto"} fontSize={"1rem"} margin={"10px 0"}>
                  Imagenes
                </Heading>
                <Flex>
                  {modal.images?.map((img: string, index: number) => {
                    return (
                      <Flex
                        flexWrap={"wrap"}
                        overflowY={"auto"}
                        maxH={"200px"}
                        key={`${index}`}
                      >
                        <Flex maxW={"100px"} m={"5px"}>
                          <Image
                            src={img}
                            alt={`img-solicitud ${modal.title}`}
                          />
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={setIndexModalOnClose}>
                Close
              </Button>

              <Link href={"/"}>
                <Button variant="ghost">Chat</Button>
              </Link>
              <Link href={"/"}>
                <Button variant="ghost">Finalizar</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RequestSent;
