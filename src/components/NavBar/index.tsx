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
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
import Image from "next/image";
//providers
import rubritlogo from "assets/RUBRIT.png";
import { getSender } from "chat/config/ChatLogic";
import { useChat } from "chat/context/ChatProvider";

const WithSubnavigation: React.FC = () => {
  const { user, setSelectedChat, notification, setNotification } = useChat();
  const toast = useToast();
  const [isAuth, setIsAuth] = useState<boolean>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user1, setUser1] = useState<Session>();
  const { pathname } = useRouter();
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
    if (session && status === "authenticated") {
      setUser1(session);
      onClose();

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
      } else if (session.isAuthenticated) {
        toast.close("verify-account");
      }
    } else {
      toast.close("verify-account");
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, session?.isAuthenticated, status]);

  return (
    <Box position={"sticky"} top={0} zIndex={10}>
      {session?.statusAccount === "BANNED" && (
        <Modal isOpen={true} onClose={() => null}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"md"}
              color={"warning_red"}
              textAlign={"center"}
            >
              ¡Esto nos duele mas a nosotros que a tí!
            </ModalHeader>
            <ModalBody>
              <Text>
                Debido a diversos motivos hemos decidido suspender su cuenta y
                restringirle el acceso a la aplicación.
              </Text>
              <Text mt={2}>
                Esta desición no fue tomada a la ligera y es el fruto de una
                acumulación de denuncias por parte de la comunidad.
              </Text>
              <Text mt={2}>
                Si consideras que esto es un error puedes contactarnos a nuestro
                correo de servicio
              </Text>
              <Text color="medium_green">rubritapp@gmail.com</Text>
              <ModalFooter></ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
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
          <MobileNav
            payerId={
              typeof session?.payerId === "string" ? session.payerId : ""
            }
          />
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
                payerId={session && session.payerId ? session.payerId : ""}
              />
            </Box>
          )}
          <Link href="/" passHref={true}>
            <a>
              <Image
                src={rubritlogo}
                alt="user-image"
                width={"120px"}
                height={"35px"}
              />
            </a>
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
              id="signInButton"
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
              transition={"2s"}
            >
              Comenzar
            </Button>
          ) : (
            <>
              <Menu>
                <MenuButton
                  d={{ base: "none", md: "inline" }}
                  transition={".7s"}
                >
                  <BellIcon fontSize={"2xl"} />

                </MenuButton>
                <MenuList pl={2}>
                  {!notification.length && "No New Messages"}

                  {notification.map((notif) => {
              
                    <MenuItem 
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                    </MenuItem>
          })}
                </MenuList>
              </Menu>
              <Menu isLazy>
                {/* fix Popper warning */}
                <h1 style={{ margin: 0 }}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg={"transparent"}
                    transition={".7s"}
                  >
                    {user1 && (
                      <Avatar
                        src={user1?.image}
                        name={user1?.name}
                        cursor={"pointer"}
                        size={"sm"}
                        id={"profile"}
                      />
                    )}
                  </MenuButton>

                  <MenuList>
                    <MenuItem onClick={() => onOpenProfile()}>
                      Mi Perfil
                    </MenuItem>
                    <MenuDivider />
                    <Link
                      href={{
                        pathname: "/myAccount",
                        query: { site: "accountSettings" },
                      }}
                      passHref
                    >
                      <a>
                        <MenuItem icon={<ExternalLinkIcon />}>
                          Ajustes De Cuenta
                        </MenuItem>
                      </a>
                    </Link>
                    <MenuDivider />
                    <Link
                      href={{
                        pathname: "/myAccount",
                        query: { site: "myRequest" },
                      }}
                      passHref
                    >
                      <a>
                        <MenuItem>Solicitudes</MenuItem>
                      </a>
                    </Link>
                    <MenuDivider />
                    <Link
                      href={{
                        pathname: "/chat",
                      }}
                      passHref
                    >
                      <a>
                        <MenuItem>Mis Chats</MenuItem>
                      </a>
                    </Link>
                    <MenuDivider />

                    <Link href={{ pathname: "/request/new" }} passHref>
                      <a>
                        <MenuItem>Solicita Cotización</MenuItem>
                      </a>
                    </Link>
                    <MenuDivider />
                    <Link
                      href={{
                        pathname: "/myAccount",
                        query: { site: "offerServices" },
                      }}
                      passHref
                    >
                      <a>
                        <MenuItem>
                          {!session?.isWorker
                            ? "Ofrecé tus Servicios"
                            : "Modificar Perfil Profesional"}
                        </MenuItem>
                      </a>
                    </Link>
                    <MenuDivider />

                    {session?.role === "ADMIN" && (
                      <>
                        <Link
                          href={{
                            pathname: "/adminDashboard",
                            query: {
                              filter: "allUsers",
                              sort: "alphOrd",
                            },
                          }}
                          passHref
                        >
                          <a>
                            <MenuItem>Panel de Administrador</MenuItem>
                          </a>
                        </Link>
                        <MenuDivider />
                      </>
                    )}


                    <MenuDivider d={{ base: "", md: "none" }} />
                    <MenuItem
                      onClick={() => {
                        signOut({ redirect: false });
                      }}
                    >
                      Cerrar Sesion
                    </MenuItem>
                  </MenuList>
                </h1>
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
                <Login {...{ setIsLogin }} onClose={onClose} status={status} />
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
