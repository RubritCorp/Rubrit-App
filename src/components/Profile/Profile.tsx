//from chakra
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
//from modules
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
//components
import { CloseIcon } from "@chakra-ui/icons";
import MiPerfil from "./MiPerfil";

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
        <DrawerHeader
          borderBottom={"1px solid gray"}
          minH={"64px"}
          position={"relative"}
          d={"flex"}
          alignItems={"center"}
        >
          <Text fontSize={{ base: "md", md: "lg" }} color={"medium_green"}>
            Mi Perfil
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
          <MiPerfil {...{ user }} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Profile;
