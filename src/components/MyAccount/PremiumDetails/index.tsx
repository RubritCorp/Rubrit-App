import {
  Box,
  chakra,
  Container,
  VStack,
  Grid,
  GridItem,
  Flex,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../Loading";
import envConfig from "../../../../next-env-config";
interface IUser {
  id: string;
  status: string;
  reason: string;
  charged_quantity: string;
  transaction_amount: string;
  currency_id: string;
  start_date: string;
  next_payment_date: string;
  free_trial: boolean;
}
interface IField {
  title: string;
  value: string | undefined;
}
interface FeatureProps {
  title: string;
  value: string;
}
const Feature = ({ title, value }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600" color="medium_green">
        {title}
      </chakra.h3>
      <chakra.p>{value}</chakra.p>
    </GridItem>
  );
};
const PremiumDetails: React.FC<{ payerId: string; email: string }> = ({
  payerId,
  email,
}) => {
  const [user, setUser] = useState<IUser>();
  const [fields, setFields] = useState<IField[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getPayer = async () => {
    setLoading(true);
    if (payerId) {
      const res = await axios.get(
        `${envConfig?.apiUrl}/subs/payer?id=${payerId}`
      );
      if (res.statusText) {
        const {
          status,
          id,
          reason,
          summarized,
          auto_recurring,
          next_payment_date,
        } = res.data.results[0];
        const userInfo: IUser = {
          status,
          id,
          reason,
          charged_quantity: summarized.charged_quantity,
          transaction_amount: auto_recurring.transaction_amount,
          currency_id: auto_recurring.currency_id,
          start_date: auto_recurring.start_date,
          next_payment_date,
          free_trial: Object.keys(summarized).length === 0 ? true : false,
        };
        setUser(userInfo);
        setLoading(false);
      } else {
        throw new Error("Network response not ok");
      }
    }
  };
  useEffect(() => {
    getPayer();
  }, [payerId, getPayer]);

  useEffect(() => {
    let fieldTrial: any[] = [];
    if (!user?.free_trial)
      fieldTrial = [
        {
          title: "Siguiente pago",
          value: user?.next_payment_date
            ? user?.next_payment_date.split("T")[0]
            : "Por definir",
        },
      ];
    const newFields = [
      { title: "Id de pago", value: user?.id },
      { title: "Nombre de suscripcion", value: user?.reason },
      {
        title: "Meses de Suscripcion",
        value: user?.charged_quantity ? user?.charged_quantity : "0",
      },
      { title: "Precio", value: `$${user?.transaction_amount}` },
      { title: "Moneda", value: `${user?.currency_id}` },

      {
        title: user?.free_trial
          ? "Tu periodo de prueba finaliza"
          : "Miembro desde",
        value: user?.start_date.split("T")[0],
      },
    ];
    setFields([...newFields, ...fieldTrial]);
  }, [user]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const putUser = async (status: string) => {
    try {
      setLoading(true);

      if (!payerId) throw new Error("payerId not found");
      const mp = await axios.put(`${envConfig?.apiUrl}/subs/payer/${payerId}`, {
        status,
      });
      let isPremium;
      let id = payerId;
      if (status === "paused") {
        isPremium = false;
      } else if (status === "authorized") {
        isPremium = true;
      } else {
        isPremium = false;
        id = "";
      }
      const user = await axios.put(`/api/user/payer`, {
        email,
        payerId: id,
        isPremium,
      });
      reloadSession();
      setLoading(false);

      if (status !== "cancelled") getPayer();
      else router.push("/myAccount?site=becomePremium");
    } catch (error) {
      console.log("Error in Update");
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    putUser(name);
  };

  return (
    <Box
      as={Container}
      maxW="7xl"
      mt={14}
      alignItems={"flex-start"}
      width={"100%"}
      minH={"100%"}
      p={4}
      paddingTop="10"
      marginTop={"10"}
      bg={useColorModeValue("#fafafa", "#1A202C")}
      border={"1px solid gray"}
      borderRadius="2xl"
      borderTopRadius={"none"}
      borderTop="none"
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap={4}
          >
            <GridItem colSpan={1}>
              <VStack alignItems="flex-start" spacing="20px">
                <chakra.h2 fontSize="3xl" fontWeight="700">
                  Detalles de Suscripción
                </chakra.h2>
                <chakra.h2
                  fontSize="3xl"
                  fontWeight="700"
                  color={"medium_green"}
                >
                  {user?.free_trial
                    ? "Membresia de Prueba"
                    : user?.status === "authorized"
                    ? "Membresia Activa"
                    : user?.status === "paused"
                    ? "Membresia Pausada"
                    : "Membresia Cancelada"}
                </chakra.h2>
                <Flex>
                  <chakra.p>
                    Aquí puede administrar su suscripcion como tambien ver
                    información util sobre su facturación.
                  </chakra.p>
                </Flex>
              </VStack>
            </GridItem>
            <GridItem>
              <Flex gap={"5"} direction={{ base: "column", md: "row" }}>
                {!user?.free_trial && (
                  <Button
                    colorScheme={user?.status === "paused" ? "green" : "blue"}
                    size="md"
                    onClick={handleClick}
                    name={user?.status === "paused" ? "authorized" : "paused"}
                  >
                    {user?.status === "paused"
                      ? "Reanudar Suscripción"
                      : "Pausar Suscripción"}
                  </Button>
                )}
                <Button
                  colorScheme="red"
                  size="md"
                  onClick={handleClick}
                  name="cancelled"
                >
                  Cancelar Suscripción
                </Button>
              </Flex>
            </GridItem>
          </Grid>
          <Divider mt={12} mb={12} />
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={{ base: "8", sm: "12", md: "16" }}
          >
            {fields?.map((e, i) => {
              return (
                <Feature
                  title={e.title}
                  value={e.value ? e.value : ""}
                  key={i}
                />
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};
export default PremiumDetails;
