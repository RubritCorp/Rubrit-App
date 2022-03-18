import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import RequestReceived from "./RequestReceived";
import RequestSent from "./RequestSent";
import axios from "axios";

const Requests: React.FC = () => {
  const session = useSession();
  const [requests, setRequests] = useState({});

  async function fetchRequest() {
    const {
      data: { requests },
    } = await axios.get("/api/serviceRequest/new", {
      params: {
        id: session.data!._id,
      },
    });
    setRequests(requests);
  }

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <Tabs
      mt={16}
      w={"100%"}
      minH={"94%"}
      variant={"enclosed"}
      defaultIndex={0}
      position={"relative"}
    >
      <Flex position={"absolute"} top={-12} left={9} alignItems={"center"}>
        <Image src={"/"} alt="user-image" width={"32px"} height={"32px"} />
        <Text fontSize={"32px"} fontWeight={500}>
          Cuenta
        </Text>
      </Flex>
      <TabList>
        <Tab
          fontSize={{ base: "sm", md: "xl" }}
          color={"blue.500"}
          _selected={{
            color: useColorModeValue("#2D3748", "#fafafa"),
            bg: useColorModeValue("#BBE1C3", "#1A202C"),
            borderTop: "1px solid gray",
            borderLeft: "1px solid gray",
            borderRight: "1px solid gray",
          }}
          _focus={{
            border: "transparent",
          }}
        >
          ENVIADAS
        </Tab>
        <Tab
          fontSize={{ base: "sm", md: "xl" }}
          color={"blue.500"}
          _selected={{
            color: useColorModeValue("#2D3748", "#fafafa"),
            bg: useColorModeValue("#BBE1C3", "#1A202C"),
            borderTop: "1px solid gray",
            borderLeft: "1px solid gray",
            borderRight: "1px solid gray",
          }}
          _focus={{
            border: "transparent",
          }}
        >
          RECIBIDAS
        </Tab>
      </TabList>
      <TabPanels
        bg={useColorModeValue("#fafafa", "#2D3748")}
        w={"100%"}
        minH={"100%"}
        borderBottom="1px solid gray"
        borderLeft="1px solid gray"
        borderRight="1px solid gray"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderTopRightRadius={5}
        borderTopLeftRadius={5}
      >
        <TabPanel
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderTop={"1px solid gray"}
          borderTopRightRadius={5}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
        >
          <RequestSent requests={requests} />
        </TabPanel>
        <TabPanel
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderTop={"1px solid gray"}
          borderTopRightRadius={5}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
        >
          <RequestReceived requests={requests} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Requests;
