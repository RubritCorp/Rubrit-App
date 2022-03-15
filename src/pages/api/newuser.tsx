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
      email: "elianasciclone@gmail.com",
      name: "Eliana Sciclone",
      phone: {
        diallingCode: "+54",
        number: "1144362868",
      },
      password: "milanesaconpure27",
      description:
        "Arquitectura en general. Documentación y dirección de obras. Reformas.",
      authCode: "",
      withProvider: false,
      isAuthenticated: true,
      profilePic:
        "https://ca.slack-edge.com/TPRS7H4PN-U01M0BP7CQJ-416c76e76358-512",
      isWorker: true,
      isPremium: true,
      payerId: "",
      address: {
        name: "Arengreen 805, CABA, Argentina",
        city: "CABA",
        country: "Argentina",
        lat: -34.6111947,
        lng:-58.4461956,
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
          userComment: "6230c17a5fbcf2faa57644db",
          description: "Remodeló mi baño y cocina. Me encantó el diseño y trabaja de manera muy profesional",
          score: "4",
        },
      ],
      workerData: {
        images: ["https://www.paperarquitectura.com.ar/wp-content/uploads/elementor/thumbs/DSC_0610-scaled-pd7py4uy3eqjm29qgbu45vpcu3oznbj0v4lpzgfp1k.jpg", "https://www.paperarquitectura.com.ar/wp-content/uploads/elementor/thumbs/IMG_20210817_173234_1-pd7s2j6pknbj93aqccohtlo2zj4z9otmp9gg735rbc.jpg"],
        certification: [],
        rangeCoverage: 50,
        items: [
          {
            category: "622648aff10679f2a1cc6a39",
            subcategories: [
              "62163cc34e1f963fce2d7b15",
              "62163cc94e1f963fce2d7b17",
              "62163ccd4e1f963fce2d7b19",
              "62163cd14e1f963fce2d7b1b"
            ],
          },
          {
            category: "62256f724f48774b0a18a8bf",
            subcategories: ["621640ca4e1f963fce2d7bfa", "621640ca4e1f963fce2d7bfb"],
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