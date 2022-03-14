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

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
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
    const user = [
      {
        email: "Josecarloss@gmail.com",
        name: "Juan Jose Cito",
        phone: {
          diallingCode: "54011",
          number: "34567890",
        },
        password: "frdgsgdvwd",
        description: "Instalaciones sanitarias integrales",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_3.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Cambió los desagues del baño. Cumplidor y prolijo para trabajar",
            score: "",
          },
        ],
        items: [
          {
            category: "62254be64f48774b0a18a88d",
            subcategories: [
              "62163e5b4e1f963fce2d7b93",
              "62163e604e1f963fce2d7b95",
            ],
            description:
              "Instalaciones domicilarias y empresariales. Reparaciones e instalaciones en general. Cambio de desagues, cañerias de agua fría y caliente",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },

      {
        email: "jjuanpeeepee@gmail.com",
        name: "Julian Pepe par",
        phone: {
          diallingCode: "0342",
          number: "45887890",
        },
        password: "soyelmejor45",
        description: "Aire Acondicionado y Climatización",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_1.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Ingles",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6228a29573a25fac4658ef8e",
            description: "Instaló 2 split. Muy recomendable",
            score: "",
          },
        ],
        items: [
          {
            category: "622648ac45463523440a7604",
            subcategories: ["62163c604e1f963fce2d7af9"],
            description: "Sistemas de refrigeración y calefacción",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },

      {
        email: "joaquinffffernandez@gmail.com",
        name: "Joaquin Fernandez",
        phone: {
          diallingCode: "54011",
          number: "23459902",
        },
        password: "joaco5467",
        description: "Albañil de oficio, hago reparaciones y reformas",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_9.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Guarani",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Demolió una pared y levantó 2 nuevas. Colocó una puerta. Hizo bien el trabajo aunque tardó mucho",
            score: "",
          },
        ],
        items: [
          {
            category: "622516a44f48774b0a18a864",
            subcategories: [
              "62163c704e1f963fce2d7afd",
              "62163c7d4e1f963fce2d7aff",
            ],
            description: "Arreglo y construccion de todo tipo de obras",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "amalia_kkakaatz@gmail.com",
        name: "Amalia Katz",
        phone: {
          diallingCode: "0345",
          number: "11139902",
        },
        password: "malina567",
        description: "Interiorismo y decoración. Diseños personalizados",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/mujer_1.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
          timeZone: "GTM 03",
        },
        preferences: {
          notificationsMessages: true,
          notificationsNewOffer: true,
          showAllChats: true,
          language: "Ingles",
          hideAddress: false,
        },
        rating: [
          {
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Remodeló mi monoambiente. Quedé muy contenta con el trabajo",
            score: "",
          },
        ],
        items: [
          {
            category: "62256f724f48774b0a18a8bf",
            subcategories: [
              "62163dfa4e1f963fce2d7b67",
              "62163e044e1f963fce2d7b6b",
            ],
            description: "Diseñadora de interiores",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "juana_mariajauan@gmail.com",
        name: "Juana Maria Borg",
        phone: {
          diallingCode: "54011",
          number: "39367577",
        },
        password: "juanima27",
        description: "Yoga y Terapia armonizante",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/mujer_2.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description: "Hice terapia de cuencos y Reiki. Me gustó",
            score: "",
          },
        ],
        items: [
          {
            category: "6226574645463523440a7605",
            subcategories: ["62163d024e1f963fce2d7b2d"],
            description: "Profesora de Yoga terapias corporales",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },

      {
        email: "tumudanza_ceressstz@gmail.com",
        name: "Ignacio Ceretz",
        phone: {
          diallingCode: "54011",
          number: "11234576",
        },
        password: "nacho2250",
        description: "Servicios de mudanzas llave en mano",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_13.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description: "Muy atentos en los detalles. Los recomiendo.",
            score: "",
          },
        ],
        items: [
          {
            category: "622561e14f48774b0a18a8a8",
            subcategories: [
              "621640ca4e1f963fce2d7bf3",
              "621640ca4e1f963fce2d7bf1",
              "621640ca4e1f963fce2d7bf2",
            ],
            description:
              "Traslados y mudanzas de muebles. Fletes. Equipo de trabajo 24 hs. Atendemos urgencias",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "elvira_eveveventos@gmail.com",
        name: "Elvira Masdad",
        phone: {
          diallingCode: "0341",
          number: "15674776",
        },
        password: "elvimas88",
        description: "Eventos y Catering",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/mujer_10.jpg",
        isWorker: true,
        isPremium: false,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Muy profesional, organizó perfectamente el Bar Mitzvá de mi hijo.",
            score: "",
          },
        ],
        items: [
          {
            category: "622558314f48774b0a18a8a0",
            subcategories: [
              "62163e214e1f963fce2d7b75",
              "62163e3b4e1f963fce2d7b83",
              "62163e314e1f963fce2d7b7d",
            ],
            description:
              "Organizamos tu evento. Todo lo que necesitas para tu fiesta. Cumpleaños, casamientos, Bar Mitzvá. Servicio de catering",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "juan_berazasategui@gmail.com",
        name: "Juan Antonio Berazategui",
        phone: {
          diallingCode: "54011",
          number: "19854776",
        },
        password: "beraza6754",
        description: "Herrero artístico y de obra",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_14.jpg",
        isWorker: true,
        isPremium: false,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description: "Hizo un portón para mi casa. Trabajo muy prolijo",
            score: "",
          },
        ],
        items: [
          {
            category: "622551f54f48774b0a18a898",
            subcategories: [
              "62163ed64e1f963fce2d7bb1",
              "62163ede4e1f963fce2d7bb3",
              "62163ee84e1f963fce2d7bb7",
            ],
            description:
              "Trabajos profesionales.Asesoramiento y presupuestos para profesionales de la construcción y particulares. Rejas, portones, trabajos a medida, herrería decorativa",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "juliana_dosssminguez@gmail.com",
        name: "Giuliana Dominguez",
        phone: {
          diallingCode: "54011",
          number: "23450098",
        },
        password: "giuli8976",
        description: "Tratamientos estéticos y corporales",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/mujer_3",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Realicé un tratamiento de peeling. Pero tuve una reacción alérgica",
            score: "",
          },
        ],
        items: [
          {
            category: "622544764f48774b0a18a884",
            subcategories: [
              "62163cd64e1f963fce2d7b1d",
              "62163ce04e1f963fce2d7b1f",
              "62163ced4e1f963fce2d7b25",
            ],
            description:
              "Belleza integral. Ambos sexos. Tratamientos estéticos faciales y corporales, peeling, dermoabrasión, limpieza de cutis, ondas rusas, electrodos.",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },

      {
        email: "guau_wassssh@gmail.com",
        name: "Milo Reznik",
        phone: {
          diallingCode: "54011",
          number: "23453345",
        },
        password: "milomano2345",
        description: "Atendemos a tu mascota con amor",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_5.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Llevé a mi perro Tango a la peluquería canina. Excelente atención y quedó divino!",
            score: "",
          },
        ],
        items: [
          {
            category: "622555b24f48774b0a18a89e",
            subcategories: [
              "621640ca4e1f963fce2d7beb",
              "621640ca4e1f963fce2d7bec",
              "621640ca4e1f963fce2d7bed",
            ],
            description:
              "Todo para tu mascota, peluqueria canina, petshop. Atendemos de 9 a 20hs. comunicate y pedi tu presupuesto!",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "silvinoparaaaaguay@gmail.com",
        name: "Silvino Avalos",
        phone: {
          diallingCode: "54011",
          number: "33456789",
        },
        password: "paragua4533",
        description: "Pinto casas",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_4.jpg",
        isWorker: true,
        isPremium: false,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Llevé a mi perro Tango a la peluquería canina. Excelente atención y quedó divino!",
            score: "",
          },
        ],
        items: [
          {
            category: "622555b24f48774b0a18a89e",
            subcategories: [
              "621640ca4e1f963fce2d7beb",
              "621640ca4e1f963fce2d7bec",
              "621640ca4e1f963fce2d7bed",
            ],
            description:
              "Todo para tu mascota, peluqueria canina, petshop. Atendemos de 9 a 20hs. comunicate y pedi tu presupuesto!",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "tujardinnnn@gmail.com",
        name: "Etelvina Rodriguez",
        phone: {
          diallingCode: "54011",
          number: "87665123",
        },
        password: "ethelrojo22",
        description: "Vivi a pleno tu espacio verde. Si no existe, crealo",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/mujer_4.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Rediseñó mi triste balcón y ahora es el ambiente de mi casa que más disfruto!",
            score: "",
          },
        ],
        items: [
          {
            category: "62255a3d4f48774b0a18a8a2",
            subcategories: [
              "621640ca4e1f963fce2d7bdc",
              "62163d7c4e1f963fce2d7b49",
              "621640ca4e1f963fce2d7bde",
            ],
            description:
              "Tu jardin o terraza es unico. Dejalo en nuestras manos. Rediseñamos y creamos espacio verde. Llamanos, podemos asesorarte",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "tapiceeeeeros3344@gmail.com",
        name: "Omar Sanchez",
        phone: {
          diallingCode: "54011",
          number: "83577123",
        },
        password: "omiythar",
        description: "Renova tus sillas y sillones",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_15.jpg",
        isWorker: true,
        isPremium: true,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description: "Retapizó mis sillas, quedaron muy lindas",
            score: "",
          },
        ],
        items: [
          {
            category: "622568214f48774b0a18a8ae",
            subcategories: ["621640ca4e1f963fce2d7c03"],
            description:
              "Ahora podes renovar tu muebles. Llamame. Trabajamos con cuero ecologico y las mejores telas de tapiceria. Surtidos de colores y terminaciones. Enviame fotos de lo que quieras renovar y te brindare mi asesoramiento",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
      {
        email: "plagaaaa_control@gmail.com",
        name: "Julio Minio",
        phone: {
          diallingCode: "54011",
          number: "21340967",
        },
        password: "pie_talo78",
        description: "Fumigaciones y control de plagas. Atendemos a consorcios",
        authCode: "",
        withProvider: true,
        isAuthenticated: true,
        profilePic:
          "https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/profile-pics/hombre_16.jpg",
        isWorker: true,
        isPremium: false,
        payerId: "",
        address: {
          name: "Avenida Vélez Sarsfield, Córdoba, Argentina",
          lat: -31.4198303,
          lng: -64.1903709,
          searchRange: 25,
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
            userComment: "6228a29573a25fac4658ef8e",
            description:
              "Eliminó la colonia de cucarachas que tenía en mi cocina",
            score: "",
          },
        ],
        items: [
          {
            category: "62256a754f48774b0a18a8b5",
            subcategories: ["62163d8b4e1f963fce2d7b4d"],
            description:
              "Desratizacion y fumigacion. Efectividad garantizada o le devolvemos su dinero",
            certification: [""],
          },
        ],
        offers: ["622a9f3ed4d886b45ace0141"],
      },
    ];

    try {
      user.forEach(
        async (f: any) =>
          await User.create({
            email: f.email,
            name: f.name,
            phone: {
              diallingCode: f.phone.diallingCode,
              number: f.phone.number,
            },
            password: f.password,
            description: f.description,
            authCode: f.authCode,
            withProvider: true,
            isAuthenticated: true,
            profilePic: f.profilePic,
            isWorker: true,
            isPremium: f.isPremium,
            payerId: f.payerId,
            address: { ...f.address },
            preferences: { ...f.preferences },
            rating: { ...f.rating },
            items: [...f.items],
            offers: [...f.offers],
          })
      );
      res.status(200).json({ message: "El Tomy se la come" });
    } catch (error) {
      res.status(404);
    }
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
  if (method && method === "GET") {
    return cases[method](req, res);
  }
  return cases["ERROR"](req, res);
}
