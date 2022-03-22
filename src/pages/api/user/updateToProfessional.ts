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
    const {
      _id,
      certification,
      services,
      description,
      shortDescription,
      categories,
      serviceRange,
    } = req.body;

    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isWorker = true;
    user.description = description;
    user.workerData.shortDescription = shortDescription;
    user.workerData.rangeCoverage = serviceRange.rangeCoverage;
    user.address.city = serviceRange.city;
    user.address.name = serviceRange.addressName;
    user.address.lat = serviceRange.lat;
    user.address.lng = serviceRange.lng;
    if (certification.length) {
      user.workerData.certification = [...certification];
    }
    if (services.length) {
      user.workerData.images = [...services];
    }
    if (Object.keys(categories).length > 0) {
      let formattedData: any = [];
      for (let e in categories) {
        formattedData.push({ category: e, subcategories: [...categories[e]] });
      }
      user.workerData.items = [...formattedData];
    }
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
