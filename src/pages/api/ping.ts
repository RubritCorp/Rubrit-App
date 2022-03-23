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
  user?: any;
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
const date = new Date();

const cases: ICases = {
  GET: async (req, res) => {
    const f = [
      {
        email: "franciscoRuiz@gmail.com",
        name: "Francisco Ruiz",
        phone: {
          diallingCode: "+54",
          number: "3541584265",
        },
        password: "12345678Ac",
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
          name: "Av. Vélez Sarsfield, Córdoba, Argentina",
          city: "Córdoba",
          country: "Argentina",
          lat: -31.4198349,
          lng: -64.1881822,
          searchRange: 30,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Español",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6230b9925fbcf2faa5764432",
            description: "Increible Resolución de problemas, un gran albañil.",
            score: 4,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          },
        ],
        workerData: {
          images: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          certification: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
          ],
          rangeCoverage: 50,
          items: [
            {
              category: "622516a44f48774b0a18a864",
              subcategories: [
                "62163eed4e1f963fce2d7bb9",
                "62163ef44e1f963fce2d7bbb",
                "62163ef84e1f963fce2d7bbd",
              ],
            },
            {
              category: "622544764f48774b0a18a884",
              subcategories: [
                "62163cd64e1f963fce2d7b1d",
                "62163ce04e1f963fce2d7b1f",
                "62163ce74e1f963fce2d7b21",
              ],
            },
            {
              category: "622539704f48774b0a18a876",
              subcategories: [
                "62163eed4e1f963fce2d7bb9",
                "62163ef44e1f963fce2d7bbb",
                "62163ef84e1f963fce2d7bbd",
              ],
            },
          ],
        },
        requests: {
          received: [],
          send: [],
        },
      },
      /**/
      {
        email: "joaquinsaad@gmail.com",
        name: "Joaquin Saad",
        phone: {
          diallingCode: "+54",
          number: "3541661100",
        },
        password: "12345678Ac",
        description:
          "Me ocupo de muchos rubros, sin embargo me especializo en el hurto de objetos de valor.",
        authCode: "",
        withProvider: false,
        isAuthenticated: true,
        profilePic:
          "http://nexofm.com.ar/download/multimedia.normal.ace6928d052364a8.6564756172646f5f6e6f726d616c2e706e67.png",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Blvd. San juan, Córdoba, Argentina",
          city: "Córdoba",
          country: "Argentina",
          lat: -31.4202819,
          lng: -64.1893823,
          searchRange: 15,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Español",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6230b9925fbcf2faa5764432",
            description: "Increible Resolución de problemas, un gran ladron.",
            score: 4,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          },
        ],
        workerData: {
          images: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          certification: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
          ],
          rangeCoverage: 50,
          items: [
            {
              category: "622544764f48774b0a18a884",
              subcategories: [
                "62163cd64e1f963fce2d7b1d",
                "62163ce04e1f963fce2d7b1f",
                "62163ce74e1f963fce2d7b21",
              ],
            },
            {
              category: "622548b44f48774b0a18a889",
              subcategories: [
                "62163d074e1f963fce2d7b2f",
                "62163d0c4e1f963fce2d7b31",
                "62163d114e1f963fce2d7b33",
              ],
            },
          ],
        },
        requests: {
          received: [],
          send: [],
        },
      },
      /**/
      {
        email: "nicolasTornau@gmail.com",
        name: "Nicolas Tornau",
        phone: {
          diallingCode: "+54",
          number: "3541885566",
        },
        password: "12345678Ac",
        description:
          "Me ocupo de muchas cosas en realidad, espero que nadie vea esto!.",
        authCode: "",
        withProvider: false,
        isAuthenticated: true,
        profilePic: "https://www.dxtcarlospaz.com/fotos/tornau.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Blvd. San juan, Córdoba, Argentina",
          city: "Córdoba",
          country: "Argentina",
          lat: -31.4213107,
          lng: -64.1891867,
          searchRange: 15,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Español",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6230b9925fbcf2faa5764432",
            description:
              "Increible Resolución de problemas, un hacedor de cosas.",
            score: 5,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          },
        ],
        workerData: {
          images: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          certification: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
          ],
          rangeCoverage: 50,
          items: [
            {
              category: "62254ab24f48774b0a18a88b",
              subcategories: [
                "62163d4e4e1f963fce2d7b3d",
                "62163d514e1f963fce2d7b3f",
                "62163d554e1f963fce2d7b41",
              ],
            },
            {
              category: "62254e324f48774b0a18a88f",
              subcategories: [
                "621640ca4e1f963fce2d7bf4",
                "621640ca4e1f963fce2d7bf5",
                "621640ca4e1f963fce2d7bf6",
              ],
            },
          ],
        },
        requests: {
          received: [],
          send: [],
        },
      },
      /**/
      {
        email: "maikolAlvarezBerrio@gmail.com",
        name: "Maikol Berrio",
        phone: {
          diallingCode: "+54",
          number: "3541986532",
        },
        password: "12345678Ac",
        description: "Soy colombiano, eso significa mucho!.",
        authCode: "",
        withProvider: false,
        isAuthenticated: true,
        profilePic:
          "https://i1.sndcdn.com/avatars-000258854941-8iyicg-t240x240.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Obispo Trejo, Córdoba, Argentina",
          city: "Córdoba",
          country: "Argentina",
          lat: -31.4219514,
          lng: -64.188064,
          searchRange: 15,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Español",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6230b9925fbcf2faa5764432",
            description:
              "Increible Colombiano, nunca vi un colombiano tan colombiano.",
            score: 5,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          },
        ],
        workerData: {
          images: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          certification: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
          ],
          rangeCoverage: 50,
          items: [
            {
              category: "622551f54f48774b0a18a898",
              subcategories: [
                "62163ed64e1f963fce2d7bb1",
                "62163ede4e1f963fce2d7bb3",
                "62163ee34e1f963fce2d7bb5",
              ],
            },
            {
              category: "622555b24f48774b0a18a89e",
              subcategories: [
                "621640ca4e1f963fce2d7beb",
                "621640ca4e1f963fce2d7bec",
                "621640ca4e1f963fce2d7bed",
              ],
            },
          ],
        },
        requests: {
          received: [],
          send: [],
        },
      },
      /**/
      {
        email: "mateoBoutet@gmail.com",
        name: "Mateo Boutet",
        phone: {
          diallingCode: "+54",
          number: "35418799525",
        },
        password: "12345678Ac",
        description:
          'Soy organiz<ador de eventos desde que naci, mi primera palabra fue "Fiesta de 15!"!.',
        authCode: "",
        withProvider: false,
        isAuthenticated: true,
        profilePic:
          "https://i0.wp.com/racal.es/imagenes/academicos/academicos/sahuquillo-letra-m.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Duarte Quiros, Córdoba, Argentina",
          city: "Córdoba",
          country: "Argentina",
          lat: -31.4195929,
          lng: -64.1860238,
          searchRange: 15,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Español",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6230b9925fbcf2faa5764432",
            description: "Increible Eventero.",
            score: 1,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          },
        ],
        workerData: {
          images: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          certification: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
          ],
          rangeCoverage: 50,
          items: [
            {
              category: "622558314f48774b0a18a8a0",
              subcategories: [
                "62163e214e1f963fce2d7b75",
                "62163e254e1f963fce2d7b77",
                "62163e2a4e1f963fce2d7b79",
              ],
            },
            {
              category: "62255a3d4f48774b0a18a8a2",
              subcategories: [
                "621640ca4e1f963fce2d7bdc",
                "62163d7c4e1f963fce2d7b49",
                "621640ca4e1f963fce2d7bde",
              ],
            },
            {
              category: "622561e14f48774b0a18a8a8",
              subcategories: [
                "621640ca4e1f963fce2d7bef",
                "621640ca4e1f963fce2d7bf0",
                "621640ca4e1f963fce2d7bf1",
              ],
            },
          ],
        },
        requests: {
          received: [],
          send: [],
        },
      },
    ];

    try {
      /* f.map(async (f) => {
        await User.findOneAndUpdate(
          {
            email: f.email,
          },
          {
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
            rating: [...f.rating],
            workerData: { ...f.workerData },
            requests: { ...f.requests },
          }
        );
      }); */
      /* const user = await User.findOneAndUpdate(
        { email: "workeraguscastro2014.ac@gmail.com" },
        {
          ["workerData.images"]: [
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
          ],
          ["workerData.certification"]: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
          ],
        }
      ); */
      /* const user = await User.findOneAndUpdate(
        { email: "workeraguscastro2014.ac@gmail.com" },
        {
          rating: [
            {
              userComment: "6230b9925fbcf2faa5764432",
              description:
                "Increible Resolución de problemas, un gran albañil.",
              score: "4",
            },
          ],
        }
      ); */
      /*  const user = await User.findOneAndUpdate(
        { email: "workeraguscastro2014.ac@gmail.com" },
        {
          ["workerData.certification"]: [
            "https://i.pinimg.com/474x/e7/6d/a9/e76da988b07eaac05eda92daa82b78b8.jpg",
            "https://relubquim.com.ec/wp-content/uploads/2019/11/C01.jpg",
            "https://i.ytimg.com/vi/V6yZ8i3qyVo/hqdefault.jpg",
            "https://i.pinimg.com/originals/d5/72/29/d57229598b64b80f4c50ddd23e53dddd.jpg",
            "https://www.tapicerobarato.com/wp-content/gallery/trabajos-de-tapiceria/trabajos-de-tapiceria-37.jpg",
            "http://tapisseriarapit.com.otrarroba.com/sites/default/files/Tapisseria_Rapit-funda-sofa_01.jpg",
            "https://imagenes.cordobavende.com/medianas/3c43fab0d0b03fad4712a70f6ec1a034-1.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_863179-MLA29071459315_122018-O.jpg",
            "https://i.pinimg.com/474x/d3/65/50/d36550ea1b17394f63c2dff243fe636d.jpg",
            "http://pm1.narvii.com/7119/b0abdf491cffde4bdf95850956c1b15a5591a4b5r1-712-707v2_uhq.jpg",
          ],
        }
      ); */

      /*  const user = await User.find().updateMany({}, [
        {
          $unset: ["userType"],
        },
      ]); */

      const user = await User.find().updateMany(
        {},
        {
          statusAccount: "ACTIVE",
        }
      );

      /* user.map(async (m) => {
        m.role = "USER";
        m.save();
      }); */
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
