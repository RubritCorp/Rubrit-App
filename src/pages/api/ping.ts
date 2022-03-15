/* import type { NextApiRequest, NextApiResponse } from "next";
import "utils/db";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: "Pong" });
}
 */

//from modules
import { NextApiRequest, NextApiResponse } from "next";

//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import { TrendUp } from "phosphor-react";
import { hashPassword } from "utils/verifyPassword";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
}

interface DataUser {
  message: string;
  user?: IUser;
}

interface DataDeleteUser {
  message: string;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}

const cases: ICases = {
  GET: async (req, res) => {
    const f = {
      email: "workeraguscastro2014.ac@gmail.com",
      name: "Agustin Castro Trabajador",
      phone: {
        diallingCode: "+54",
        number: "3541661045",
      },
      password: "43366441Ac",
      description:
        "Soy un profesional de la albañileria, sin embargo me dedico tambien a la reparación de aires acondicionados y a la tapiceria de muebles.",
      authCode: "",
      withProvider: false,
      isAuthenticated: true,
      profilePic:
        "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_16.jpg",
      isWorker: true,
      isPremium: true,
      payerId: "",
      address: {
        name: "H. Yrigoyen, Bell Ville, Córdoba, Argentina",
        city: "Córdoba",
        country: "Argentina",
        lat: -32.630832,
        lng: -62.6888761,
        searchRange: 30,
        timeZone: "GTM 03",
      },
      preferences: {
        notificationsMessages: true,
        notificationsNewOffer: true,
        showAllChats: true,
        language: "",
        hideAddress: false,
      },
      rating: [
        {
          userComment: "6230b9925fbcf2faa5764432",
          description: "Increible Resolución de problemas, un gran albañil.",
          score: "4",
        },
      ],
      workerData: {
        images: [],
        certification: [],
        rangeCoverage: 50,
        items: [
          {
            category: "622516a44f48774b0a18a864",
            subcategories: [
              "62163c7d4e1f963fce2d7aff",
              "62163c8b4e1f963fce2d7b01",
              "62163c914e1f963fce2d7b03",
            ],
          },
          {
            category: "622568214f48774b0a18a8ae",
            subcategories: ["621640ca4e1f963fce2d7c03"],
          },
          {
            category: "622648ac45463523440a7604",
            subcategories: [
              "62163c604e1f963fce2d7af9",
              "62163c6a4e1f963fce2d7afb",
              "62163c704e1f963fce2d7afd",
            ],
          },
        ],
      },
      requests: {
        received: [],
        send: [],
      },
    };

    try {
      const user = await User.create({
        email: f.email,
        name: f.name,
        phone: {
          diallingCode: f.phone.diallingCode,
          number: f.phone.number,
        },
        password: await hashPassword(f.password),
        description: f.description,
        authCode: f.authCode,
        withProvider: f.withProvider,
        isAuthenticated: f.isAuthenticated,
        profilePic: f.profilePic,
        isWorker: f.isWorker,
        isPremium: f.isPremium,
        payerId: f.payerId,
        address: { ...f.address },
        preferences: { ...f.preferences },
        rating: { ...f.rating },
        workerData: { ...f.workerData },
        requests: { ...f.requests },
      });

      res.status(200).json({ message: "El Tomy se la come", user });
    } catch (error) {
      console.log(error);

      res.status(404);
    }
  },
};

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<DataAccesDenied>
) {
  const { method } = req;
  if (method && method === "GET") {
    return cases[method](req, res);
  }
}
