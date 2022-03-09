//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";

interface ICases {
  PUT(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUpdate {
  message: string;
  user?: IUser;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}

const cases: ICases = {
  PUT: async (req, res) => {
    const {
      email,
      notificationsMessages,
      notificationsNewOffer,
      hideAddress,
      showAllChats,
      language,
    } = req.body;

    if (
      !email ||
      notificationsMessages === "undefined" ||
      notificationsNewOffer === "undefined" ||
      hideAddress === "undefined" ||
      showAllChats === "undefined" ||
      !language
    ) {
      return res.status(404).json({ message: "Data is invalid" });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) return res.status(404).json({ message: "User not found" });

      user.preferences = {
        notificationsMessages,
        notificationsNewOffer,
        hideAddress,
        showAllChats,
        language,
      };
      user.save();
      res.status(200).json({ message: "Preferences was modified", user });
    } catch (err) {
      console.log("Error ocurred in UPDATE PREFERENCES");
      res.status(404).json({ message: "Error ocurred in UPDATE PREFERENCES" });
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
