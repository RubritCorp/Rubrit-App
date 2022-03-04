//chakra
import { Box } from "@chakra-ui/react";
//from modules
import Image from "next/image";
//assets
import mail from "assets/mail.png";
import facebook from "./facebook.png";
import google from "./google.png";

const Mail = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={mail} alt="mailIcon" objectFit="cover" />
    </Box>
  );
};

const Facebook = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={facebook} alt="FacebookIcon" objectFit="cover" />
    </Box>
  );
};

const Google = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={google} alt="GoogleIcon" objectFit="cover" />
    </Box>
  );
};

export { Mail, Facebook, Google };
