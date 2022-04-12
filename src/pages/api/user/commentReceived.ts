//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
import ServiceRequest from "../../../models/ServiceRequest"
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
      data: { score, user, date, comment, userComment, requestId },
    } = req.body.data;

    try {
      const ratingModel = {
        score,
        date,
        userComment,
        description: comment,
      };

          

      const fetchRequest = await ServiceRequest.findOne({_id : requestId})

      if(!fetchRequest.commented) {
        fetchRequest.commented = true;
        fetchRequest.save();
      }
      const fetchUser = await User.findOne({ _id: user });

      fetchUser.rating.comments = [ratingModel, ...fetchUser.rating.comments];
      fetchUser.rating.averageScore =
        (fetchUser.rating.averageScore + score) /
        fetchUser.rating.comments.length;
      /* 
       const averageScore = fetchUser.rating.comments.forEach((e:any) => {
         
       }); */
       
      fetchUser.save();

      res.status(200).json({ message: "Comments updated" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error ocurred " });
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
