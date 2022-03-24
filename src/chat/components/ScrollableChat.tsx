import {
  Avatar,
  Box,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "chat/config/ChatLogic";
import { IMessage, useChat } from "../context/ChatProvider";
const ScrollableChat: React.FC<{ messages: IMessage[] }> = ({ messages }) => {
  const { user } = useChat();
  return (
    <Box>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{ display: "flex" }}
            key={`${m.sender._id}${m.content}${m._id}`}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.profilePic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                color: "black",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </Box>
  );
};

export default ScrollableChat;
