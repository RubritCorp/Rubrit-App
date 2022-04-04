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
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
//import ModalImage from "react-modal-image";
import { ImageModal, Form, ModalFinalizar, ModalActivar } from "./useHelper";

import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface IProps {
  requests: any;
  load: boolean;
  format: string;
  setReload(value: boolean): void;
}

const RequestDetail: React.FC<IProps> = ({
  requests,
  load,
  setReload,
  format,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {}, [requests]);

  function setIndexModal(event: any, format: string) {
    const { id } = event.target;
    setModal(requests[format][id]);
    onOpen();
  }
  async function deleteRequest(id: string) {
    try {
      await axios.delete("/api/serviceRequest/new", {
        data: { id: id },
      });
      setReload(!load);
    } catch (err) {
      console.log(err);
    }
  }

  function setIndexDelete(event: any, i: number, format: string) {
    const idRequest = requests[format][i]._id;
    deleteRequest(idRequest);
    onClose();
    toast({
      title: "Solicitud eliminada",
      description: `Tu solicitud se elimino de la base de datos`,
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  }

  function setIndexModalOnClose() {
    setModal(null);
    onClose();
  }

  const requestState = (state: any) => {
    for (let val in state) {
      if (state[val] && val === "active") {
        return <Text color={"medium_green"}>Activa</Text>;
      }
      if (state[val] && val === "pending") {
        return <Text color="yellow">Pendiente</Text>;
      }
      if (state[val] && val === "canceled") {
        return <Text color="red">Cancelada</Text>;
      }
      if (state[val] && val === "completed") {
        return <Text color={"medium_green"}>Completada</Text>;
      }
    }
  };
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
      <Box
        m={"10px"}
        overflowY={"auto"}
        maxH={"450px"}
        css={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#38a169",
            borderRadius: "24px",
          },
        }}
      >
        {format &&
          requests[format]?.map((request: any, index: number) => {
            return (
              <Box key={index} m={"5px"}>
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
                      {requestState(request.state)}
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
                          onClick={(e: any) => setIndexModal(e, format)}
                          variant="outline"
                          size="xs"
                          id={`${index}`}
                          bg={"medium_green"}
                        >
                          Detalle
                        </Button>
                      </Box>
                      <Box m={"2px"} key={index}>
                        <Popover
                          closeOnBlur={false}
                          placement="left"
                          key={`${index}`}
                        >
                          {request.state.active || request.state.pending
                            ? ({ isOpen, onClose }) => (
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
                                        <Box textAlign={"center"}>
                                          AVISO IMPORTANTE
                                        </Box>
                                      </PopoverHeader>
                                      <PopoverCloseButton />
                                      <PopoverBody>
                                        <Box>
                                          Si aceptas las confirmacion, la
                                          solicitud se eliminara de la base de
                                          datos y no podras recuperarla.
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
                                              setIndexDelete(e, index, format)
                                            }
                                          >
                                            CONFIRMAR
                                          </Button>
                                          <Button onClick={onClose}>
                                            Cerrar
                                          </Button>
                                        </Flex>
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Portal>
                                </>
                              )
                            : request.state.completed &&
                              request.category === null
                            ? ({ isOpen, onClose }) => (
                                <>
                                  <PopoverTrigger>
                                    <Button
                                      //rightIcon={<DeleteIcon />}
                                      bg={"light_blue"}
                                      variant="outline"
                                      size="xs"
                                    >
                                      Comentar
                                    </Button>
                                  </PopoverTrigger>
                                  <Portal>
                                    <PopoverContent>
                                      <Form
                                        userId={request.userId?._id}
                                        profId={request.professionalId?._id}
                                        onCancel={onClose}
                                        onClose={onClose}
                                        format={format}
                                        {...{ load, setReload }}
                                      />
                                    </PopoverContent>
                                  </Portal>
                                </>
                              )
                            : null}
                        </Popover>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
                <Divider />
              </Box>
            );
          })}
      </Box>
      {modal !== null && (
        <Modal isOpen={isOpen} onClose={setIndexModalOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody m={"10px"}>
              <Box>
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <Avatar src={modal.userId?.profilePic} m={"10px"} />
                  <Text fontWeight="bold">
                    {modal.userId?.name || modal.category.name}
                    <Badge ml="1" colorScheme="green">
                      {modal.userId?.isAuthenticated ? "Autenticado" : "Normal"}
                    </Badge>
                  </Text>
                </Flex>
                <Text fontSize="sm" textAlign={"center"}>
                  {modal.professionalId?.description || modal.subcategory.name}
                </Text>
              </Box>
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
                <Flex
                  flexWrap={"wrap"}
                  overflowY={"auto"}
                  maxH={"150px"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#38a169",
                      borderRadius: "24px",
                    },
                  }}
                >
                  {modal.images?.map((img: string, index: number) => {
                    return (
                      <Box key={`${index}`}>
                        <ImageModal url={img} title={modal.title} />
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </ModalBody>

            <Flex justifyContent={"space-evenly"} m={"20px"}>
              {modal.state.completed || modal.state.canceled ? (
                <Text color={"medium_green"}>Solicitud finalizada</Text>
              ) : (
                <>
                  <Box>
                    <ModalActivar
                      id={modal._id}
                      request={modal}
                      close={onClose}
                      {...{ load, setReload }}
                    />
                  </Box>
                  <Box>
                    <ModalFinalizar
                      id={modal._id}
                      request={modal}
                      close={onClose}
                      {...{ load, setReload }}
                    />
                  </Box>
                </>
              )}
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RequestDetail;
