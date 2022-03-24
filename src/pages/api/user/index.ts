//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import { verifyPassword } from "utils/verifyPassword";
import { SMTPClient } from "emailjs";

interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
  PUT(req: NextApiRequest, res: NextApiResponse<DataUser>): void;
  DELETE(req: NextApiRequest, res: NextApiResponse<DataDeleteUser>): void;
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
  POST: async (req, res) => {
    const { email, name, profilePic } = req.body;

    try {
      const userVerification = await User.findOne({ email: email });

      if (userVerification) {
        res.status(200).json({ message: "Welcome", user: userVerification });
        return;
      }
      const user = await User.create({
        name,
        email,
        profilePic,
      });
      res.status(200).json({ message: "User created successfully", user });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error fetching data" });
    }
  },
  PUT: async (req, res) => {
    const { email, name, address, phone, image } = req.body;

    console.log(req.body)
    if (!email) return res.status(404).json({ message: "Email is required" });

    try {
      const user = await User.findOne({ email: email });

      if (!user) return res.status(404).json({ message: "User not found" });

      if (image) {
        user.profilePic = image;
        user.save();
        res.status(200).json({ message: "Photo was modified", user });
      } else {
        user.name = name;
        user.address = address;
        user.phone = phone;
        user.save();
        res.status(200).json({ message: "User was modified", user });
      }
    } catch (err) {
      res.status(404).json({ message: "Error was ocurred" });
    }
  },
  DELETE: async (req, res) => {
    const { reasons, email, password } = req.query;

    if (!reasons || !email || !password) {
      res.status(404).json({ message: "Data is required" });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isValid = await verifyPassword(`${password}`, user.password);
      if (!isValid) {
        return res.status(404).json({ message: "Password does not match" });
      }

      const client: any = new SMTPClient({
        user: process.env.EMAIL_SENDER,
        password: process.env.EMAIL_PASSWORD,
        host: "smtp.gmail.com",
        ssl: true,
      });

      client.send(
        {
          text: "¡Hoy es un día triste!",
          from: email,
          to: process.env.EMAIL_SENDER,
          subject: "Un usuario ha eliminado su cuenta de nuestros servidores",
          attachment: [
            {
              data: `
              <div style="width:40rem"><div style="backgroundColor:#2EB67D"><h1 style="color:black;fontWeight:700;fontSize:large">¡Hoy es un día triste!</h1></div><p>Lamento Informarle a todo el equipo de desarrolladores que un usuario ha decidido dar de baja su cuenta en la aplicación de Rubrit App, consideremos esto como una oportunidad para mejorar y brindar un mejor serivicio, a continuación podran encontrar las razones por las cuales ha ocurrido esto :</p><ul>${JSON.parse(
                `${reasons}`
              ).map((m: string) => `<li>${m}</li>`)}</ul>
              </div>`,
              alternative: true,
            },
          ],
        },
        (err: any, message: any) => {
          res.status(404).json({ message: "Error sending email" });
        }
      );
      await User.deleteOne({ email: email });
      res.status(200).json({ message: "User was deleted" });
    } catch (err) {
      console.log("Error ocurred in DELETE USER");
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
  const session = await getSession({ req });
  if (session) {
    const { method } = req;
    if (
      method &&
      (method === "POST" || method === "DELETE" || method === "PUT")
    ) {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}
