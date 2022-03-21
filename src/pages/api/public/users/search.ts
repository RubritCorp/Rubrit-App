//from modules
import { NextApiRequest, NextApiResponse } from "next";
//interfaces
import User from "models/User";
//db
import "utils/db";
import Category from "models/Category";
import Subcategory from "models/Subcategory";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUsers>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

type DataUsers = {
  message: string;
  users?: any;
};

type DataError = {
  message: string;
};

const cases: ICases = {
  GET: async (req, res) => {
    let { query, city, lat, lng, searchRange } = req.query;

    query = query.toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    try {
      await Category.find();
      await Subcategory.find();
      const populateQuery = [
        {
          path: "workerData.items.category",
          // match: { name: { $eq: 'Albañileria' } },
          model: "Category",
          select: "_id name picture_small",
        },
        {
          path: "workerData.items.subcategories",
          model: "Subcategory",
          select: "_id name",
        },
        
      ];

      let users = await User.find({
        isWorker: true,
        isAuthenticated: true,
        "preferences.hideAddress": false,
      })
      .select(
        "-address.timeZone -preferences.notificationsMessages -preferences.notificationsNewOffer -preferences.showAllChats -preferences.language -password -updatedAt -offers -withProvider -authCode -isAuthenticated -payerId"
      )
      .populate(populateQuery);
      // .find({
      //   $or: [
      //     {
      //       'workerData.items.category.name': query
      //     }
      //   ]
      // });

      users = users.filter(user => hasCategoryOrSubcategory(user, query as string));

      // const nearUsers = users.filter(
      //   (user: any) =>
      //     distance({
      //       lat1: lat,
      //       lon1: lng,
      //       lat2: user.address.lat ? user.address.lat : 0,
      //       lon2: user.address.lng ? user.address.lng : 0,
      //       unit: "k",
      //     }) < Number(searchRange)
      // );

      res.status(200).json({ message: "Data was fetched", users });
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

function hasCategoryOrSubcategory(user: any, query: string) {
  let result = false;
  let re = new RegExp(query + '.*', 'g');
  user.workerData.items.forEach((item: any) => {
    if (item.category.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").match(re)) {
      result = true;
      return;
    } else {
      item.subcategories.forEach((sub: any) => {
        if (sub.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").match(re)) {
          result = true;
          return;
        }
      })
    }
  });
  return result;
}