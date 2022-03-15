//from modules
import { NextApiRequest, NextApiResponse } from "next";

//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import { TrendUp } from "phosphor-react";


interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUser {
  message: string;
  user?: IUser;
}

interface DataError {
  message: string;
}

interface DataAccesDenied {
  message: string;
}

const cases: ICases = {
  GET: async (req, res) => {
    const user = [

      {
        email: "juanferreyra@gmail.com",
        name: "Juan Antonio Ferreyra",
        phone: {
          diallingCode: "54011",
          number: "34654890"
        },
        password: "frdgsgdvwd",
        description: "Instalaciones sanitarias integrales",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic: "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_3.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield 2334",
          city: "Córdoba",
          country: "Argentina",
          lat:-31.4198303,
          lng:-64.1903709,
          searchRange: 15,
          timeZone: ""
          },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "",
          hideAddress:false
            },
        rating: [
          {
            userComment: "6228a29573a25fac4658ef8e",
            description: "Cambió los desagues del baño. Cumplidor y prolijo para trabajar",
            score: "4",
          },
        ],
        workerData: {
          companyName: "Sani Tario",
          description: "Soy el mejor instalando inodoros",
          images: ["https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/plomeria/plomeria_2.jpg"]
        },
        items: [
          {
            category: "62254be64f48774b0a18a88d",
            subcategories: ["62163e5b4e1f963fce2d7b93", "62163e604e1f963fce2d7b95"],
            description: "Instalaciones domicilarias y empresariales. Reparaciones e instalaciones en general. Cambio de desagues, cañerias de agua fría y caliente",
            certification: [""],
          }
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      
      {
        email: "julian_melianz@gmail.com",
        name: "Julian Melianza",
        phone: {
          diallingCode: "0342",
          number: "45436790"
        },
        password: "soyelmejor45",
        description: "Aire Acondicionado y Climatización",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic: "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_1.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield 2334",
          city: "Córdoba",
          country: "Argentina",
          lat:-31.4198303,
          lng:-64.1903709,
        searchRange: 10,
        timeZone: ""
        },
        preferences: {
        notificationsMessages: true,
        notificationsNewOffer: true,
        showAllChats: true,
        language: "Ingles",
        hideAddress:false
          },
          rating: [
            {
              userComment: "6228a29573a25fac4658ef8e",
              description: "Instaló 2 split. Muy recomendable",
              score: "",
            },
          ],
          workerData: {
            companyName: "Superair",
            description: "Soy el mejor instalando splits",
            images: ["https://quimservice.com/wp-content/uploads/2013/10/aire-acondicionado.jpg"]
          },
        items: [
          {
            category: "622648ac45463523440a7604", subcategories: ["62163c604e1f963fce2d7af9"],
            description: "Sistemas de refrigeración y calefacción",
            certification: [""]
          }
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
  },
    
      {
        email: "joaquin_romero@gmail.com",
        name: "Joaquin Romero",
        phone: {
          diallingCode: "54011",
          number: "23345502"
        },
        password: "joaco5467",
        description: "Albañil de oficio, hago reparaciones y reformas",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic: "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_9.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield 2334",
          city: "Córdoba",
          country: "Argentina",
          lat:-31.4198303,
          lng:-64.1903709,
        searchRange: 10,
        timeZone: ""
        },
        preferences: {
        notificationsMessages: true,
        notificationsNewOffer: true,
        showAllChats: true,
        language: "Guarani",
        hideAddress:false
          },
          rating: [
            {
              userComment: "6228a29573a25fac4658ef8e",
              description: "Demolió una pared y levantó 2 nuevas. Colocó una puerta. Hizo bien el trabajo aunque tardó mucho",
              score: "",
            },
          ],
          workerData: {
            companyName: "",
            description: "Soy el mejor demoliendo paredes",
            images: ["http://www.sanjosedelvalle.es/wp-content/uploads/2018/06/Imagen-de-Albaniles-en-Sevilla-05-768x512.jpg"]
          },
        items: [
          {
            category: "622516a44f48774b0a18a864", subcategories: ["62163c704e1f963fce2d7afd", "62163c7d4e1f963fce2d7aff"],
            description: "Arreglo y construccion de todo tipo de obras",
            certification: [""]
          }
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
  },
]

    try {
        user.forEach(async(f:any)=> await User.create({ email: f.email, name: f.name, phone: {diallingCode:f.phone.diallingCode, number:f.phone.number}, password: f.password, description: f.description, authCode: f.authCode, withProvider: true, isAuthenticated: true, profilePic: f.profilePic, isWorker: true, isPremium: f.isPremium, payerId: f.payerId, address: {...f.address}, preferences: {...f.preferences}, rating: {...f.rating}, items: [...f.items], offers: [...f.offers]}))
  res.status (200).json({message: "El Tomy se la come"})
    }catch(error){res.status (404)}
},
  
  ERROR: (_, res) => {
    res.status(400).json({ message: "Error, method is invalid!" });
  },
};

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<DataAccesDenied>
) {
  
    const { method } = req;
    if (
      method &&
      (method === "GET")
    ) {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } 
