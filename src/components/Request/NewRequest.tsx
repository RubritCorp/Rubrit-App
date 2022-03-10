import { Container } from "@chakra-ui/react";
import PublicRequest from "./PublicRequest";
import PrivateRequest from "./PrivateRequest";
import { useRouter } from "next/router";


const NewRequest: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container maxW={"container.xl"} py={12}>
        { !id ? <PublicRequest /> : <PrivateRequest />}
    </Container>
  );
}

export default NewRequest;