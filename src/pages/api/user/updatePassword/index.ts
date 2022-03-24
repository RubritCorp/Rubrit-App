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
import envConfig from "../../../../../next-env-config";

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
    Math.random() * (Number(envConfig?.MAX) - Number(envConfig?.MIN) + 1) +
      Number(envConfig?.MIN)
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

        const samePassword = await verifyPassword(newPassword, user.password);

        if (samePassword) {
          return res.status(200).json({
            message: "La nueva contraseña no puede ser igual a la anterior!",
          });
        }

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

      if (!user)
        return res.status(404).json({ message: "Error, user does not exist" });

      var code = createCode().toString();

      user.authCode = await hashCode(code);
      user.save();

      const client: any = new SMTPClient({
        user: envConfig?.EMAIL_SENDER,
        password: envConfig?.EMAIL_PASSWORD,
        host: "smtp.gmail.com",
        ssl: true,
      });

      client.send(
        {
          text: "¡Gracias por registrarse en Rubrit App!",
          from: envConfig?.EMAIL_SENDER,
          to: email,
          subject: "Cambio de contraseña",
          attachment: [
            {
              data: `
              <div style="width: 100%;height: 40rem; background-color: #e0e0e0;display: flex;justify-content: center;align-items: center; padding: 0; margin: 0;">
    <div style="max-width: 40rem; height: 90%;background: #fafafa;border-radius: 10px;margin:auto;">
      <div style="display: flex; justify-content: center;">
        <img src="https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/logo-rubritt" alt="'logo" width="235px" height="75px" style="padding: 2rem;margin:auto;"/>
      </div>
      <div style="padding: 2rem;">
        <h1 style="text-align: center;">¡Reforcemos la Seguridad de tu Cuenta!</h1>
        <h3 style="text-align: center;">¡Hola ${
          user.name
        }, es un placer comunicarnos contigo nuevamente!.</h3>
        <div style="height: 1rem; width: 100%;display: flex;justify-content: center;margin:auto;">
          <div style="height: 0.5rem;width: 90%;background-color: #2EB67D;border-radius: 10px;margin:auto;">

          </div>
        </div>
        <p style="text-align:center">¡Hemos detectado que solicitaste un cambio de contraseña, nos alegra que hayas decidido actualizar tu contraseña. Para realizar el cambio ingresa al siguiente enlace!</p>
        <div style="width: 100%;display: flex;justify-content: center;height: 3rem;align-items: center;" >
          <div style="width: max-content;height: 2.5rem;border-radius: 8px;background-color: #2EB67D;display: flex;justify-content: center;align-items: center;margin:auto;">
            <a href=${
              isAuthenticated
                ? envConfig?.forgotPasswordAuthenticated
                : envConfig?.redirectForgotPassword
            }code=${code}&email=${email} style="color: #fafafa;text-decoration: none;margin:auto;padding-left:1rem;padding-right:1rem;">¡Cambia tu Contraseña!</a>
          </div>
        </div>
      </div>
    </div>
  </div>        
            `,
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
