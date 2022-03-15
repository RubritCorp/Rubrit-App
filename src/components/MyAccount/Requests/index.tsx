import { Heading } from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import RequestReceived from "./RequestReceived";
import RequestSend from "./RequestSend";

const Requests: React.FC = () => {
  const session = useSession();
  console.log(session);

  useEffect(() => {}, []);

  return (
    <>
      <Heading>SOLICITUDES</Heading>
      <RequestSend />
      <RequestReceived />
    </>
  );
};

export default Requests;
