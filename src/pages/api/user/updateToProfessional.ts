import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import Category from "models/Category";

interface ICases {
  PUT(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUpdate {
  user?: IUser;
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
    const { id, categories, images, rangeCoverage, description} =
      req.body;

    const user = await User.findOne({ _id: id });

    if (!user) return res.status(404).json({ message: "User not found" });
    user.isWorker = true;
    let items = categories.map(async (m: any) => {
      let category = await Category.findOne({ name: m.name }).select("_id");
      return {
        category: category._id,
        subcategories: [...m.subcategories],
      };
    });

    const itemsCat = await Promise.all(items)
      
      user.workerData = {
      rangeCoverage: rangeCoverage,
      images: images,
      items: itemsCat 
    };
    user.description = description;
    user.save();
    res.status(200).json({ message: "Profile was modified", user });
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
