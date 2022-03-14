//from modules
import { NextApiRequest, NextApiResponse } from "next";
import { SMTPClient } from "emailjs";
//from utils
import { hashCode, verifyCode } from "utils/verifyPassword";
//models
import User from "models/User";
import envConfig from "../../../../next-env-config";

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataEmailVerification>): void;
  POST(req: NextApiRequest, res: NextApiResponse): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

interface DataError {
  message: string;
}

interface DataEmailVerification {
  message: string;
}

const cases: ICases = {
  GET: async (req, res) => {
    const { code, email } = req.query;

    console.log(code, email);

    if (!code) {
      res
        .status(400)
        .json({ message: "Se requiere el codigo de verificación" });
    }

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          message: "No pudimos encontrar el usuario, intentalo de nuevo",
        });
      }

      if (user.isAuthenticated === true) {
        return res
          .status(200)
          .json({ message: "Account is already authenticated" });
      }

      const isValid = verifyCode(
        typeof code === "string" ? code : code[0],
        user.authCode
      );

      if (!isValid) {
        return res
          .status(400)
          .json({ message: "El codigo provisto es invalido" });
      }

      user.isAuthenticated = true;
      user.save();
      res.status(200).json({ message: "Account is verified" });
    } catch (err) {
      console.log(err);

      res.status(404).json({ message: "Error ocurred in POST CODE" });
    }
  },
  POST: async (req, res) => {
    const { email } = req.body;

    try {
      const createCode = () => {
        return Math.floor(
          Math.random() *
            (Number(process.env.MAX) - Number(process.env.MIN) + 1) +
            Number(process.env.MIN)
        );
      };

      var code = createCode().toString();

      const user = await User.findOneAndUpdate(
        { email: email },
        {
          authCode: await hashCode(code),
        }
      );

      res.status(200).json({ message: "Email was resended" });
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
              data: `<h1>Confirmacion de Email</h1><h2>Hola ${user.name}</h2>         
              <p>¡Gracias por registrarse en Rubrit App!. Porfavor confirma tu email clickeando en el siguiente link!</p>         
              <a href=${envConfig?.redirectEmailAuth}code=${code}&email=${email}> Click aquí</a></div>`,
              alternative: true,
            },
          ],
        },
        (err: any, message: any) => {
          res.status(404).json({ message: "Error sending email" });
        }
      );
    } catch (err) {
      console.log("Error ocurred in RESEND EMAIL");
      res.status(404).json({ message: '"Error ocurred in RESEND EMAIL"' });
      //console.log(err);
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: "Error fetching data" });
  },
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && (method === "GET" || method === "POST")) {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
