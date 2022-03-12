//from modules
import { NextApiRequest, NextApiResponse } from "next";
//interfaces
import { IUser } from "models/User/IUser";
import User from "models/User";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUsers>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

type DataUsers = {
  message: string;
  users?: IUser[];
};

type DataError = {
  message: string;
};

const cases: ICases = {
  GET: async (req, res) => {
    const { city } = req.query;

    try {
      const populateQuery = [
        {
          path: "items.category",
          model: "Category",
          select: "_id name picture_small",
        },
        {
          path: "items.subcategories",
          model: "Subcategory",
          select: "_id name",
        },
      ];

      const filterFindAllUsers = {
        isWorker: true,
        isAuthenticated: true,
        ["address.name"]: new RegExp("Cordoba"),
      };

      const filterFindByCity = {
        isWorker: true,
        isAuthenticated: true,
        ["address.name"]: new RegExp(`${city}`),
      };

      const users = await User.find(
        city ? filterFindByCity : filterFindAllUsers
      )
        .select(
          "-address.timeZone -preferences.notificationsMessages -preferences.notificationsNewOffer -preferences.showAllChats -preferences.language -password -updatedAt -offers -withProvider -authCode -isAuthenticated -payerId"
        )
        .populate(populateQuery);

      res.status(200).json({ message: "EA", users });
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
