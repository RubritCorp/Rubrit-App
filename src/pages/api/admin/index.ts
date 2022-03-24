//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//db
import "utils/db";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse): void;
  PUT(req: NextApiRequest, res: NextApiResponse): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}

const cases: ICases = {
  GET: async (req, res) => {
    const { filter, sort, input } = req.query;

    const filterParameter = `${filter}`.split(":")[0];
    const filterValue = `${filter}`.split(":")[1];
    try {
      const users = await User.find(
        filter === "allUsers"
          ? !input
            ? {}
            : {
                $or: [
                  { email: new RegExp(`${input}`.toLowerCase(), "i") },
                  { name: new RegExp(`${input}`.toLowerCase(), "i") },
                  {
                    "phone.number": new RegExp(`${input}`.toLowerCase(), "i"),
                  },
                ],
              }
          : !input
          ? {
              $or: [
                {
                  [`${filterParameter}`]:
                    filterValue === "true"
                      ? true
                      : filterValue !== "false"
                      ? filterValue
                      : false,
                },
              ],
            }
          : {
              $and: [
                {
                  [`${filterParameter}`]:
                    filterValue === "true"
                      ? true
                      : filterValue !== "false"
                      ? filterValue
                      : false,
                },
                {
                  $or: [
                    { email: new RegExp(`${input}`.toLowerCase(), "i") },
                    { name: new RegExp(`${input}`.toLowerCase(), "i") },
                    {
                      "phone.number": new RegExp(`${input}`.toLowerCase(), "i"),
                    },
                  ],
                },
              ],
            }
      ).sort([["name", sort === "alphOrd" ? 1 : -1]]);
      const usersNoWorker = await User.find({ isWorker: false }).count();
      const usersWorker = await User.find({ isWorker: true }).count();
      const usersPremium = await User.find({ isPremium: true }).count();
      const usersBanned = await User.find().count();

      res.status(200).json({
        users,
        usersNoWorker,
        usersWorker,
        usersPremium,
        usersBanned,
      });
    } catch (err) {
      console.log("Error ocurred in ADMIN INFO");
      res.status(404).json({ message: "Error ocurred in ADMIN INFO" });
    }
  },
  PUT: async (req, res) => {
    const { adminId, userId, reason } = req.body;

    if (!adminId || !userId || !reason) {
      return res.status(404).json({ message: "User info is required" });
    }

    try {
      const admin = User.findOne({ _id: adminId, role: "ADMIN" });
      if (!admin) {
        return res.status(404).json({ message: "Access Denied" });
      }

      interface IReasons {
        BAN(): { statusAccount: string };
        DESBAN(): { statusAccount: string };
        ADMIN(): { role: string };
        USER(): { role: string };
      }

      const reasons: IReasons = {
        BAN: () => {
          return { statusAccount: "BANNED" };
        },
        DESBAN: () => {
          return { statusAccount: "ACTIVE" };
        },
        ADMIN: () => {
          return { role: "ADMIN" };
        },
        USER: () => {
          return { role: "USER" };
        },
      };

      if (
        typeof reason === "string" &&
        (reason === "BAN" ||
          reason === "DESBAN" ||
          reason === "ADMIN" ||
          reason === "USER")
      ) {
        await User.findOneAndUpdate({ _id: userId }, reasons[reason]());
        res.status(200).json({ message: `${reason} was realized` });
      }
    } catch (err) {
      console.log(err);

      return res
        .status(404)
        .json({ message: "ERROR OCURRED IN PUT USER INFO BY ADMIN" });
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
    if ((method && method === "GET") || method === "PUT") {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}
