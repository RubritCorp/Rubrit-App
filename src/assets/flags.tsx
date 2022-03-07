import { Box } from "@chakra-ui/react";
import Image from "next/image";
import argentina from "./argentina.png";
import colombia from "./colombia.png";
import mexico from "./mexico.png";
import paraguay from "./paraguay.png";
import peru from "./peru.png";
import uruguay from "./uruguay.png";
import chile from "./chile.png";

export const ARG: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={argentina} alt="argentina" objectFit="cover" />
    </Box>
  );
};

export const COL: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={colombia} alt="colombia" objectFit="cover" />
    </Box>
  );
};

export const MEX: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={mexico} alt="mexico" objectFit="cover" />
    </Box>
  );
};

export const PAR: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={paraguay} alt="paraguay" objectFit="cover" />
    </Box>
  );
};

export const PER: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={peru} alt="peru" objectFit="cover" />
    </Box>
  );
};

export const URU: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={uruguay} alt="uruguay" objectFit="cover" />
    </Box>
  );
};

export const CHI: React.FC = () => {
  return (
    <Box width={"1.2rem"} height={"1.2rem"}>
      <Image src={chile} alt="chile" objectFit="cover" />
    </Box>
  );
};
