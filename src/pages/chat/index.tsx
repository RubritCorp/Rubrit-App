import HomePage from "components/Chat/HomePage";
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
