//components
import Layout from "components/layout";
import MyAccount from "components/MyAccount";
import { NextPage } from "next";

const profile: NextPage = () => {
  return (
    <Layout>
      <MyAccount />
    </Layout>
  );
};

export default profile;
