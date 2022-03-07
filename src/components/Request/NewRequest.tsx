import { Container } from "@chakra-ui/react";
import Stepstwo from "components/Stepstwo";

const NewRequest: React.FC = () => {
  return (
    <Container maxW={"container.xl"} py={12}>
      <Stepstwo />
    </Container>
  );
}

export default NewRequest;