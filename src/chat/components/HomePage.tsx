import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

const HomePage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const info = localStorage.getItem("userInfo");

  //   const userInfo = JSON.parse(info ? info : "null");

  //   if (userInfo) {
  //     router.push("/chat/chats");
  //   }
  // }, [router]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#fafafa"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text color="black" fontSize="4xl">
          Rubrit Chat
        </Text>
      </Box>
      <Box
        bg="#fafafa"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color={"black"}
      >
        <Tabs variant="soft-rounded" colorScheme={"medium_green_sub"}>
          <TabList mb="1em">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
