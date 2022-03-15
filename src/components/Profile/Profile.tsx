//from chakra
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
//from modules
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
//components
import { CloseIcon } from "@chakra-ui/icons";
import MiPerfil from "./MiPerfil";
import PerfilProfesional from "./PerfilProfesional";

const Profile: React.FC<{ onCloseProfile(): void; isOpenProfile: boolean }> = ({
  onCloseProfile,
  isOpenProfile,
}) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await getSession();
      if (!isValid) {
        Router.push("/?authenticated=false");
      } else {
        setUser(session);
      }
    };
    validateSession();
  }, [session]);

  return (
    <Drawer
      onClose={onCloseProfile}
      isOpen={isOpenProfile}
      size={"sm"}
      isFullHeight={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Tabs>
          <DrawerHeader
            minH={"78px"}
            position={"relative"}
            d={"flex"}
            alignItems={"center"}
          >
            <TabList>
              <Tab
                _focus={{
                  border: "transparent",
                  borderBottom: "2px solid blue",
                }}
              >
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={"medium_green"}
                >
                  Mi Perfil
                </Text>
              </Tab>
              {user?.isWorker && (
                <Tab
                  _focus={{
                    border: "transparent",
                    borderBottom: "2px solid blue",
                  }}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color={"medium_green"}
                  >
                    Perfil Profesional
                  </Text>
                </Tab>
              )}
            </TabList>

            <Button
              leftIcon={<CloseIcon />}
              position={"absolute"}
              right={5}
              iconSpacing={0}
              bg={"transparent"}
              onClick={onCloseProfile}
            />
          </DrawerHeader>
          <DrawerBody>
            <TabPanels
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <TabPanel>
                <MiPerfil {...{ user }} />
              </TabPanel>
              <TabPanel>
                <PerfilProfesional {...{ user }} />
              </TabPanel>
            </TabPanels>
          </DrawerBody>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};

export default Profile;
