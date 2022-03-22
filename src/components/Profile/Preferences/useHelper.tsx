//from chakra
import { useToast } from "@chakra-ui/react";
//from modules
import { ChangeEvent, useState } from "react";
//types
import { Session } from "next-auth/core/types";
import axios from "axios";

interface Preferences {
  notificationsMessages: boolean;
  notificationsNewOffer: boolean;
  hideAddress: boolean;
  showAllChats: boolean;
  language: string;
}

interface Props {
  user: Session;
  onClosePreferences(): void;
}

const useHelper = ({ user, onClosePreferences }: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<Preferences>({
    notificationsMessages: user.preferences.notificationsMessages,
    notificationsNewOffer: user.preferences.notificationsNewOffer,
    hideAddress: user.preferences.hideAddress,
    showAllChats: user.preferences.showAllChats,
    language: user.preferences.language,
  });

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const onChange = (e: any) => {
    interface Props {
      name: string;
      value: string;
    }

    const { name, value }: Props = e.currentTarget;
    if (
      (name && name === "notificationsMessages") ||
      name === "notificationsNewOffer" ||
      name === "hideAddress" ||
      name === "showAllChats" ||
      name === "language"
    ) {
      setInitialValues({
        ...initialValues,
        [name]: !initialValues[name],
      });
    }
    if (value) {
      setInitialValues({
        ...initialValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!user?.isAuthenticated) {
      setLoading(false);
      if (!toast.isActive("no-authenticated")) {
        toast({
          title: "¡Aún no has verificado tu identidad!",
          description:
            "Hemos detectado que aún no has verificado tu correo electronico. Para realizar modificaciones en tu perfil debes confirmar tu identidad.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
          id: "no-authenticated",
        });
      }
      return;
    }
    try {
      await axios.put("/api/user/updatePreferences", {
        email: user.email,
        ...initialValues,
      });
      setLoading(false);
      toast({
        title: "La información se actualizó correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reloadSession();
      onClosePreferences();
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error al actualizar la información.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return { loading, initialValues, setInitialValues, onChange, handleSubmit };
};

export default useHelper;
