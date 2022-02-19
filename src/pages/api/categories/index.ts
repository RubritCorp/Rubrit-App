//from modules
import { NextApiRequest, NextApiResponse } from "next";
//models
import Categorie from "models/Categorie";
//interface
import { ICategorie } from "models/Categorie/ICategorie";
//db
import "utils/db";

type DataCategories = {
  message: string;
  categories?: ICategorie[];
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
      const populateQuery = [
        {
          path: "subcategories",
          model: "Subcategorie",
        },
      ];
      const categories = await Categorie.find().populate(populateQuery);
      if (!categories) {
        res.status(404).json({ message: "Error fetching categories" });
      } else {
        res
          .status(200)
          .json({ message: "Fetching categories succesfully", categories });
      }
    } catch (err) {
      console.log("Error ocurred in GET CATEGORIE");
      //console.log(err);
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
