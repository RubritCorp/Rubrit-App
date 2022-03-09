//from chakra
import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
//from modules
import { useState } from "react";
import axios from "axios";
//types
import { Session } from "next-auth/core/types";

const DeleteImage: React.FC<{
  user: Session;
  isOpenDeleteImage: boolean;
  onCloseDeleteImage(): void;
}> = ({ user, isOpenDeleteImage, onCloseDeleteImage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const deleteImage = async () => {
    setLoading(true);
    try {
      await axios.put("/api/user/deleteImage", { email: user.email });
      reloadSession();
      setLoading(false);
      onCloseDeleteImage();
    } catch (err) {
      setLoading(false);

      toast({
        title: "Error al eliminar la foto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseDeleteImage();
  };

  return (
    <Modal isOpen={isOpenDeleteImage} onClose={onCloseDeleteImage}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          ¿Esta seguro que desea eliminar su imagen de perfil?
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onCloseDeleteImage} colorScheme={"blue"}>
              Cancelar
            </Button>
            <Button
              onClick={deleteImage}
              colorScheme={"red"}
              isLoading={loading}
            >
              Confirmar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteImage;
