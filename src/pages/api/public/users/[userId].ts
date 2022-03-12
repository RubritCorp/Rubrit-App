//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "../../../../models/User";
//interface
import { IUser } from "../../../../models/User/IUser";
//db
import "utils/db";

type Data = {
  message: string;
};
interface DataDocument {
  user?: IUser;
  message: string;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}


interface ICases {
  GET(req: any, res: NextApiResponse<DataDocument>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}



const cases: ICases = {
  GET: async (req, res) => {
    const { userId } = req.query;
   
    const user = await User.findOne({ _id: userId });

    
    if (!user) return res.status(404).json({ message: "User not found" });
    

    
    res.status(200).json({ message: "User data", user });
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
    if (method && method === "GET") {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}