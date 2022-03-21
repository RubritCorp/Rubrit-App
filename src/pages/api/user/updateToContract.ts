import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

//models
import User from "models/User";
import Contract from "models/Contract";
//interface
import  {IUser} from "models/User/IUser";
//db
import "utils/db"


interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
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
    POST: async (req, res) => {
        const session = await getSession({req});
        if (!session) {
            res.status(401).json({message: "Access denied"});
            return;
        }
        const user = await User.findById(session.user.email);
        if (!user) {
            res.status(401).json({message: "Access denied"});
            return;
        }
        const {
            client,
            profesional,
            approxDuration,
            budget,
            detailes,
            addressWorke,
        } = req.body;
        const contract = new Contract({
            client,
            profesional,
            approxDuration,
            budget,
            detailes,
            addressWorke,
        });
        await contract.save();
        res.status(200).json({message: "Contract created"});
    },
    ERROR: function (req: NextApiRequest, res: NextApiResponse<DataError>): void {
        throw new Error("Function not implemented.");
    }
};

export default async function index(
    req: NextApiRequest,
     res: NextApiResponse<DataAccesDenied>
     ){
    const session = await getSession({ req });
     if (session) {
    const { method } = req;
    if (method && method === "POST") {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}

