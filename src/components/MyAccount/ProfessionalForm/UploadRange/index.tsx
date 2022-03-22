//from chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
  Box,
  Flex,
  FormLabel,
  Text,
} from "@chakra-ui/react";
//types
import { Session } from "next-auth/core/types";
//from modules
import { InputControl, SliderControl, SubmitButton } from "formik-chakra-ui";
import { Formik } from "formik";
//helper
import useHelper from "./useHelper";
//components
import { CityControl } from "components/CustomFormControls/CityControl";
import { LocationControl } from "components/CustomFormControls/LocationControl";

type Values = {
  city: string;
  addressName: string;
  lat: number;
  lng: number;
  rangeCoverage: number;
};

type Props = {
  session: Session;
  isOpen: boolean;
  serviceRange: Values;
  onClose(): void;
  setServiceRange(values: Values): void;
};

const UploadRange = ({
  session,
  isOpen,
  serviceRange,
  setServiceRange,
  onClose,
}: Props) => {
  const { loading, initialValues, validationSchema, onSubmit } = useHelper({
    session,
    serviceRange,
    setServiceRange,
    onClose,
  });

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"medium_green"}>Modificar tu Ubicación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik {...{ onSubmit, initialValues, validationSchema }}>
            {({ values, errors, handleSubmit }) => (
              <Box as="form" onSubmit={handleSubmit as any}>
                <>
                  <Box mt={3}>
                    <CityControl name="city" label="Ciudad" />
                  </Box>
                  <Box mt={3}>
                    <LocationControl label="Dirección" name="name" />
                  </Box>

                  <Flex mt={3} justifyContent={"space-between"}>
                    <FormLabel>Rango de Servicio</FormLabel>
                    <Text>{values.rangeCoverage} Km</Text>
                  </Flex>
                  <SliderControl
                    name="rangeCoverage"
                    sliderProps={{ max: 140, min: 2 }}
                  />
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Cancelar
                    </Button>
                    <SubmitButton
                      colorScheme={"green"}
                      isLoading={loading}
                      disabled={
                        Object.keys(errors).length > 0 ||
                        Object.values(values).includes(" ")
                          ? true
                          : false
                      }
                    >
                      Actualizar
                    </SubmitButton>
                  </ModalFooter>
                </>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadRange;
