//libraries
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import CardProfesional from "components/CardProfesional";
//native libraries
import Link from "next/link";
import { IUser } from "Provider/UsersProvider";
import { useEffect, useState } from "react";
//componentes
import Layout from "components/layout";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, NextPage } from "next";
import getCategoryByName from "pages/api/public/categories/getCategoryByName";
import { useSession } from "next-auth/react";
import Loading from "components/Loading";
import useHelper from "./useHelper";

//styles

const Services: NextPage<{ category: any }> = ({ category }) => {
  const { cat, users, Session, filteredUsers } = useHelper(category);

  if (!cat || Object.keys(users).length < 1)
    return (
      <Layout>
        <Flex h={"80vh"} justifyContent={"center"}>
          <Loading />
        </Flex>
      </Layout>
    );

  return (
    <Layout>
      <Box
        bgColor={"medium_green"}
        bgImage={cat?.picture_big}
        bgPosition={"center"}
        bgSize={"cover"}
        color={"#fafafa"}
      >
        <Container maxW={"container.xl"} py={10}>
          <Flex
            justifyContent="center"
            padding={5}
            direction="column"
            marginTop={10}
            bg={"#e0fdf09d"}
            borderRadius={8}
          >
            <Heading
              fontSize={"2xl"}
              textAlign="center"
              marginBottom={1}
              color={"gray.800"}
            >
              {cat.name} en {Session ? Session.address.name : "Cordoba Capital"}
            </Heading>
            <Text
              fontSize={"xl"}
              textAlign="center"
              marginBottom={5}
              color={"gray.800"}
            >
              Chatea al instante con profesionales de confianza. No compartimos
              ni tu dirección ni tu teléfono con nadie.
            </Text>
          </Flex>
        </Container>
      </Box>
      <Flex justifyContent="center">
        <Flex flexDirection="column">
          <Link href="/" passHref>
            <Box
              mt={-6}
              as="button"
              width="16rem"
              height="2.5rem"
              borderRadius="10px"
              bg={"medium_green"}
              color="white"
              fontSize="1.6rem"
            >
              Cotizá gratis
            </Box>
          </Link>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(2,1fr)",
          xl: "repeat(3,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
        gap={6}
      >
        {users?.map((m: IUser, i: number) => (
          <GridItem key={i} w={"100%"}>
            <CardProfesional
              _id={m._id}
              img={m.items[0].category.picture_small}
              name={m.name}
              city={m.address.name}
              avatar={m.profilePic}
              description={m.description}
              categories={m.items.map((m: any) => m.category.name)}
            />
          </GridItem>
        ))}
      </Grid>
    </Layout>
  );
};

export default Services;

interface ServerSideProps extends ParsedUrlQuery {
  query: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query as ServerSideProps;

  const category = await getCategoryByName(`${name}`);

  return {
    props: {
      category: JSON.stringify(category),
    },
  };
};
