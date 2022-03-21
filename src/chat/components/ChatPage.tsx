import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";
import SideDrawer from "./miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = useChat();
  return (
    <div>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w={"100%"}
        h="91.5%"
        p="aopx"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
