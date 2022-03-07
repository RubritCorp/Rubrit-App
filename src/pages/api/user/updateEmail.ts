//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//models
import User from "models/User";
//interface
import { IUser } from "models/User/IUser";
//db
import "utils/db";
import { hashCode, verifyPassword } from "utils/verifyPassword";
import { SMTPClient } from "emailjs";

interface ICases {
  PUT(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUpdate {
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
  PUT: async (req, res) => {
    const { email, newEmail, password } = req.body;

    try {
    } catch (err) {
      res.status(404).json({ message: "Error ocurred in UPDATE EMAIL" });
    }
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await verifyPassword(password, user.password);

    if (!isValid)
      return res.status(404).json({ message: "Password is not valid" });

    const verification = await User.findOne({ email: newEmail });

    if (verification)
      return res.status(404).json({ message: "User already exists" });

    const createCode = () => {
      return Math.floor(
        Math.random() *
          (Number(process.env.MAX) - Number(process.env.MIN) + 1) +
          Number(process.env.MIN)
      );
    };

    var code = createCode().toString();

    user.email = newEmail;
    user.authCode = await hashCode(code);
    user.save();

    const client: any = new SMTPClient({
      user: process.env.EMAIL_SENDER,
      password: process.env.EMAIL_PASSWORD,
      host: "smtp.gmail.com",
      ssl: true,
    });

    client.send(
      {
        text: "¡Gracias por registrarse en Rubrit App!",
        from: process.env.EMAIL_SENDER,
        to: newEmail,
        subject: "Verificacion de la cuenta",
        attachment: [
          {
            data: `<h1>Confirmacion de Email</h1><h2>Hola de nuevo</h2>         
            <p>¡Hemos detectado que decidio modificar su correo electronico!. Porfavor confirma tu email clickeando en el siguiente link!</p>         
            <a href=${process.env.CALLBACK_REDIRECT_EMAIL_AUTH}code=${code}&email=${newEmail}> Click aquí</a></div>`,
            alternative: true,
          },
        ],
      },
      (err: any, message: any) => {
        res.status(404).json({ message: "Error sending email" });
      }
    );

    res.status(200).json({ message: "Profile Description was modified", user });
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
