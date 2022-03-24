import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import { useChat, IUserChat } from "../../context/ChatProvider";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import envConfig from "../../../../next-env-config";

var socket: any;
const UpdateGroupChatModal: React.FC<{
  fetchMessages: any;
  fetchAgain: boolean;
  setFetchAgain: Dispatch<SetStateAction<boolean>>;
}> = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUserChat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [renameloading, setRenameLoading] = useState<boolean>(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = useChat();
  //handleSearch
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${envConfig?.apiUrl}/user?search=${query}`,
        config
      );
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Ocurrió un Error!",
        description: "Error al cargar los resultados de la búsqueda",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  //handleRename
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${envConfig?.apiUrl}/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      socket.emit("change name");
      setRenameLoading(false);
    } catch (error: any) {
      toast({
        title: "Ocurrió un error!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  //handleAddUser
  const handleAddUser = async (user1: IUserChat) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "El Usuario ya está en el grupo!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin?._id !== user._id) {
      toast({
        title: "Solo los administradores pueden agregar a alguien!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${envConfig?.apiUrl}/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Ocurrió un Error!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  //handleRemove
  const handleRemove = async (user1: IUserChat) => {
    if (selectedChat.groupAdmin?._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Solo los administradores pueden eliminar a alguien!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${envConfig?.apiUrl}/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Ocurrió un Error!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <IconButton
        aria-label="Update Group"
        d={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" d="flex" justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  // admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Nombre del Grupo"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Actualizar
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Añadir Usuario al Grupo"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user1) => (
                <UserListItem
                  key={user1._id}
                  user={user1}
                  handleFunction={() => handleAddUser(user1)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Salir del Grupo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
