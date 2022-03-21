import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getSender } from "chat/config/ChatLogic";
import { useEffect, useState } from "react";
import envConfig from "../../../next-env-config";
import {
  useChat,
  IUserChat,
  chatContextDefaultValues,
} from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats: React.FC<{ fetchAgain: boolean }> = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<IUserChat>(
    chatContextDefaultValues.user
  );

  const { selectedChat, setSelectedChat, user, chats, setChats } = useChat();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${envConfig?.apiUrl}/chat`, config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    setLoggedUser(JSON.parse(info ? info : "{}"));
    //user.token no esta cargado al recargar pagina
    if (user.token) fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain, user.token]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={"black"}
      >
        My Chats
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
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
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
                    <b>{chat.latestMessage.sender.name} : </b>
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
