//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//db
import "utils/db";

interface ICases {
  PUT(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUpdate {
  message: string;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}

const cases: ICases = {
  PUT: async (req, res) => {
    try {
      const { commentId, review, reviewerId, reviewedId } = req.body;
      if (review === "like") {
        const user = await User.findById({ _id: reviewedId });

        const comment = user.rating.comments.find((f: any) =>
          f._id.equals(commentId)
        );

        if (comment.reactions.likes.users.includes(reviewerId)) {
          comment.reactions.likes.amount = comment.reactions.likes.amount - 1;
          comment.reactions.likes.users = comment.reactions.likes.users.filter(
            (f: string) => f !== reviewerId
          );
          user.save();
          return res.status(200).json({ message: "like was retired" });
        }

        comment.reactions.likes.amount = comment.reactions.likes.amount + 1;
        comment.reactions.likes.users = [
          reviewerId,
          ...comment.reactions.likes.users,
        ];

        if (comment.reactions.dislikes.users.includes(reviewerId)) {
          comment.reactions.dislikes.users =
            comment.reactions.dislikes.users.filter(
              (f: string) => f !== reviewerId
            );
          comment.reactions.dislikes.amount =
            comment.reactions.dislikes.amount - 1;
        } else if (comment.reactions.spam.users.includes(reviewerId)) {
          comment.reactions.spam.users = comment.reactions.spam.users.filter(
            (f: string) => f !== reviewerId
          );
          comment.reactions.spam.amount = comment.reactions.spam.amount - 1;
        }
        user.save();
      } else if (review === "dislike") {
        const user = await User.findById({ _id: reviewedId });

        const comment = user.rating.comments.find((f: any) =>
          f._id.equals(commentId)
        );

        if (comment.reactions.dislikes.users.includes(reviewerId)) {
          comment.reactions.dislikes.amount =
            comment.reactions.dislikes.amount - 1;
          comment.reactions.dislikes.users =
            comment.reactions.dislikes.users.filter(
              (f: string) => f !== reviewerId
            );
          user.save();
          return res.status(200).json({ message: "dislike was retired" });
        }

        comment.reactions.dislikes.amount =
          comment.reactions.dislikes.amount + 1;
        comment.reactions.dislikes.users = [
          reviewerId,
          ...comment.reactions.likes.users,
        ];

        if (comment.reactions.likes.users.includes(reviewerId)) {
          comment.reactions.likes.users =
            comment.reactions.dislikes.users.filter(
              (f: string) => f !== reviewerId
            );
          comment.reactions.likes.amount = comment.reactions.likes.amount - 1;
        } else if (comment.reactions.spam.users.includes(reviewerId)) {
          comment.reactions.spam.users = comment.reactions.spam.users.filter(
            (f: string) => f !== reviewerId
          );
          comment.reactions.spam.amount = comment.reactions.spam.amount - 1;
        }

        user.save();
      } else if (review === "spam") {
        const user = await User.findById({ _id: reviewedId });

        const comment = user.rating.comments.find((f: any) =>
          f._id.equals(commentId)
        );

        if (comment.reactions.spam.users.includes(reviewerId)) {
          comment.reactions.spam.amount = comment.reactions.spam.amount - 1;
          comment.reactions.spam.users = comment.reactions.spam.users.filter(
            (f: string) => f !== reviewerId
          );
          user.save();
          return res.status(200).json({ message: "spam was retired" });
        }

        comment.reactions.spam.amount = comment.reactions.spam.amount + 1;
        comment.reactions.spam.users = [
          reviewerId,
          ...comment.reactions.spam.users,
        ];

        if (comment.reactions.likes.users.includes(reviewerId)) {
          comment.reactions.likes.users =
            comment.reactions.dislikes.users.filter(
              (f: string) => f !== reviewerId
            );
          comment.reactions.likes.amount = comment.reactions.likes.amount - 1;
        } else if (comment.reactions.dislikes.users.includes(reviewerId)) {
          comment.reactions.dislikes.users =
            comment.reactions.dislikes.users.filter(
              (f: string) => f !== reviewerId
            );
          comment.reactions.dislikes.amount =
            comment.reactions.dislikes.amount - 1;
        }

        user.save();
      }
      res.status(200).json({ message: "Comments updated" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error ocurred " });
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: "Error, method is invalid!" });
  },
};

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<DataAccesDenied>
) {
  const session = await getSession({ req });
  if (session) {
    const { method } = req;
    if (method && method === "PUT") {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}
