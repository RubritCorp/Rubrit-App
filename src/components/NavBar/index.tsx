//from chakra
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  BellIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
//from modules
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
import Router, { useRouter } from "next/router";
import Link from "next/link";
//components
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Login from "components/Login";
import Register from "components/Register";
import DarkModeSwitch from "components/DarkModeSwitch";
import { DrawerOptions } from "components/MyAccount";
//interfaces
import EmailAuthModal from "./emailAuthModal";
import Profile from "components/Profile/Profile";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Servicios",
    children: [
      {
        label: "Albañil",
        subLabel: "A",
        href: "/",
      },
    ],
  },
  {
    label: "Buscar Servicios",
    href: "/findServices",
  },
  {
    label: "Ofrece tus Servicios",
    href: "offerServices",
  },
  {
    label: "Bolsa De Trabajo",
    href: "/workbag",
  },
];

const WithSubnavigation: React.FC = () => {
  const toast = useToast();
  const [isAuth, setIsAuth] = useState<boolean>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<Session>();
  const { pathname, query } = useRouter();
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawerOptions,
    onOpen: onOpenDrawerOptions,
    onClose: onCloseDrawerOptions,
  } = useDisclosure();

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      if (query.login === "true") {
        setIsAuth(true);
        setIsLogin(true);
        onOpen();
      }
    }

    if (session && status === "authenticated") {
      Router.push("/");
      setUser(session);

      if (!toast.isActive("verify-account")) {
        if (!session.isAuthenticated) {
          toast({
            duration: 30 * 24 * 60 * 60,
            isClosable: false,
            id: "verify-account",
            render: () => <EmailAuthModal email={session?.email} />,
            position: "bottom-left",
          });
        }
      } else {
        toast.close("verify-account");
      }
    } else {
      if (query.error) {
        if (!toast.isActive("error-signin")) {
          toast({
            title: "¡Error al iniciar sesión!",
            description: "¡El usuario o contraseña son erroneos!",
            status: "error",
            duration: 5000,
            isClosable: true,
            id: "error-signin",
          });
        }
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, session?.isAuthenticated, status]);

  return (
    <Box position={"sticky"} top={0} zIndex={10}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <MobileNav />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          {pathname === "/myAccount" && (
            <Box d={{ base: "none", md: "inline", xl: "none" }}>
              <Button
                rightIcon={<HamburgerIcon boxSize={"1.5rem"} />}
                iconSpacing={0}
                variant={"ghost"}
                mr={5}
                onClick={onOpenDrawerOptions}
              />
              <DrawerOptions
                isOpen={isOpenDrawerOptions}
                onClose={onCloseDrawerOptions}
              />
            </Box>
          )}
          <Link href="/" passHref={true}>
            <Text
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text>
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          alignItems={"center"}
        >
          <Box d={{ base: "none", md: "inline" }}>
            <DarkModeSwitch />
          </Box>
          {!session &&
          (status === "loading" || status === "unauthenticated") ? (
            <Button
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight={600}
              color={"white"}
              bg={"#2EB67D"}
              _hover={{
                bg: "#33a173",
              }}
              onClick={() => {
                setIsAuth(true);
                onOpen();
              }}
            >
              Comenzar
            </Button>
          ) : (
            <>
              <Menu>
                <MenuButton d={{ base: "none", md: "inline" }}>
                  <BellIcon fontSize={"2xl"} />
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg={"transparent"}
                >
                  {user && (
                    <Avatar
                      src={user?.image}
                      name={user?.name}
                      cursor={"pointer"}
                      size={"sm"}
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => onOpenProfile()}>Mi Perfil</MenuItem>
                  <MenuDivider />
                  <Link href={"myAccount"} passHref>
                    <MenuItem icon={<ExternalLinkIcon />}>
                      Ajustes De Cuenta
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem>Solicitudes</MenuItem>
                  <MenuDivider />
                  <MenuItem>Solicita Cotización</MenuItem>
                  <MenuDivider />
                  <MenuItem>Ofrecé tus Servicios</MenuItem>
                  <MenuDivider />
                  <MenuItem d={{ base: "inline", md: "none" }}>
                    Notificaciones
                  </MenuItem>
                  <MenuDivider d={{ base: "", md: "none" }} />
                  <MenuItem
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Cerrar Sesion
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          {isAuth && (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose(), setIsLogin(true);
              }}
              blockScrollOnMount
              preserveScrollBarGap
            >
              <ModalOverlay />
              {isLogin ? (
                <Login {...{ setIsLogin }} />
              ) : (
                <Register {...{ setIsAuth, setIsLogin }} />
              )}
            </Modal>
          )}
        </Stack>
      </Flex>

      {session && status === "authenticated" && (
        <Profile {...{ isOpenProfile, onCloseProfile }} />
      )}
    </Box>
  );
};

export default WithSubnavigation;
