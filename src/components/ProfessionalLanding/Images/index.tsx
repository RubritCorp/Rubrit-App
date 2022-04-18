//chakra
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
//from modules
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

interface ImageModal {
  url: string;
  title: string;
}

const ImageModal: React.FC<ImageModal> = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent={"space-evenly"} alignItems={"center"}>
        <Image
          src={url}
          alt={`img-solicitud ${url}`}
          boxSize={"200px"}
          bgGradient="linear(to-r, #ddd, #e8e8e8)"
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={7}
          onClick={onOpen}
          objectFit="cover"
          _hover={{ cursor: "zoom-in" }}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader p={0}>
            <ModalCloseButton
              mt={2}
              mr={2}
              rounded={"full"}
              bg={"warning_red"}
              _hover={{
                background: "warning_red",
              }}
            />
          </ModalHeader>
          <ModalBody p={2}>
            <Flex justifyContent={"center"}>
              <Image src={url} alt={`img-solicitud ${url}`} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Images = ({ images }: Props) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const [imagesAmount, setImagesAmount] = useState<{
    amount: number;
    size: string;
  }>({
    amount: 2,
    size: "50%",
  });

  function imagesOnBoard(): void {
    if (window.innerWidth < 720)
      setImagesAmount({
        amount: 2,
        size: "50%",
      });
    else if (window.innerWidth < 900)
      setImagesAmount({
        amount: 3,
        size: "33%",
      });
    else if (window.innerWidth < 1120)
      setImagesAmount({
        amount: 4,
        size: "25%",
      });
    else
      setImagesAmount({
        amount: 5,
        size: "20%",
      });
  }

  useEffect(() => {
    if (window) {
      imagesOnBoard();
      window.addEventListener("resize", imagesOnBoard);
      return () => window.removeEventListener("resize", imagesOnBoard);
    }
  }, []);

  return (
    <Flex flexDirection={"column"}>
      <Flex
        maxH={seeMore ? "740px" : "240px"}
        overflow={seeMore ? "auto" : "hidden"}
        flexWrap={"wrap"}
        transition={".7s"}
        css={{
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            width: "15px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#38a169",
            borderRadius: "24px",
          },
        }}
      >
        {images?.map((m: any, i: number) => (
          <Box
            key={i}
            w={imagesAmount?.size}
            h={"250px"}
            d={"flex"}
            justifyContent={"center"}
          >
            <ImageModal url={m} title={m}>
              <Box key={i} backgroundImage={m}></Box>
            </ImageModal>
          </Box>
        ))}
      </Flex>
      {images?.length > imagesAmount?.amount && (
        <Button
          onClick={() => setSeeMore(!seeMore)}
          mt={2}
          variant={"ghost"}
          rightIcon={!seeMore ? <ChevronDownIcon /> : <ChevronUpIcon />}
        >
          {seeMore ? "Mostrar Menos" : "Mostrar Más"}
        </Button>
      )}
    </Flex>
  );
};

export default Images;
