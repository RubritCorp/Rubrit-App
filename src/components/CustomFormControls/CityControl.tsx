import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, FieldHookConfig, useField, useFormikContext } from "formik";
import { usePlacesWidget } from "react-google-autocomplete";
import { useEffect, useState } from "react";
import envConfig from "../../../next-env-config";
import type CustomFieldProps from "./ICustomFieldProps";

export const CityControl: React.FC<
  FieldHookConfig<string> & CustomFieldProps
> = ({ label, ...props }) => {
  // useField documentation: https://formik.org/docs/api/useField
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const { setValue } = helpers;
  const [userInput, setUserInput] = useState<string>("");

  // PlacesSearchBox documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#typescript
  const { ref }: any = usePlacesWidget({
    options: {
      types: ["(cities)"],
    },
    onPlaceSelected: (place: any) => {
      if (place?.formatted_address) {
        setValue(place.formatted_address);
        setUserInput(place.formatted_address);
      }
    },
  });

  // Check if user tries to change address after onPlaceSelected
  useEffect(() => {
    if (userInput !== "") {
      if (field.value !== userInput) {
        // Reset values if user modifies location input
        setValue("");
        setUserInput("");
      }
    }
  }, [field.value, userInput, setValue]);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input
        ref={ref}
        {...field}
        autoComplete="off"
        placeholder="Escribe una Ciudad"
        onKeyDown={(e: any) => (e.keyCode == 13 ? e.preventDefault() : null)}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
