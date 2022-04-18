import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import Layout from "components/layout";
import SideBar from "./SideBar";
const Request = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const RequestContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const RequestTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const RequestDescription = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const RequestUserAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

const WorkBagResults: React.FC<{ requests: any }> = ({ requests }) => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"xl"} py={1} as={Stack} spacing={11}>
        <Stack spacing={0} align={"center"}>
          <Heading>Busqueda de trabajos</Heading>
          <Text>Resultados</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >

          {requests?.map((req: any, i: number) => (
            <Request key={i}>

              <RequestContent>
                <RequestTitle>{req?.title}</RequestTitle>
                <RequestDescription>{req?.description}</RequestDescription>
              </RequestContent>
              <RequestUserAvatar
                src={req.userId?.profilePic}
                name={req.userId?.name}
                title={req.userId?.address.name}
              />
            </Request>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

const WorkBag: React.FC<{ nearOffers: any; defaultLocation: any }> = ({
  nearOffers,
  defaultLocation,
}) => {
  const [requests, setRequests] = useState([{}]);
  const [filters, setFilters] = useState({});

  console.log("WorkBag", filters);

  useEffect(() => {
    if (nearOffers) {
      setRequests(nearOffers);
    }
  }, []);
  return (
    <Layout>
      <Flex flexDirection={"row"} minH="100vh">
        <SideBar {...{ defaultLocation, filters, setFilters }} />
        <WorkBagResults {...{ requests }} />
      </Flex>
    </Layout>
  );
};

export default WorkBag;
