import { ChevronDownIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import Map from "components/Maps/Map";
import { Session } from "next-auth/core/types";
import { useSession } from "next-auth/react";

type Props = {
  user: Session;
};

const PerfilProfesional = ({ user }: Props) => {
  console.log(user.workerData);

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      h={"max-content"}
      w={"23rem"}
    >
      <Box w={"100%"}>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} mb={2}>
          Servicios Ofrecidos
        </Text>

        <Accordion allowToggle>
          {user.workerData.items.map((m, i: number) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Flex key={i} alignItems={"center"}>
                    <ChevronDownIcon color={"green"} mr={2} />
                    <Text mb={1} fontSize={{ base: "md", lg: "lg" }}>
                      {m.category.name}
                    </Text>
                  </Flex>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {m.subcategories.map((m, i: number) => (
                  <Flex key={i} alignItems={"center"} ml={6}>
                    <MinusIcon color={"green"} mr={2} />
                    <Text fontSize={{ base: "sm", lg: "md" }}>{m.name}</Text>
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Flex justifyContent={"space-between"} mb={2} mt={2}>
          <Text color="gray" fontSize={{ base: "sm", lg: "md" }}>
            Rango de Servicio
          </Text>
          <Text>{user.workerData.rangeCoverage} Km</Text>
        </Flex>
        <Flex justifyContent={"center"}>
          <Box
            w={"22rem"}
            h={"15rem"}
            border={"2px solid"}
            borderColor={"medium_green"}
          >
            <Map
              coverage={user.workerData.rangeCoverage}
              location={{ lat: user.address.lat, lng: user.address.lng }}
            />
          </Box>
        </Flex>

        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} mb={2} mt={2}>
          Rango de Servicio
        </Text>
      </Box>
    </Flex>
  );
};

export default PerfilProfesional;
