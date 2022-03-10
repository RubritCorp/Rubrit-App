import { Container } from "@chakra-ui/react";
import PublicRequest from "./PublicRequest";
import PrivateRequest from "./PrivateRequest";


const NewRequest: React.FC = () => {
  return (
    <Container maxW={"container.xl"} py={12}>
        { 1===1 ? <PublicRequest /> : <PrivateRequest />}
    </Container>
  );
}

export default NewRequest;