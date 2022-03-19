import Layout from "components/layout";
import { NextPage } from "next";
import ChatPage from "../../chat/components/ChatPage";

const chat: NextPage = () => {
  return (
    <Layout>
      <ChatPage />
    </Layout>
  );
};

export default chat;
