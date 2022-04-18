//from modules
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//from chakra
import { useToast } from "@chakra-ui/react";

type Props = {
  SessionId: string;

  reactions: {
    likes: {
      amount: number;
      users: string[];
    };
    dislikes: {
      amount: number;
      users: string[];
    };
    spam: {
      amount: number;
      users: string[];
    };
    reviewedResponse: {
      response: string;
      date: string;
      edited: boolean;
    };
  };
};

const useHelper = ({ reactions, SessionId }: Props) => {
  const toast = useToast();
  const [reactionStatus, setReactionStatus] = useState<string>();
  const [amountOfLikes, setAmountOfLikes] = useState<number>(0);
  const [reviewedResponse, setReviewedResponse] = useState<{
    response: string;
    date: string;
    edited: boolean;
  }>();
  const [alreadyResponded, setAlreadyResponded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    setReactionStatus(
      reactions.likes.users.includes(SessionId)
        ? "like"
        : reactions.dislikes.users.includes(SessionId)
        ? "dislike"
        : reactions.spam.users.includes(SessionId)
        ? "spam"
        : "none"
    );
    setAmountOfLikes(reactions.likes.amount);
    if (reactions.reviewedResponse && reactions.reviewedResponse.response) {
      setAlreadyResponded(true);
      setReviewedResponse({ ...reactions.reviewedResponse });
    }
  }, [
    SessionId,
    reactions.dislikes.users,
    reactions.likes.amount,
    reactions.likes.users,
    reactions.reviewedResponse,
    reactions.spam.users,
  ]);

  type ReviewsProps = {
    commentId: string;
    review: string;
    reviewerId: string;
    reviewedId: string;
  };
  const commentReview = async ({
    commentId,
    review,
    reviewerId,
    reviewedId,
  }: ReviewsProps) => {
    if (status === "loading" || status === "unauthenticated") {
      return document.getElementById("signInButton")?.click();
    }
    await axios.put("/api/reviews/commentsReviews", {
      commentId,
      review,
      reviewerId,
      reviewedId,
    });

    interface ICases {
      like(): void;
      dislike(): void;
      spam(): void;
    }

    const cases: ICases = {
      like: () => {
        if (reactionStatus === "like") {
          setReactionStatus("none");
          setAmountOfLikes(amountOfLikes - 1);
        } else {
          setReactionStatus("like");
          setAmountOfLikes(amountOfLikes + 1);
        }
      },
      dislike: () => {
        if (reactionStatus === "dislike") {
          setReactionStatus("none");
        } else {
          setReactionStatus("dislike");
          if (reactionStatus === "like") {
            setAmountOfLikes(amountOfLikes - 1);
          }
        }
      },
      spam: () => {
        if (reactionStatus === "spam") {
          setReactionStatus("none");
        } else {
          setReactionStatus("spam");
          if (reactionStatus === "like") {
            setAmountOfLikes(amountOfLikes - 1);
          }
        }
      },
    };

    if (review === "like" || review === "dislike" || review === "spam") {
      cases[review]();
    }
  };

  type EditedCommentProps = {
    commentId: string;
    response: string;
    reviewedId: string;
    edited: boolean;
  };

  const editReviewedResponse = async ({
    commentId,
    response,
    reviewedId,
    edited,
  }: EditedCommentProps) => {
    setLoading(true);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      today.getDate() +
      "-" +
      (today.getMonth() + 1);
    try {
      await axios.put("/api/reviews/reviewedResponse", {
        commentId,
        reviewedId,
        response,
        date,
        edited,
      });

      setReviewedResponse({ response, date, edited: true });
      setLoading(false);

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

  return {
    loading,
    amountOfLikes,
    reactionStatus,
    reviewedResponse,
    alreadyResponded,
    editReviewedResponse,
    setAlreadyResponded,
    setReviewedResponse,
    commentReview,
  };
};

export default useHelper;
