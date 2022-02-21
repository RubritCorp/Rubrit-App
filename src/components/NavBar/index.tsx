//css
//chakra
import { Box } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Box
      w={"100%"}
      h={"5.5rem"}
      border={"1px solid blue"}
      d={"flex"}
      alignItems={"center"}
    >
      <Box w={"50%"}>Rubrit App</Box>
      <Box w={"50%"}>Right</Box>
    </Box>
  );
};

export default Navbar;
