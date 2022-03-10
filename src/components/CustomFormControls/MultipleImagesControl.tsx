import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { ChangeEvent, useState, useRef } from "react";
import type CustomFieldProps from "./ICustomFieldProps";

export const MultipleImagesControl: React.FC<
  FieldHookConfig<string> & CustomFieldProps
> = ({ label, ...props }) => {
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
        <Flex>
          {selectedFiles.map((image: string, index: number) => (
            <Flex flexDirection={"column"} key={image}>
              <Box position={"relative"} top={"20px"}>
                <Button
                  size="xs"
                  bgColor="red"
                  onClick={handleDeletePhoto}
                  value={image}
                  key={image}
                >
                  X
                </Button>
              </Box>
              <Image
                key={index}
                src={image}
                maxW={"150px"}
                alt={`image${index}`}
              />
            </Flex>
          ))}
        </Flex>
      );
    }
  }

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
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
