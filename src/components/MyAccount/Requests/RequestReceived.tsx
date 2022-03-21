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
  Link,
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
import ModalImage from "react-modal-image";
import axios from "axios";
import { useState } from "react";

interface IProps {
  requests?: any;
}

const RequestReceived: React.FC<IProps> = ({ requests }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<any>(null);

  const { received } = requests;

  function setIndexModal(event: any) {
    const { id } = event.target;
    setModal(received[id]);
    onOpen();
  }
  async function deleteRequest(id: string) {
    // const deleteRequest = await axios.delete("/api/serviceRequest/new", {
    //   data: { id: id },
    // });
    onClose();
    console.log(deleteRequest);
  }

  function setIndexDelete(event: any, i: number) {
    const idRequest = received[i]._id;
    deleteRequest(idRequest);
  }

  function setIndexModalOnClose() {
    setModal(null);
    onClose();
  }

  console.log(requests);

  return (
    <>
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={6}
        textAlign={"center"}
        fontWeight={600}
      >
        <GridItem w="100%" h="10">
          Name
        </GridItem>
        <GridItem w="100%" h="10">
          Categoria
        </GridItem>
        <GridItem w="100%" h="10" colSpan={2}>
          Descripcion
        </GridItem>
        <GridItem w="100%" h="10">
          FECHA
        </GridItem>
        <GridItem w="100%" h="10"></GridItem>
      </Grid>
      <Divider />
      {received?.map((request: any, index: number) => {
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
                <Text>{request.category?.name}</Text>
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
                {request.description}
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
                    <Popover key={`${index}`}>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          size="xs"
                          bg={"warning_red"}
                          rightIcon={<DeleteIcon />}
                        >
                          Eliminar
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader
                            fontWeight={"800"}
                            color={"warning_red"}
                            textAlign={"center"}
                          >
                            AVISO IMPORTANTE
                          </PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            Si aceptas las confirmacion, la solicitud se
                            eliminara de la base de datos y no podras
                            recuperarla.
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              _hover={{ bg: "warning_red" }}
                              onClick={(e: any) => setIndexDelete(e, index)}
                            >
                              CONFIRMAR
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Portal>
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
                      {modal.professionalId?.name || "SUBCATEGORIA"}
                    </Text>
                  </Box>
                </Flex>
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
              <Divider />
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                textAlign={"center"}
              >
                <Heading m={"0 auto"} fontSize={"1rem"} margin={"10px 0"}>
                  Imagenes
                </Heading>
                <Flex>
                  {modal.images?.map((img: string) => {
                    return (
                      <Flex
                        flexWrap={"wrap"}
                        overflowY={"auto"}
                        css={{
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#2eb67d",
                            borderRadius: "24px",
                          },
                        }}
                        maxH={"200px"}
                      >
                        <Flex w={"100px"} m={"5px"}>
                          <ModalImage
                            small={img}
                            large={img}
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
              <Link href={`/professional/${modal.professionalId?._id}`}>
                <Button variant="ghost">Ir al perfil</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RequestReceived;
