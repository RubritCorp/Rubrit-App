//from modules
import { NextApiRequest, NextApiResponse } from "next";
//interfaces
import { IUser } from "models/User/IUser";
import User from "models/User";
//db
import "utils/db";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUsers>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

type DataUsers = {
  message: string;
  user?: IUser[];
};

type DataError = {
  message: string;
};

const cases: ICases = {
  GET: async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({ message: "Data is required" });
    }

    try {
      const user = await User.find({ _id: id })
        .select("name items profilePic address.name")
        .populate({ path: "items.category", model: "Category" });

      res.status(200).json({ message: "Data was fetched", user });
    } catch (err) {
      console.log(err);

      console.log("Error ocurred in GET PUBLIC USERS");
      res.status(404).json({ message: "Error fetching users data" });
    }
  },
  ERROR: (_, res) => {
    res.status(404).json({ message: "Invalid Request" });
  },
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method && method === "GET") {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
