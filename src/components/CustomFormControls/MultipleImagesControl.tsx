import { FormControl, FormLabel, FormErrorMessage, Flex, Image } from "@chakra-ui/react";
import { FieldHookConfig, useField } from 'formik';
import { ChangeEvent } from 'react';
import type CustomFieldProps from "./ICustomFieldProps";


export const MultipleImagesControl: React.FC<FieldHookConfig<string> & CustomFieldProps> = ({ label, ...props }) => {
  // useField documentation: https://formik.org/docs/api/useField
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let files = (event.currentTarget as HTMLInputElement).files
    setValue(files as any);
  }

  function renderImages() {
    // @ts-ignore
    if(field.value?.length > 0) {
      let newFiles = Array.from(field.value).map((file: any) => {
        let path = URL.createObjectURL(file);
        return path;
      });

      return (
        <Flex>
          { newFiles.map((image, index) => <Image key={index} src={image} h='100px' />)}
        </Flex>
      );
    }
  }

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>
        {label}
      </FormLabel>
      <input name='images' type='file' multiple onChange={(event) => handleFileUpload(event)} />
      {meta.touched && meta.error ? (
         <FormErrorMessage>{meta.error}</FormErrorMessage>
       ) : null}
      { renderImages() }
    </FormControl>
  );
}