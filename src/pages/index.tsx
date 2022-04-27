//components
import Layout from "components/layout";
import LandingPage from "components/LandingPage";
import { NextPage } from "next";

const index: NextPage = () => {
  return (
    <Layout
      title="Todos los servicios en un solo lugar"
      description="Encuentra servicios brindados por profesionales de confianza."
    >
      <LandingPage />
    </Layout>
  );
};

export default index;
