//from modules
import { NextApiRequest, NextApiResponse } from "next";
//models
import Category from "models/Category";
//interface
import { ICategory } from "models/Category/ICategory";
//db
import "utils/db";
import Subcategory from "models/Subcategory";

type DataCategories = {
  message: string;
  categories?: ICategory[];
};

type DataError = {
  message: string;
};

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataCategories>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  GET: async (_, res) => {
    try {
      await Subcategory.find();
      const populateQuery = [
        {
          path: "subcategories",
          model: "Subcategory",
        },
      ];
      const categories = await Category.find().populate(populateQuery);
      if (!categories) {
        res.status(404).json({ message: "Error fetching categories" });
      } else {
        res
          .status(200)
          .json({ message: "Fetching categories succesfully", categories });
      }
    } catch (err) {
      res.status(404).json({ message: "Error fetching data" });
      console.log("Error ocurred in GET category");
      console.log(err);
    }
  },
  ERROR: (_, res) => res.status(400).json({ message: "Error was ocurred!" }),
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === "GET") {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
