import Layout from "components/layout";
import Requestsend from "../components/RequestSend";
import RequestSend from "../components/RequestSend";

const index = () => {
    return (
      <Layout
        title="Todos los servicios en un solo lugar"
        description="Encuentra servicios brindados por profesionales de confianza."
      >
        <Requestsend />
      </Layout>
    );
  };

export default index
