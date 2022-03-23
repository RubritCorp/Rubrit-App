import HomePage from "../../chat/components/HomePage";
import Layout from "components/layout";
import { NextPage } from "next";
import ChatPage from "chat/components/ChatPage";

const chat: NextPage = () => {
  return (
    <Layout>
      {/* <HomePage /> */}
      <ChatPage />
    </Layout>
  );
};

export default chat;
