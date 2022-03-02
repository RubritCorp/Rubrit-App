//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { SMTPClient } from "emailjs";
//interface
import { IUser } from "models/User/IUser";
//model
import User from "models/User";
//utils
import { hashPassword, hashCode } from "utils/verifyPassword";
import "utils/db";

interface DataSignUp {
  message: string;
  user?: IUser;
}

interface DataError {
  message: string;
}

interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataSignUp>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  POST: async (req, res) => {
    const { name, email, password, phone, withProvider } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(422).json({ message: "Invalid Data" });
    }
    try {
      const validate = await User.findOne({ email: email });

      if (validate) {
        res.status(422).json({ message: "User already exists" });
      }

      const createCode = () => {
        return Math.floor(
          Math.random() *
            (Number(process.env.MAX) - Number(process.env.MIN) + 1) +
            Number(process.env.MIN)
        );
      };

      var code = createCode().toString();

      const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
        phone,
        authCode: await hashCode(code),
        isAuthenticated: false,
        withProvider,
      });

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
          to: email,
          subject: "Verificacion de la cuenta",
          attachment: [
            {
              data: `<h1>Confirmacion de Email</h1><h2>Hola ${name}</h2>         
              <p>¡Gracias por registrarse en Rubrit App!. Porfavor confirma tu email clickeando en el siguiente link!</p>         
              <a href=${process.env.CALLBACK_REDIRECT_EMAIL_AUTH}code=${code}&email=${email}> Click aquí</a></div>`,
              alternative: true,
            },
          ],
        },
        (err: any, message: any) => {
          res.status(404).json({ message: "Error sending email" });
        }
      );

      res.status(200).json({ message: "User created", user });
    } catch (err) {
      console.log("Error in POST USER");
      console.log(err);
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: "Invalid Method" });
  },
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === "POST") {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
