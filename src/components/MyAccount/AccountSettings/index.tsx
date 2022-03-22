//from chakra
import {
  Flex,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
  Accordion,
} from "@chakra-ui/react";

//from modules
import Image from "next/image";
import { useRouter } from "next/router";
import { Session } from "next-auth/core/types";

//assets
import User from "assets/user.png";
//Components
import CreatePassword from "./CreatePassword";
import UpdatePassword from "./UpdatePassword";
import UpdateEmail from "./UpdateEmail";
import Address from "./Address";
import DeleteUser from "./DeleteUser";

const AccountSettings: React.FC<{ session: Session }> = ({ session }) => {
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
        <Image src={User} alt="user-image" width={"32px"} height={"32px"} />
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
          Ajustes
        </Tab>
        <Tab
          fontSize={{ base: "sm", md: "xl" }}
          color={"blue.500"}
          _selected={{
            color: useColorModeValue("#2D3748", "#fafafa"),
            bg: useColorModeValue("#fafafa", "#1A202C"),
            borderTop: "1px solid gray",
            borderLeft: "1px solid gray",
            borderRight: "1px solid gray",
          }}
          _focus={{
            border: "transparent",
          }}
        >
          Notificaciones
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
          <Settings {...{ session }} />
        </TabPanel>
        <TabPanel
          bg={useColorModeValue("#fafafa", "#1A202C")}
          borderTop={"1px solid gray"}
          borderRadius={5}
        >
          Notificaciones
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountSettings;

const Settings: React.FC<{
  session: Session;
}> = ({ session }) => {
  const router = useRouter();
  const { isAuthenticated, code } = router.query;

  return (
    <Accordion
      allowToggle
      borderTop={"transparent"}
      defaultIndex={isAuthenticated === "true" ? 1 : 99}
    >
      {/**/}
      <CreatePassword {...{ session }} />
      {/**/}
      <UpdatePassword
        {...{ session }}
        isAuthenticated={`${isAuthenticated}`}
        code={`${code}`}
      />
      {/**/}
      <UpdateEmail {...{ session }} />
      {/**/}
      <Address />
      {/**/}
      <DeleteUser {...{ session }} />
      {/**/}
    </Accordion>
  );
};
