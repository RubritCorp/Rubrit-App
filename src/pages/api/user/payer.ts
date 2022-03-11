import "utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import User from "models/User";
import { IUser } from "models/User/IUser";
interface DataUser {
  message: string;
  user?: IUser;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataUser>
) {
  const { method } = req;
  const { email, payerId } = req.body;
  switch (method) {
    case "PUT":
      try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.payerId = payerId;
        user.isPremium = true;
        user.save();

        res.status(200).json({ message: "User was modified", user });
      } catch (error) {
        res.status(404).json({ message: "Error was ocurred" });
      }
      break;
    default:
      res.status(400).json({ message: "Error, method is invalid!" });
      break;
  }
}
