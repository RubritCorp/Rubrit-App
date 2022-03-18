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
} from "@chakra-ui/react";

interface IProps {
  requests: any;
}

const RequestSent: React.FC<IProps> = ({ requests }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(requests.sent);
  return (
    <>
      <Heading>Publicas</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="10" bg="blue.500">
          Name
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Categoria
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Descripcion
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Estado???
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500">
          Mas detalles Boton
        </GridItem>
      </Grid>
      {requests.sent?.map((request: any) => {
        return (
          <>
            <Divider />
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                {request.title}
              </GridItem>
              <GridItem w="100%" h="10">
                {request.category.name}
              </GridItem>
              <GridItem w="100%" h="10">
                {request.description}
              </GridItem>
              <GridItem w="100%" h="10">
                Estado???
              </GridItem>
              <GridItem w="100%" h="10">
                <>
                  <Button onClick={onOpen}>Detalles</Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{request.title}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>{request.category.name}</ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              </GridItem>
            </Grid>
          </>
        );
      })}
    </>
  );
};

export default RequestSent;
