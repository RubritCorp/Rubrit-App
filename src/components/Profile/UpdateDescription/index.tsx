import {
  Text,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
//interfaces
import { Session } from "next-auth";
//from modules
import useHelper from "./useHelper";

const UpdateDescription: React.FC<{
  user: Session;
  isOpenUpdateDescription: boolean;
  onCloseUpdateDescription(): void;
}> = ({ user, isOpenUpdateDescription, onCloseUpdateDescription }) => {
  const { description, setDescription, loading, changeDescription } = useHelper(
    { user, onCloseUpdateDescription }
  );

  return (
    <Modal isOpen={isOpenUpdateDescription} onClose={onCloseUpdateDescription}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Establecer Descripción
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Text>Descripción Máximo 290 caracteres</Text>
          <Textarea
            height={"10rem"}
            maxLength={290}
            marginTop={3}
            placeholder="Me especializo en . . ."
            size="sm"
            resize={"none"}
            name={"description"}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Text marginTop={3} fontSize={{ base: "sm", lg: "md" }}>
            Consejo: Este apartado te servira como carta de presentación hacia
            los demas usuarios, una buena descripción atraera a mas ofertas!
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onCloseUpdateDescription} colorScheme={"blue"}>
              Cancelar
            </Button>
            <Button onClick={changeDescription} isLoading={loading}>
              Confirmar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDescription;
