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
} from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  requests: any;
}

const RequestSent: React.FC<IProps> = ({ requests }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<any>(null);

  const { sent } = requests;

  function setIndexModal(event: any) {
    const { id } = event.target;
    setModal(sent[id]);
    onOpen();
  }
  function setIndexModalOnClose() {
    setModal(null);
    onClose();
  }
  console.log("front requestssend", requests);
  return (
    <>
      <Heading>Publicas</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem w="100%" h="10" bg="blue.500">
          Name
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Categoria
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500" colSpan={2}>
          Descripcion
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Estado???
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Informacion
        </GridItem>
      </Grid>
      {sent?.map((request: any, index: number) => {
        return (
          <Box key={index} margin={"10px auto"}>
            <Divider />
            <Grid
              templateColumns="repeat(6, 1fr)"
              gap={6}
              justifyContent={"center"}
            >
              <GridItem w="100%" h="10" d={"flex"} alignItems={"center"}>
                <Text>{request.title}</Text>
              </GridItem>
              <GridItem w="100%" h="10" d={"flex"} alignItems={"center"}>
                {request.category?.name}
              </GridItem>
              <GridItem
                w="100%"
                maxH={"100px"}
                d={"flex"}
                fontSize={"0.8rem"}
                alignItems={"center"}
                overflowY="auto"
                m={"5px"}
                colSpan={2}
              >
                {request.description}
              </GridItem>
              <GridItem w="100%" h="10" d={"flex"} alignItems={"center"}>
                Estado???
              </GridItem>
              <GridItem w="100%" h="10" d={"flex"} alignItems={"center"}>
                <Flex alignItems={"center"}>
                  <Button
                    onClick={setIndexModal}
                    variant="outline"
                    size="xs"
                    id={`${index}`}
                  >
                    Detalle
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
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
                <Flex m={"10px"}>
                  <Avatar src={modal.professionalId?.profilePic} />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      {modal.professionalId?.name || "CATEGORIA"}
                      <Badge ml="1" colorScheme="green">
                        Premiun?Validado?
                      </Badge>
                    </Text>
                    <Text fontSize="sm">
                      {modal.professionalId?.name || "SUBCATEGORIA"}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Heading m={"0 auto"} fontSize={"1rem"} textAlign={"center"}>
                {modal.title}
              </Heading>

              <Flex justifyContent={"space-between"} flexDirection={"row"}>
                <Flex>
                  <Text>Fecha</Text>
                </Flex>
                <Flex>
                  <Text m={"0 10px"}>{modal.createdAt.substring(0, 10)}</Text>
                  <Text>{modal.createdAt.substring(11, 16)}</Text>
                </Flex>
              </Flex>
              <Flex justifyContent={"space-between"} flexDirection={"row"}>
                <Flex>
                  <Text>Ubicacion</Text>
                </Flex>
                <Flex>
                  <Text m={"0 10px"} fontSize={"0.8rem"}>
                    {modal.location.formattedAddress}
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Text m={"0 auto"}>Descripcion</Text>
                <Text>{modal.description}</Text>
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

export default RequestSent;
