import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getSender } from "chat/config/ChatLogic";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import envConfig from "../../../next-env-config";
import {
  useChat,
  IUserChat,
  chatContextDefaultValues,
} from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

var socket: any;
const MyChats: React.FC<{ fetchAgain: boolean }> = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<IUserChat>(
    chatContextDefaultValues.user
  );

  const { selectedChat, setSelectedChat, user, chats, setChats } = useChat();

  const toast = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    socket = io(`${envConfig?.apiUrl}`);
    socket.emit("setup", user);

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // const info = localStorage.getItem("userInfo");
    // setLoggedUser(JSON.parse(info ? info : "{}"));
    if (status === "authenticated") {
      setLoggedUser({
        _id: `${session._id}`,
        email: session.email,
        name: session.name,
        profilePic: session.image,
      });
    }
    //user.token no esta cargado al recargar pagina
    // if (user.token) fetchChats();
    fetchChats();

    // eslint-disable-next-line
  }, [fetchAgain, user.token]);

  useEffect(() => {
    socket.on("chat received", (chat: any) => {
      fetchChats();
    });
  });

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${envConfig?.apiUrl}/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Ocurrió un Error!",
        description: "Error al cargar los Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      // bg="#fafafa"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      color={useColorModeValue("dark_green", "medium_green")}
      bg={useColorModeValue("#fafafa", "#1A202C")}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>My Chats</Text>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        {chats ? (
          <Stack
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#2EB67D",
                borderRadius: "24px",
              },
            }}
          >
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? "medium_green_sub.400"
                    : "medium_green_sub.100"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{"message"} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
