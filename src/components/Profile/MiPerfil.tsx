//chakra
import {
  Avatar,
  Text,
  Flex,
  ButtonGroup,
  Button,
  Box,
  Alert,
  AlertIcon,
  useDisclosure,
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
import {
  EditIcon,
  DragHandleIcon,
  DeleteIcon,
  StarIcon,
} from "@chakra-ui/icons";
//interfaces
import { Session } from "next-auth";
//components
import DeleteUser from "./DeleteUser";
import EditProfile from "./EditProfile";
//from modules
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

const MiPerfil: React.FC<{
  user: Session;
  greenColor: string;
  warningColor: string;
}> = ({ user, greenColor, warningColor }) => {
  const {
    isOpen: isOpenUpdateDescription,
    onOpen: onOpenUpdateDescription,
    onClose: onCloseUpdateDescription,
  } = useDisclosure();

  const {
    isOpen: isOpenEditProfile,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
  } = useDisclosure();

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      position={"relative"}
      h={"100%"}
      w={"40rem"}
    >
      <Avatar
        src={user.image}
        name={user.name}
        borderRadius={10}
        w={180}
        h={180}
        marginTop={10}
      />
      <Text
        marginTop={5}
        fontWeight={700}
        fontSize={{ base: "md", md: "lg" }}
        textTransform={"capitalize"}
      >
        {user.name}
      </Text>
      <Text marginTop={5} fontSize={{ base: "md", md: "lg" }}>
        {user.description ? user.description : " "}
      </Text>
      <ButtonGroup marginTop={10}>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
          cursor={"pointer"}
          onClick={onOpenUpdateDescription}
        >
          <Button leftIcon={<StarIcon />} iconSpacing={0} w={"max-content"} />
          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Editar Descripción
          </Text>
          <UpdateDescription
            {...{ user, isOpenUpdateDescription, onCloseUpdateDescription }}
          />
        </Box>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
          onClick={onOpenEditProfile}
        >
          <Button leftIcon={<EditIcon />} iconSpacing={0} />
          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Editar Tu Perfil
          </Text>
          <EditProfile
            {...{
              user,
              isOpenEditProfile,
              onCloseEditProfile,
              greenColor,
              warningColor,
            }}
          />
        </Box>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
        >
          <Button leftIcon={<DragHandleIcon />} iconSpacing={0} />
          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Más
          </Text>
        </Box>
      </ButtonGroup>
      <Box w={"100%"} marginTop={5}>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }}>
          Email
        </Text>
        <Text fontSize={{ base: "sm", lg: "md" }}>{user.email}</Text>
        <Text color="gray" marginTop={5} fontSize={{ base: "sm", lg: "md" }}>
          Número De Teléfono
        </Text>
        <Text>{user.phone ? user.phone : "-"}</Text>
        <Text color="gray" marginTop={5} fontSize={{ base: "sm", lg: "md" }}>
          Tipo De Usuario
        </Text>
        <Text>{user.isWorker ? "Profesional" : "Contratista"}</Text>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} marginTop={5}>
          Zona Horaria
        </Text>
        <Text>-</Text>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} marginTop={5}>
          Dirección
        </Text>
        <Text>-</Text>
        <Text marginTop={5} color={user.isAuthenticated ? greenColor : "red"}>
          {user.isAuthenticated ? "Cuenta Verificada" : "Cuenta Sin Verificar"}
        </Text>
      </Box>

      {(!user.adress || !user.phone) && (
        <Alert
          status="warning"
          position={"absolute"}
          bottom={0}
          flexDirection={"column"}
          borderRadius={10}
        >
          <Flex>
            <AlertIcon />
            Recordá que debes completar tu perfil antes de poder disfrutar todo
            lo que tenemos para ofrecerte
          </Flex>
          <Button leftIcon={<EditIcon />} w={"100%"} variant={"ghost"}>
            Completar Perfil
          </Button>
        </Alert>
      )}
    </Flex>
  );
};

export default MiPerfil;

const UpdateDescription: React.FC<{
  user: Session;
  isOpenUpdateDescription: boolean;
  onCloseUpdateDescription(): void;
}> = ({ user, isOpenUpdateDescription, onCloseUpdateDescription }) => {
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

  return (
    <Modal isOpen={isOpenUpdateDescription} onClose={onCloseUpdateDescription}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Establecer Descripción
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Text>Máximo 290 caracteres</Text>
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
