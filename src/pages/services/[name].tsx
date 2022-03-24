//libraries
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import CardProfesional from "components/CardProfesional";
import CardProfesionalSmall from "components/CardProfesionalSmall";
//native libraries
import Link from "next/link";
import { IUser, useUsers } from "Provider/UsersProvider";
import { useEffect, useState } from "react";
//componentes
import Layout from "components/layout";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, NextPage } from "next";
import getCategoryByName from "pages/api/public/categories/getCategoryByName";
import { useSession } from "next-auth/react";
import Loading from "components/Loading";
import { useRouter } from "next/router";

//styles

const Services: NextPage<{ category: any; name: string }> = ({
  category,
  name,
}) => {
  const { users } = useUsers();
  const { data: Session } = useSession();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [cat, setCat] = useState<any>({});

  const premiumUsers = filteredUsers.filter((f) => f.isPremium);
  const nonPremiumUsers = filteredUsers.filter((f) => !f.isPremium);

  const [numberPage, setNumberPage] = useState<number>(0);

  useEffect(() => {
    if (users.length && Object.keys(category).length > 0) {
      var info = JSON.parse(category);
      setCat(info.category[0]);

      setFilteredUsers(
        users.filter((f) =>
          f.workerData.items.map((m) => m.category.name).includes(cat.name)
        )
      );
    }
  }, [cat.name, category, name, users]);
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
        bgRepeat={"no-repeat"}
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
              {cat.name} en {Session ? Session.address.city : "Cordoba Capital"}
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.2rem", lg: "1.3rem" }}
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

      <Grid
        justifyContent="center"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          xl: "repeat(3,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
        gap={2}
      >
        {premiumUsers?.map((m: IUser, i: number) => (
          <GridItem key={i} w={"100%"}>
            <CardProfesional
              _id={m._id}
              img={m.workerData.items[0].category.picture_small}
              name={m.name}
              city={m.address.city}
              avatar={m.profilePic}
              description={m.description}
              categories={m.workerData.items.map((m: any) => m.category.name)}
              isPremium={m.isPremium}
            />
          </GridItem>
        ))}
      </Grid>
      <Grid
        justifyContent="center"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          xl: "repeat(3,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
        gap={2}
      >
        {nonPremiumUsers?.map((m: IUser, i: number) => (
          <GridItem key={i} w={"100%"}>
            <CardProfesionalSmall
              _id={m._id}
              name={m.name}
              avatar={m.profilePic}
            />
          </GridItem>
        ))}
      </Grid>

      {filteredUsers.length === 0 ? (
        <Heading>SIN RESULTADO DE BUSQUEDA</Heading>
      ) : null}

      <Flex justifyContent={"center"} m={"10px"}>
        <Link href={"/"}>
          <a>
            <Button>Volver</Button>
          </a>
        </Link>
      </Flex>
    </Layout>
  );
};

export default Services;

interface ServerSideProps extends ParsedUrlQuery {
  query: string;
  params: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  /* const { name } = query as ServerSideProps; */
  const { name } = params as ServerSideProps;

  const category = await getCategoryByName(`${name}`);

  return {
    props: {
      category: JSON.stringify(category),
      name,
    },
  };
};
