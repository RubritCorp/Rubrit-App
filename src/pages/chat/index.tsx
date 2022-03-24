import HomePage from "../../chat/components/HomePage";
import Layout from "components/layout";
import { NextPage } from "next";
import ChatPage from "chat/components/ChatPage";
import { useChat } from "chat/context/ChatProvider";

const chat: React.FC = () => {
  const {
    user,
    // notification, setNotification
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useChat();
  return (
    <Layout>
      {/* <HomePage /> */}
      {user.token && <ChatPage />}
    </Layout>
  );
};

export default chat;
