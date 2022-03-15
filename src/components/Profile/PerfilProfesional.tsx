import { Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth/core/types";
import { useSession } from "next-auth/react";

type Props = {
  user: Session;
};

const PerfilProfesional = ({ user }: Props) => {
  const { data: Session } = useSession();
  console.log(user.workerData.items);

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      h={"max-content"}
      w={"23rem"}
      bg={"green"}
    >
      {user.workerData.items.map((m, i: number) => (
        <Text key={i}>{m.category.name}</Text>
      ))}
    </Flex>
  );
};

export default PerfilProfesional;
