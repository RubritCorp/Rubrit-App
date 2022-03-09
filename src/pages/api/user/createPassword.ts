//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import { hashPassword } from "utils/verifyPassword";

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
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).json({ message: "Data are required" });

    try {
      const user = await User.findOne({ email: email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.password)
        return res.status(200).json({
          message:
            "Ya posee contraseña, si no la recuerda rellene el formulario de cambio de contraseña.",
        });
      user.password = await hashPassword(password);
      user.save();
      res
        .status(200)
        .json({ message: "La contraseña fue creada con exito.", user });
    } catch (err) {
      console.log("Error ocurred in CREATE PASSWORD");
      res.status(404).json({ message: "Error ocurred in CREATE PASSWORD" });
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
