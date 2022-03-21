import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useChat } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox: React.FC<{
  fetchAgain: boolean;
  setFetchAgain: Dispatch<SetStateAction<boolean>>;
}> = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChat();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
