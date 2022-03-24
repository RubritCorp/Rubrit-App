//from chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
//from modules
import { useState } from "react";

type Props = {
  isOpenReportProfile: boolean;
  onCloseReportProfile(): void;
};

const ReportProfile = ({
  isOpenReportProfile,
  onCloseReportProfile,
}: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(function () {
      setLoading(false);
      onCloseReportProfile();
      toast({
        title: "El reporte fue enviado.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Modal isOpen={isOpenReportProfile} onClose={onCloseReportProfile}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"warning_red"}>Reportar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>¿Por qué quieres reportar este perfil?</Text>
          <Checkbox colorScheme="green" mt={2} d={"block"}>
            Es spam.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Desnudos o actividad sexual.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Violencia u organizaciones peligrosas.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Bullyng o acoso.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Lenguage o símbolos que incitan al odio.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Estafa o fraude.
          </Checkbox>
          <Checkbox colorScheme="green" mt={2}>
            Infracción de la propiedad intelectual.
          </Checkbox>
          <Textarea
            marginTop={4}
            placeholder="Deseo denunciar al perfil porque . . ."
            size="sm"
            resize={"none"}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCloseReportProfile}>
            Cancelar
          </Button>
          <Button
            variant="ghost"
            colorScheme={"red"}
            isLoading={loading}
            onClick={handleSubmit}
          >
            Enviar Reporte
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportProfile;
