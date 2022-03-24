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
  Icon,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RequestReceived from "./RequestReceived";
import RequestSent from "./RequestSent";
import axios from "axios";
import { Article } from "phosphor-react";
import { useRouter } from "next/router";
import envConfig from "../../../../next-env-config";

const Requests: React.FC = () => {
  const toast = useToast();
  const session = useSession();
  const router = useRouter();
  const theme = useTheme();
  const [requests, setRequests] = useState({});
  const [load, setReload] = useState<boolean>(false);
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

  const accessChat = async (userId: string) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${session.data?.token}`,
        },
      };

      const { data } = await axios.post(
        `${envConfig?.apiUrl}/chat`,
        { userId },
        config
      );

      if (data) router.push("/chat");
      else
        toast({
          title: "Error al obtener el chat",
          description: "Chat no devuelto por el back",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
    } catch (error: any) {
      toast({
        title: "Error al obtener el chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

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
        <Article size={40} weight="light" color={theme.colors.medium_green} />
        <Text fontSize={"32px"} fontWeight={500} m={"0 10px"}>
          Solicitudes
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
          <RequestSent {...{ requests, setReload, load, accessChat }} />
        </TabPanel>
        <TabPanel
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderTop={"1px solid gray"}
          borderTopRightRadius={5}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
        >
          <RequestReceived {...{ requests, setReload, load, accessChat }} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Requests;
