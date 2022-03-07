import Layout from "components/layout";
import NewRequest from "components/Request/NewRequest";

const NewRequestContainer: React.FC = () => {
  const user = {
    id: "389df8as89109da90sdvb",
    name: "Juany"
  };

  return (
    <Layout 
      title="Todos los servicios en un solo lugar"
      description="Encuentra servicios brindados por profesionales de confianza."
    >
      <NewRequest user={user} />
    </Layout>
  );
};

export default NewRequestContainer;
