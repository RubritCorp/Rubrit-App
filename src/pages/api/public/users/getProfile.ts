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



export async function getUser(userId: any) {
      
  const populateQuery = [
    {
      path: "items.category",
      model: "Category",
      select: "_id name ",
    },
    {
      path: "items.subcategories",
      model: "Subcategory",
      select: "_id name",
    },
  ];
      const user = await User.findOne({ _id: userId }).populate(populateQuery)
     
    return user
}


const cases: ICases = {
  GET: async (req, res) => {
    const { userId } = req.query
    
    const populateQuery = [
      {
        path: "items.category",
        model: "Category",
        select: "_id name ",
      },
      {
        path: "items.subcategories",
        model: "Subcategory",
        select: "_id name",
      },
    ];
    const user = await User.findOne({ _id: userId }).populate(populateQuery)

    

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
 
    const { method } = req;
    if (method && method === "GET") {
      return cases[method](req, res);
    } else {
      return cases["ERROR"](req, res);
    }
  
}