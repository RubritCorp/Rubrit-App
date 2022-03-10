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
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import AccountSettings from "./AccountSettings";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
import Layout from "components/layout";
import Loading from "components/Loading";
import BecomePremium from "./BecomePremium";
import PremiumDetails from "./PremiumDetails";
import Script from "next/script";
import { NextPage } from "next";

interface ICases {
  accountSettings(session: Session): ReactElement;
  myfiles(session: Session): ReactElement;
  myRequest(session: Session): ReactElement;
  offerServices(session: Session): ReactElement;
  becomePremium(session: Session): ReactElement;
  premiumDetails(session: Session): ReactElement;
}

const Index: NextPage = () => {
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
      return <>offer Services</>;
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
        mr={10}
        ml={10}
        position={"absolute"}
        left={0}
      >
        {
          <Content
            payerId={session && session.payerId ? session.payerId : ""}
          />
        }
      </Flex>
      <Flex
        w={{ base: "90%", xl: "70%" }}
        justifyContent={"center"}
        alignItems={"flex-end"}
        ml={{ base: 0, xl: "20" }}
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
  const theme = useTheme();
  return (
    <Drawer {...{ isOpen, onClose }} placement={"left"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text color={theme.colors.medium_green}>Panel</Text>
        </DrawerHeader>
        <DrawerBody>{<Content payerId={payerId} />}</DrawerBody>
        <DrawerFooter>Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const Content: React.FC<{ payerId: string }> = ({ payerId }) => {
  return (
    <Box marginTop={3} fontSize={"xl"} fontWeight={700}>
      <Stack spacing={4} fontWeight={600} fontSize={"md"} marginTop={6}>
        <Link href="myAccount?site=accountSettings" passHref>
          <Text cursor={"pointer"}>Ajustes De La Cuenta</Text>
        </Link>
        <Link href="myAccount?site=myfiles" passHref>
          <Text cursor={"pointer"}>Ver Tus Archivos</Text>
        </Link>
        <Link href="myAccount?site=myRequest" passHref>
          <Text cursor={"pointer"}>Solicitudes</Text>
        </Link>
        <Link href="myAccount?site=offerServices" passHref>
          <Text cursor={"pointer"}>Ofrece Tus Servicios</Text>
        </Link>

        <Text>Notificaciones</Text>
        {payerId.length === 0 ? (
          <Link href="myAccount?site=becomePremium" passHref>
            <Text cursor={"pointer"}>Hacerse Premium</Text>
          </Link>
        ) : (
          <Link href="myAccount?site=premiumDetails" passHref>
            <Text cursor={"pointer"}>Detalles Premium</Text>
          </Link>
        )}
      </Stack>
    </Box>
  );
};
