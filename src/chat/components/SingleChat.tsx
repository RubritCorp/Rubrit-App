import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  FormControl,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { getSender, getSenderFull } from "chat/config/ChatLogic";
import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import io from "socket.io-client";
import envConfig from "../../../next-env-config";
import { IMessage, useChat } from "../context/ChatProvider";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";

var socket: any, selectedChatCompare: any;

const SingleChat: React.FC<{
  fetchAgain: boolean;
  setFetchAgain: Dispatch<SetStateAction<boolean>>;
}> = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [istyping, setIsTyping] = useState<boolean>(false);
  const toast = useToast();

  const {
    selectedChat,
    setSelectedChat,
    user,
    // notification, setNotification
  } = useChat();

  useEffect(() => {
    socket = io(`${envConfig?.apiUrl}`);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedChat._id) fetchMessages();
    //
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: IMessage) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageRecieved]);
        scrollBottom();
        setFetchAgain(!fetchAgain);
      }
    });
  });
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${envConfig?.apiUrl}/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      scrollBottom();
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Ocurrió un Error!",
        description: "Error al cargar los Mensajes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // const sendMessage = async (event: React.KeyboardEvent) => {
  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${envConfig?.apiUrl}/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        scrollBottom();
      } catch (error) {
        toast({
          title: "Ocurrió un Error!",
          description: "Error al cargar los Mensajes",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  // const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const scrollBottom = () => {
    var messageBody = document.querySelector("#messageBody");
    if (messageBody)
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
  };
  return (
    <>
      {selectedChat && selectedChat.users.length > 0 ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              aria-label="Show Sender"
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <span>{getSender(user, selectedChat.users)}</span>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            // bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            // bg={useColorModeValue("gray.100", "gray.700")}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box
                id="messageBody"
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
                <ScrollableChat messages={messages} />
              </Box>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {istyping ? <div>Escribiendo...</div> : <></>}
              <Input
                variant="filled"
                // bg="#E0E0E0"
                // eslint-disable-next-line react-hooks/rules-of-hooks
                // bg={useColorModeValue("#fafafa", "#1A202C")}
                placeholder="Ingrese un mensaje.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3}>
            Haz click en un Usuario para chatear
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
