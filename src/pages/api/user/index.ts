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
  POST(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUser {
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
  POST: async (req, res) => {
    const { email, name, profilePic } = req.body;

    try {
      const userVerification = await User.findOne({ email: email });

      if (userVerification) {
        res.status(200).json({ message: "Welcome", user: userVerification });
        return;
      }
      const user = await User.create({
        name,
        email,
        profilePic,
      });
      res.status(200).json({ message: "User created successfully", user });
    } catch (err) {
      console.log(err);

      res.status(404).json({ message: "Error fetching data" });
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
  /* if (session) { */
  const { method } = req;
  if (method && method === "POST") {
    return cases[method](req, res);
  }
  return cases["ERROR"](req, res);
  /* } else {
    res.status(500).json({ message: "Acces Denied" });
  } */
}
