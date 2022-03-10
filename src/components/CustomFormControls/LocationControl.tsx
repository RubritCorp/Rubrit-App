import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import envConfig from "../../../next-env-config";
import type CustomFieldProps from "./ICustomFieldProps";

export const LocationControl: React.FC<
  FieldHookConfig<string> & CustomFieldProps
> = ({ label, ...props }) => {
  // useField documentation: https://formik.org/docs/api/useField
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  // PlacesSearchBox documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#typescript
  const { ref }: any = usePlacesWidget({
    apiKey: envConfig?.mapsKey, // To do: fix security issue (variable is exposed to browser)
    onPlaceSelected: (place) => {
      setValue(place.formatted_address);
    },
  });

  //this allow to show pacContainer in every case
  useEffect(() => {
    let pacContainer: any = document.querySelector(".pac-container");
    if (pacContainer) pacContainer.style.zIndex = "99999999";
  },[])

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input
        ref={ref}
        {...field}
        autoComplete="off"
        placeholder="Escribe una dirección"
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
