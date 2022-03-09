//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import axios from "axios";
import { useState } from "react";
import { signOut } from "next-auth/react";
//types
import { Session } from "next-auth/core/types";

type Props = {
  session: Session;
};

const useHelper = ({ session }: Props) => {
  const toast = useToast();
  const [next, setNext] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [other, setOther] = useState<{
    isActive: boolean;
    description: string;
  }>({
    isActive: false,
    description: "",
  });

  const deleteUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/user?reasons=${JSON.stringify([
          ...reasons,
          other.description,
        ])}&email=${session.email}&password=${password}`
      );
      if (data) {
        toast({
          title: "La cuenta fue eliminada exitosamente.",
          description: "Esperamos verlo pronto!.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
        return signOut();
      }
    } catch (err) {
      setLoading(false);
      toast({
        title: "Hubo un error al eliminar la cuenta.",
        description:
          "Comprueba si la contraseña es correcta, si el problema persiste reemplaza la contraseña o contactanos!.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (reasons.includes(value)) {
      setReasons(reasons.filter((f: string) => f !== value));
    } else if (name === "isActive") {
      setOther({
        ...other,
        isActive: e.target.checked,
      });
    } else if (name === "description") {
      setOther({
        ...other,
        description: value,
      });
    } else {
      setReasons([...reasons, value]);
    }
  };

  const handleOtherReasons = (e: any) => {
    const { value, name } = e.target;

    if (name === "isActive") {
      setOther({
        ...other,
        isActive: e.target.checked,
      });
    }
    if (name === "description") {
      setOther({
        ...other,
        description: value,
      });
    }
  };

  const refresh = () => {
    setNext(false);
    setReasons([]);
    setOther({
      isActive: false,
      description: "",
    });
    setPassword("");
  };

  return {
    next,
    other,
    agree,
    reasons,
    loading,
    password,
    handleOtherReasons,
    handleChange,
    setPassword,
    setReasons,
    deleteUser,
    setOther,
    setAgree,
    setNext,
    refresh,
  };
};

export default useHelper;
