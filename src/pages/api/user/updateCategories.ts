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
    const { _id, categories } = req.body;

    if (!_id || !categories) {
      res.status(404).json({ message: "Info is required" });
    }

    try {
      let formattedData: any = [];
      for (let e in categories) {
        formattedData.push({ category: e, subcategories: [...categories[e]] });
      }
      await User.findByIdAndUpdate(
        { _id: _id },
        {
          ["workerData.items"]: [...formattedData],
        }
      );
      res.status(200).json({ message: "Categories are updated" });
    } catch (err) {
      res.status(404).json({ message: "Error ocurred in UPDATE CATEGORIES" });
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
