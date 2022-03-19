import Layout from "components/layout";
import { NextPage } from "next";
import ChatPage from "../../components/Chat/ChatPage";

const chat: NextPage = () => {
  return (
    <Layout>
      <ChatPage />
    </Layout>
  );
};

export default chat;
