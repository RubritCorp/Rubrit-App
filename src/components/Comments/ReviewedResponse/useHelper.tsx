//from modules
import { useState } from "react";
import axios from "axios";
//from chakra
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

type Props = {
  onClose(): void;
  setAlreadyResponded(value: boolean): void;
  setReviewedResponse({
    response,
    date,
    edited,
  }: {
    response: string;
    date: string;
    edited: boolean;
  }): void;
};

const useHeper = ({
  onClose,
  setAlreadyResponded,
  setReviewedResponse,
}: Props) => {
  const toast = useToast();
  const { data: Session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  //default greeting
  const greeting = () => {
    const date = new Date();
    const hour = date.getHours();
    const cases = {
      morning: () => "Buenos dias ",
      evening: () => "Buenas tardes ",
      night: () => "Buenas noches ",
    };
    return cases[
      hour < 12 ? "morning" : hour >= 12 && hour < 20 ? "evening" : "night"
    ]();
  };

  //submit response
  const handleSubmit = async (commentId: string) => {
    setLoading(true);
    try {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        today.getDate() +
        "-" +
        (today.getMonth() + 1);
      await axios.put("/api/reviews/reviewedResponse", {
        commentId,
        reviewedId: Session?._id,
        response,
        date,
        edited: false,
      });
      setAlreadyResponded(true);
      setReviewedResponse({ response, date, edited: false });
      setLoading(false);
      onClose();
      toast({
        title: "Su cometario fue publicado con exito.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Ocurrio un Error.",
        description: "No pudimos publicar tu respuesta, intentalo nuevamente.",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };
  return { response, loading, handleSubmit, setResponse, greeting };
};

export default useHeper;
