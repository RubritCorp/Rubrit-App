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
  users?: IUser[];
};

type DataError = {
  message: string;
};

type Props = {
  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;
  unit: string;
};

function distance({ lat1, lon1, lat2, lon2, unit }: Props) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

const cases: ICases = {
  GET: async (req, res) => {
    const { city, lat, lng, searchRange } = req.query;

    if (!city || !lat || !lng || !searchRange)
      return res.status(404).json({ message: "Data is required" });

    try {
      const cityMatch = `${city}`.split(",");

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

      const users = await User.find({
        isWorker: true,
        isAuthenticated: true,
        "preferences.hideAddress": false,
      })
        .select(
          "-address.timeZone -preferences.notificationsMessages -preferences.notificationsNewOffer -preferences.showAllChats -preferences.language -password -updatedAt -offers -withProvider -authCode -isAuthenticated -payerId"
        )
        .populate(populateQuery);

      const nearUsers = users.filter(
        (user: any) =>
          distance({
            lat1: lat,
            lon1: lng,
            lat2: user.address.lat ? user.address.lat : 0,
            lon2: user.address.lng ? user.address.lng : 0,
            unit: "k",
          }) < Number(searchRange)
      );

      res.status(200).json({ message: "Data was fetched", users: nearUsers });
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
