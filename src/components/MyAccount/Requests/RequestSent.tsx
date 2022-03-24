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
  ButtonGroup,
  Stack,
  IconButton,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
//import ModalImage from "react-modal-image";

import Link from "next/link";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface IProps {
  requests: any;
  load: boolean;
  setReload(value: boolean): void;
}

const Form: React.FC<any> = ({
  firstFieldRef,
  onCancel,
  userId,
  profId,
  load,
  setReload,
  onClose,
}) => {
  const [form, setForm] = useState<any>({
    score: 0,
    comment: "",
  });
  const areaRef = useRef<any>();
  const numRef = useRef<any>();
  function handleInputOnChange(event: any) {
    if (typeof event === "string") {
      setForm({ ...form, score: Number(event) });
    } else {
      setForm({ ...form, comment: event.target.value });
    }
  }

  async function handleOnSubmit() {
    const date = new Date();
    const formatedDate = date.toISOString().split("T")[0];

    setForm({
      ...form,
      userComment: userId._id,
      date: formatedDate,
      user: profId._id,
    });
    onClose();
    setReload(!load);
    areaRef.current.value = "";

   
    const submitComment = await axios.put(`/api/user/commentReceived`, {
      data: {
        data: form,
      },
    });
  }
  return (
    <Flex justifyContent={"center"}>
      <Stack spacing={5} h={"350px"}>
        <Flex justifyContent={"center"}>
          <Text fontWeight={800} m={"10px"}>
            Comentario
          </Text>
        </Flex>
        <Textarea
          placeholder="Dejar un comentario al usuario."
          onChange={handleInputOnChange}
          name={"textarea"}
          ref={areaRef}
        />
        <Flex justifyContent={"center"}>
          <Text fontWeight={800} m={"5px"}>
            Puntuacion
          </Text>
        </Flex>
        <NumberInput
          name={"numberInput"}
          min={0}
          max={5}
          size="md"
          step={0.25}
          onChange={handleInputOnChange}
          ref={numRef}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button bg={"medium_green"} onClick={handleOnSubmit}>
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Flex>
  );
};

const ModalFinalizar: React.FC<any> = ({
  id,
  request,
  close,
  load,
  setReload,
}) => {
  const initialFocusRef: any = useRef();

  async function changeState(id: any, reason: string) {
    const updateRequest = await axios.put("api/serviceRequest/new", {
      data: {
        params: id,
        state: reason === "Completada" ? "Completada" : "Finalizada",
      },
    });

    setReload(!load);
  }

  const handleChangeActive = (event: any) => {
    const { value } = event.target;
    changeState(id, value);
    close();
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button colorScheme="yellow">Finalizar</Button>
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Opciones para terminar una solicitud
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Si finalizas la publicacion no vas a poder modificarla y se dara como
          finalizada. El trabajo quedara registrado como finalizado pero no
          completado. Para poder dar por completado la solicitud debe seleccion
          la opcion de Completar.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button
              colorScheme="green"
              bg={"medium_green"}
              onClick={handleChangeActive}
              value="Completada"
            >
              Completada
            </Button>
            <Button
              ref={initialFocusRef}
              onClick={handleChangeActive}
              bg={"warning_red"}
              value="Finalizada"
            >
              Cancelar solicitud
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
const ModalActivar: React.FC<any> = ({
  id,
  request,
  close,
  load,
  setReload,
}) => {
  const initialFocusRef: any = useRef();

  async function changeState(id: any) {
    const updateRequest = await axios.put("api/serviceRequest/new", {
      data: {
        params: id,
        state: request?.state?.active ? "Desactivar" : "Activar",
      },
    });

    setReload(!load);
  }

  const handleChangeActive = () => {
    changeState(id);
    close();
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button colorScheme="yellow">
          {request?.state?.active ? "Desactivar" : "Activar"}
        </Button>
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <Text m={"0 auto"}>Aviso</Text>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Al desactivar la solicitud, el estado de la misma se cambiara a
          pendiente.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button
              colorScheme="yellow"
              ref={initialFocusRef}
              onClick={handleChangeActive}
            >
              {request?.state?.active ? "Desactivar" : "Activar"}
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const ImageModal: React.FC<any> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Image
          src={url}
          alt={`img-solicitud ${title}`}
          maxW={"120px"}
          maxH={"120px"}
          objectFit="cover"
          m={"5px"}
          onClick={onOpen}
          _hover={{ cursor: "zoom-in" }}
        ></Image>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign={"center"}>{title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"center"}>
              <Image src={url} alt={`img-solicitud ${title}`}></Image>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const RequestSent: React.FC<IProps> = ({ requests, load, setReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<any>(null);

  const { sent } = requests;

  useEffect(() => {}, [requests]);

  function setIndexModal(event: any) {
    const { id } = event.target;
    setModal(sent[id]);
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

  function setIndexDelete(event: any, i: number) {
    const idRequest = sent[i]._id;
    deleteRequest(idRequest);
    onClose();
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
        {sent?.map((request: any, index: number) => {
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
                                            setIndexDelete(e, index)
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
                          : request.state.completed && request.category === null
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
                                      userId={request.userId}
                                      profId={request.professionalId}
                                      onCancel={onClose}
                                      onClose={onClose}
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
                  <Avatar src={modal.professionalId?.profilePic} m={"10px"} />
                  <Text fontWeight="bold">
                    {modal.professionalId?.name || modal.category.name}
                    <Badge ml="1" colorScheme="green">
                      {modal.professionalId?.isAuthenticated
                        ? "Autenticado"
                        : "Normal"}
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

export default RequestSent;
