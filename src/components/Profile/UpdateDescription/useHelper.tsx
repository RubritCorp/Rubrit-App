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
  useToast,
} from "@chakra-ui/react";
//interfaces
import { Session } from "next-auth";
//from modules
import { useState } from "react";
import axios from "axios";

interface Props {
  user: Session;
  onCloseUpdateDescription(): void;
}

const useHelper = ({ user, onCloseUpdateDescription }: Props) => {
  const toast = useToast();
  const [description, setDescription] = useState<string>(user.description);
  const [loading, setLoading] = useState<boolean>(false);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const changeDescription = async () => {
    setLoading(true);
    try {
      await axios.put("/api/user/updateDescription", {
        email: user.email,
        description,
      });
      reloadSession();
      toast({
        title: "La descripción fue modificada.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      onCloseUpdateDescription();
    } catch (err) {
      setLoading(false);

      toast({
        title: "Error al modificar la descripción.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseUpdateDescription();
  };

  return { description, setDescription, loading, changeDescription };
};

export default useHelper;
