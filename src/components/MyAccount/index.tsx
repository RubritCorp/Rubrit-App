//chakra
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
//from modules
import Router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
//components
import AccountSettings from "./AccountSettings";
import Loading from "components/Loading";
import User from "assets/user.png";
import Folder from "assets/folder.png";
import File from "assets/file.png";
import Worker from "assets/worker.png";
import Premium from "assets/premium.png";
import GoBack from "assets/goBack.png";
//Subs
import BecomePremium from "./BecomePremium";
import PremiumDetails from "./PremiumDetails";


import ProfessionalForm from "./ProfessionalForm/";

interface ICases {
  accountSettings(session: Session): ReactElement;
  myfiles(session: Session): ReactElement;
  myRequest(session: Session): ReactElement;
  offerServices(session: Session): ReactElement;
  becomePremium(session: Session): ReactElement;
  premiumDetails(session: Session): ReactElement;
}


const Index: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { site } = router.query;

  const [route, setRoute] = useState<string>();

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await getSession();
      if (!isValid) {
        Router.push("/");
      } else {
        if (site === undefined) {
          setRoute("accountSettings");
        } else {
          setRoute(`${site}`);
        }
      }
    };
    validateSession();
  }, [site]);

  const cases: ICases = {
    accountSettings: (session) => {
      return <AccountSettings {...{ session }} />;
    },
    myfiles: (session) => {
      return <>My Files</>;
    },
    myRequest: (session) => {
      return <>My Request</>;
    },
    offerServices: (session) => {
      return <ProfessionalForm />;
    },
    premiumDetails: (session) => {
      return <PremiumDetails />;
    },
    becomePremium: (session) => {
      return <BecomePremium />;
    },
  };

  if (
    !session ||
    (route !== "accountSettings" &&
      route !== "myfiles" &&
      route !== "myRequest" &&
      route !== "offerServices" &&
      route !== "becomePremium" &&
      route !== "premiumDetails")
  ) {
    return (
      <Flex
        width={"100vw"}
        h={"64.7vh"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        transition={"0.3"}
      >
        <Loading />
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={{ base: "center" }}
      minH={"100vh"}
      position={"relative"}
      mb={14}
    >
      <Flex
        d={{ base: "none", xl: "flex" }}
        h={"90%"}
        mr={10}
        ml={10}
        position={"absolute"}
        left={0}
        top={15}
      >
        {
          <Content
            payerId={session && session.payerId ? session.payerId : ""}
          />
        }
      </Flex>
      <Flex
        w={{ base: "90%", xl: "70%" }}
        maxW={"1200px"}
        justifyContent={"center"}
        alignItems={"flex-end"}
        ml={{ base: 0, xl: "60" }}
      >
        {cases[route](session)}
      </Flex>
    </Flex>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Index;

export const DrawerOptions: React.FC<{
  isOpen: boolean;
  onClose(): void;
  payerId: string;
}> = ({ isOpen, onClose, payerId }) => {

  return (
    <Drawer {...{ isOpen, onClose }} placement={"left"} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text color={"medium_green"}>Panel</Text>
        </DrawerHeader>
        <DrawerBody>{<Content payerId={payerId} />}</DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
};

const Content: React.FC<{ payerId: string }> = ({ payerId }) => {
  return (
    <Box
      marginTop={3}
      fontSize={"xl"}
      fontWeight={700}
      h={"95%"}
      bg={{
        base: "transparent",
        xl: useColorModeValue("#fafafa", "#1A202C"),
      }}
      borderRadius={10}
      border={{ base: "none", xl: "1px solid gray" }}
    >
      <Text
        color={"medium_green"}
        pt={5}
        pl={5}
        d={{ base: "none", xl: "block" }}
      >
        Panel
      </Text>
      <Stack spacing={4} fontWeight={600} fontSize={"md"} marginTop={6}>
        <Link href="myAccount?site=accountSettings" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              justifyContent={"space-between"}
              h={10}
              alignItems={"center"}
              p={3}
              mb={3}
              w={"100%"}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={User}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Ajustes De La Cuenta
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>
        <Link href="myAccount?site=myfiles" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              h={10}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
              mb={3}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={Folder}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Ver Tus Archivos
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>
        <Link href="myAccount?site=myRequest" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              h={10}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
              mb={3}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={File}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Solicitudes
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>
        <Link href="myAccount?site=offerServices" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              h={10}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
              mb={3}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={Worker}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Ofrece Tus Servicios
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>

        {payerId.length === 0 ? (
        <Link href="myAccount?site=becomePremium" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              h={10}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
              mb={3}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={Premium}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Hacerse Premium
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>
            ) : (
            <Link href="myAccount?site=premiumDetails" passHref>
            <Text cursor={"pointer"}>Detalles Premium</Text>
          </Link>
        )}
        <Link href="/" passHref>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Flex
              h={10}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
              mb={3}
              _hover={{
                textDecoration: "none",
                color: "green.400",
                bg: useColorModeValue("#ebe8e8", "#1e242e"),
              }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src={GoBack}
                  alt="user-image"
                  width={"30px"}
                  height={"30px"}
                />
                <Text cursor={"pointer"} ml={3}>
                  Volver a Rubrit
                </Text>
              </Flex>
              <ChevronRightIcon />
            </Flex>
            <Divider w={"90%"} />
          </Flex>
        </Link>
      </Stack>
    </Box>
  );
};
