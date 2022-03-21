import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useChat } from "../context/ChatProvider";
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";
import SideDrawer from "./miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = useChat();
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);
  return (
    <div>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w={"100%"}
        h="80vh"
        p="aopx"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
