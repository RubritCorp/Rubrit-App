//from chakra
import {
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

type Props = {};

const Address = (props: Props) => {
  return (
    <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4}>
      <h2>
        <AccordionButton
          _focus={{ border: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          <Box flex={1} textAlign={"left"}>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>
              Dirección Principal
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pt={4}>Dirección Principal</AccordionPanel>
    </AccordionItem>
  );
};

export default Address;
