import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Image,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
//hooks
import { ChangeEvent, useState, useRef } from "react";
//interfaces
import type CustomFieldProps from "./ICustomFieldProps";

interface ImageModal {
  url: string;
  title: string;
}

const ImageModal: React.FC<ImageModal> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex maxW={"120px"} m={"5px"} maxH={"120px"}>
        <Image
          src={url}
          alt={`img-solicitud ${title}`}
          objectFit="cover"
          onClick={onOpen}
          _hover={{ cursor: "zoom-in" }}
        ></Image>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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

export const MultipleImagesControl: React.FC<
  FieldHookConfig<string> & CustomFieldProps
> = ({ label, title, ...props }) => {
  // useField documentation: https://formik.org/docs/api/useField
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSelectedFiles([]);
    let files = (event.currentTarget as HTMLInputElement).files;

    if (files) {
      const filesArray = Array.from(files).map((file: any) => {
        let path = URL.createObjectURL(file);
        return path;
      });

      setSelectedFiles((prevImages: any) => prevImages.concat(filesArray));
      Array.from(files).map((file: any) => URL.revokeObjectURL(file));
    }

    setValue(files as any);
  }

  const handleClick = (event: any) => {
    inputFileRef.current!.click();
  };

  const handleDeletePhoto = (e: any) => {
    if (inputFileRef.current) {
      const dt: DataTransfer = new DataTransfer();
      let input = inputFileRef.current.files;
      let index: number = selectedFiles.indexOf(`${e.target.value}`);

      for (let i = 0; i < input!.length; i++) {
        const file: File = input![i];
        if (index !== i) dt.items.add(file);
      }
      const { items, files } = dt;

      inputFileRef.current.files = files;
    }
    if (selectedFiles.includes(String(e.target.value))) {
      let filters: string[] = selectedFiles.filter(
        (element: any) => element !== e.target.value
      );

      setSelectedFiles(filters);
    }
  };

  function renderImages() {
    // @ts-ignore
    if (field.value?.length > 0) {
      let newFiles = Array.from(field.value).map((file: any) => {
        let path = URL.createObjectURL(file);
        return path;
      });

      return (
        <SimpleGrid
          minChildWidth="100px"
          spacing="5px"
          maxW={"750px"}
          minH={"150px"}
          m={"10px"}
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
        >
          {selectedFiles.map((image: string, index: number) => (
            <Flex key={`${index}`}>
              <Box position={"relative"} top={"5px"} left={"122px"}>
                <Button
                  size="xs"
                  onClick={handleDeletePhoto}
                  value={image}
                  key={image}
                  _hover={{ bg: "warning_red" }}
                >
                  x
                </Button>
              </Box>
              <ImageModal url={image} title={`img-request ${index}`} />
              {/* <Image
                key={index}
                src={image}
                boxSize={"120px"}
                objectFit="cover"
                alt={`image${index}`}
              /> */}
            </Flex>
          ))}
        </SimpleGrid>
      );
    }
  }

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{title}</FormLabel>
      <Button onClick={handleClick} backgroundColor={"warning_red"}>
        Subir Imagenes
      </Button>
      <input
        name="images"
        type="file"
        accept="image/png, image/jpeg"
        ref={inputFileRef}
        multiple
        onChange={(event) => handleFileUpload(event)}
        style={{ display: "none" }}
        id="upload-photo"
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
      {renderImages()}
    </FormControl>
  );
};
