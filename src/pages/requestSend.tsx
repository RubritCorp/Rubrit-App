import Layout from "components/layout";
import { NextPage } from "next";
import Requestsend from "../components/RequestSend";

const index: NextPage = () => {
  return (
    <Layout
      title="Todos los servicios en un solo lugar"
      description="Encuentra servicios brindados por profesionales de confianza."
    >
      <Requestsend />
    </Layout>
  );
};

export default index;
