import { Heading } from "@chakra-ui/react";

interface IProps {
  requests?: any;
}

const RequestReceived: React.FC<IProps> = ({ requests }) => {
  console.log(requests.received);
  return (
    <>
      <Heading>Privadas</Heading>
    </>
  );
};

export default RequestReceived;
