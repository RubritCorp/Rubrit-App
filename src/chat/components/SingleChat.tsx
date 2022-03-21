import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Spinner, Text, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "chat/config/ChatLogic";
import { FormControl } from "formik-chakra-ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat: React.FC<{
  fetchAgain: boolean;
  setFetchAgain: Dispatch<SetStateAction<boolean>>;
}> = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  const {
    selectedChat,
    setSelectedChat,
    user,
    // notification, setNotification
  } = useChat();

  // const fetchMessages = async () => {
  //   if (!selectedChat) return;

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     setLoading(true);

  //     const { data } = await axios.get(
  //       `/api/message/${selectedChat._id}`,
  //       config
  //     );
  //     setMessages(data);
  //     setLoading(false);

  //     socket.emit("join chat", selectedChat._id);
  //   } catch (error) {
  //     toast({
  //       title: "Ocurrió un Error!",
  //       description: "Error al cargar los Mensajes",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };

  // const sendMessage = async (event) => {
  //   if (event.key === "Enter" && newMessage) {
  //     socket.emit("stop typing", selectedChat._id);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       };
  //       setNewMessage("");
  //       const { data } = await axios.post(
  //         "/api/message",
  //         {
  //           content: newMessage,
  //           chatId: selectedChat,
  //         },
  //         config
  //       );
  //       socket.emit("new message", data);
  //       setMessages([...messages, data]);
  //     } catch (error) {
  //       toast({
  //         title: "Ocurrió un Error!",
  //         description: "Error al cargar los Mensajes",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("typing", () => setIsTyping(true));
  //   socket.on("stop typing", () => setIsTyping(false));

  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   fetchMessages();

  //   selectedChatCompare = selectedChat;
  //   // eslint-disable-next-line
  // }, [selectedChat]);

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });

  // const typingHandler = (e) => {
  //   setNewMessage(e.target.value);

  //   if (!socketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.emit("typing", selectedChat._id);
  //   }
  //   let lastTypingTime = new Date().getTime();
  //   var timerLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       socket.emit("stop typing", selectedChat._id);
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // };
  useEffect(() => {}, [selectedChat, user]);

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
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    // fetchMessages={fetchMessages}
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
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl> */}
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
