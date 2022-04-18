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
    const { commentId, response, date, reviewedId, edited } = req.body;
    if (!commentId || !response || !reviewedId) {
      return res.status(404).json({ message: "Access Denied" });
    }
    try {
      const profileOwner = await User.findById(reviewedId);

      if (!profileOwner) {
        return res.status(404).json({ message: "Access Denied" });
      }

      const comment = profileOwner.rating.comments.find((f: any) =>
        f._id.equals(commentId)
      );

      comment.reactions.reviewedResponse = { response, date, edited };
      profileOwner.save();

      res.status(200).json({ message: "Response updated" });
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
