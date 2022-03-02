//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
//interface
import { IUser } from "models/User/IUser";
//model
import User from "models/User";
//utils
import { hashPassword } from "utils/verifyPassword";
import "utils/db";

interface DataSignUp {
  message: string;
  user?: IUser;
}

interface DataError {
  message: string;
}

interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataSignUp>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  POST: async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(422).json({ message: "Invalid Data" });
    }
    try {
      const validate = await User.findOne({ email: email });

      if (validate) {
        res.status(422).json({ message: "User already exists" });
      }

      const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
        phone,
      });

      res.status(200).json({ message: "User created", user });
    } catch (err) {
      console.log("Error in POST USER");
      //console.log(err);
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: "Invalid Method" });
  },
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === "POST") {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
