import HomePage from "../../chat/components/HomePage";
import Layout from "components/layout";
import { NextPage } from "next";

const chat: NextPage = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default chat;
