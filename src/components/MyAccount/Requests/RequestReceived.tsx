import { Heading } from "@chakra-ui/react";

interface IProps {
  requests?: any;
}

const RequestReceived: React.FC<IProps> = ({ requests }) => {
  return (
    <>
      <Heading>Privadas</Heading>
    </>
  );
};

export default RequestReceived;
