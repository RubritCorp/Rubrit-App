//from modules
import { NextApiRequest, NextApiResponse } from "next";
//models
import User from "models/User";
//db
import "utils/db";
import {
  hashCode,
  hashPassword,
  verifyCode,
  verifyPassword,
} from "utils/verifyPassword";
import { SMTPClient } from "emailjs";

interface ICases {
  PUT(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  POST(req: NextApiRequest, res: NextApiResponse<DataUpdate>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataUpdate {
  message: string;
}

interface DataError {
  message: string;
}

const createCode = () => {
  return Math.floor(
    Math.random() * (Number(process.env.MAX) - Number(process.env.MIN) + 1) +
      Number(process.env.MIN)
  );
};

const cases: ICases = {
  POST: async (req, res) => {
    const { email, code, password, newPassword } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          message: "No pudimos encontrar el usuario, intentalo de nuevo",
        });
      }

      if (code) {
        const isValid = await verifyCode(code, user.authCode);

        if (!isValid) {
          return res
            .status(400)
            .json({ message: "El codigo provisto es invalido" });
        }
      } else if (password) {
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          return res
            .status(400)
            .json({ message: "La contraseña provista es invalida" });
        }
      }

      var randomCode = createCode().toString();
      user.authCode = await hashCode(randomCode);
      user.password = await hashPassword(newPassword);
      user.save();

      res.status(200).json({ message: "Password is updated" });
    } catch (err) {
      res.status(404).json({ message: "Error ocurred on UPDATE PASSWORD" });
    }
  },
  PUT: async (req, res) => {
    const { email } = req.body;
    const { isAuthenticated } = req.query;

    if (!email) return res.status(404);

    try {
      const user = await User.findOne({ email: email });

      if (!user) return res.status(404);

      var code = createCode().toString();

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
          to: email,
          subject: "Cambio de contraseña",
          attachment: [
            {
              data: `<h1>Cambio de la contraseña</h1><h2>Hola de nuevo</h2>         
            <p>¡Hemos detectado que solicito un cambio de contraseña. Para realizar el cambio ingresa al siguiente enlace!</p>         
            <a href=${
              isAuthenticated
                ? process.env.CALLBACK_REDIRECT_FORGOT_PASSWORD_IS_AUTHENTICATED
                : process.env.CALLBACK_REDIRECT_FORGOT_PASSWORD
            }code=${code}&email=${email}> Click aquí</a></div>`,
              alternative: true,
            },
          ],
        },
        (err: any, message: any) => {
          res.status(404).json({ message: "Error sending email" });
        }
      );
      res.status(200).json({ message: "Email was send" });
    } catch (err) {
      res.status(404);
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: "Error, method is invalid!" });
  },
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && (method === "PUT" || method === "POST")) {
    return cases[method](req, res);
  }
  return cases["ERROR"](req, res);
}
