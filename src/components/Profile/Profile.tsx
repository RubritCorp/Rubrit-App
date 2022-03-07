//from chakra
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  useTheme,
} from "@chakra-ui/react";
//from modules
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
import Router from "next/router";
//components
import Loading from "components/Loading";
import { CloseIcon } from "@chakra-ui/icons";
import MiPerfil from "./MiPerfil";
//interfaces
import { IUser } from "models/User/IUser";

const Profile: React.FC<{ onCloseProfile(): void; isOpenProfile: boolean }> = ({
  onCloseProfile,
  isOpenProfile,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>();
  const [tab, setTab] = useState<string>("Mi Perfil");
  const theme = useTheme();
  const [size, setSize] = useState<string>("sm");

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
      size={size}
      isFullHeight={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottom={"1px solid gray"}
          minH={"64px"}
          position={"relative"}
          d={"flex"}
          alignItems={"center"}
        >
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color={theme.colors.medium_green}
          >
            {tab}
          </Text>
          <Button
            leftIcon={<CloseIcon />}
            position={"absolute"}
            right={5}
            iconSpacing={0}
            bg={"transparent"}
            onClick={onCloseProfile}
          />
        </DrawerHeader>
        <DrawerBody display={"flex"}>
          {/* <Tabs orientation={"vertical"}>
              <TabList h={"100%"}>
                <Tab h={"20%"} onClick={() => setTab("Mi Perfil")}>
                  <Box
                    d={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Avatar
                      src={user?.image}
                      name={user?.name}
                      marginBottom={2}
                      outline={"3px solid green"}
                    />
                    Mi Perfil
                  </Box>
                </Tab>

                <Tab h={"20%"} onClick={() => setTab("Solicita Cotizacion")}>
                  Solicita Cotización
                </Tab>
                <Tab h={"20%"} onClick={() => setTab("Ofrece Tus Servicios")}>
                  Ofrece tus Servicios
                </Tab>
                <Tab h={"20%"} onClick={() => setTab("Bolsa de Trabajo")}>
                  Solicitudes
                </Tab>
                <Tab h={"20%"} onClick={() => setTab("Solicita Cotizacion")}>
                  Hacerse Premium
                </Tab>
              </TabList>
            </Tabs> */}
          <MiPerfil
            {...{ user }}
            greenColor={theme.colors.medium_green}
            warningColor={theme.colors.warning_red}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Profile;
