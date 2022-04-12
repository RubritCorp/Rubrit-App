//chakra
import {
  Box,
  Flex,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
//from modules
import { useState } from "react";

type Props = {
  images: string[];
};

interface ImageModal {
  url: string;
  title: string;
}

const ImageModal: React.FC<ImageModal> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent={"space-evenly"}>
        <Image
          src={url}
          alt={`img-solicitud ${url}`}
          boxSize={"200px"}
          bgGradient="linear(to-r, #ddd, #e8e8e8)"
          mt={2}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={7}
          onClick={onOpen}
          objectFit="cover"
          _hover={{ cursor: "zoom-in" }}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent={"center"}>
              <Image src={url} alt={`img-solicitud ${url}`}></Image>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Images = ({ images }: Props) => {
  const [page, setPage] = useState<number>(0);
  return (
    <Flex flexDirection={"column"}>
      <Flex justifyContent={"space-around"}>
        {images?.slice(0, 3).map((m: any, i: number) => (
          <Box key={i} w={"30%"} d={"flex"} justifyContent={"center"}>
            <ImageModal url={m} title={m}>
              <Box key={i} backgroundImage={m}></Box>
            </ImageModal>
          </Box>
        ))}
      </Flex>
      <Box d={"flex"} mt={4}>
        <Text
          cursor={"pointer"}
          width={"50%"}
          textAlign={"center"}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeftIcon w={6} h={6} />
          Anterior
        </Text>
        <Text cursor={"pointer"} width={"50%"} textAlign={"center"}>
          Siguiente
          <ChevronRightIcon w={6} h={6} />
        </Text>
      </Box>
    </Flex>
  );
};

export default Images;
