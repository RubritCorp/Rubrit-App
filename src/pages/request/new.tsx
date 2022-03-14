import Layout from "components/layout";
import NewRequest from "components/Request/NewRequest";

const NewRequestContainer: React.FC = () => {
  return (
    <Layout 
      title="Todos los servicios en un solo lugar"
      description="Encuentra servicios brindados por profesionales de confianza."
    >
      <NewRequest />
    </Layout>
  );
};

export default NewRequestContainer;
