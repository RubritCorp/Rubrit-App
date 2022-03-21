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

    if (email === newEmail)
      return res.status(200).json({
        message:
          "¡La nueva dirección de correo no puede ser igual a la anterior!",
      });

    try {
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
          text: "¡Cambio de Correo Electronico!",
          from: process.env.EMAIL_SENDER,
          to: newEmail,
          subject: "Verificacion de la cuenta",
          attachment: [
            {
              data: `
              <div style="width: 100%;height: 40rem; background-color: #e0e0e0;display: flex;justify-content: center;align-items: center; padding: 0; margin: 0;">
    <div style="max-width: 40rem; height: 90%;background: #fafafa;border-radius: 10px;margin:auto;">
      <div style="display: flex; justify-content: center;">
        <img src="https://rubrit-development.s3.sa-east-1.amazonaws.com/assets/logo-rubritt" alt="'logo" width="235px" height="75px" style="padding: 2rem;margin:auto;"/>
      </div>
      <div style="padding: 2rem;">
        <h1 style="text-align: center;">¡Confirmacion de Email!</h1>
        <h3 style="text-align: center;">¡Hola ${user.name}, es un placer comunicarnos contigo nuevamente!.</h3>
        <div style="height: 1rem; width: 100%;display: flex;justify-content: center;margin:auto;">
          <div style="height: 0.5rem;width: 90%;background-color: #2EB67D;border-radius: 10px;margin:auto;">

          </div>
        </div>
        <p style="text-align:center">Hemos detectado que decidio modificar su correo electronico!. Porfavor confirma tu identidad clickeando en el siguiente link!</p>
        <div style="width: 100%;display: flex;justify-content: center;height: 3rem;align-items: center;" >
          <div style="width: max-content;height: 2.5rem;border-radius: 8px;background-color: #2EB67D;display: flex;justify-content: center;align-items: center;margin:auto;">
            <a href=${process.env.CALLBACK_REDIRECT_EMAIL_AUTH}code=${code}&email=${newEmail} style="color: #fafafa;text-decoration: none;margin:auto;padding-left:1rem;padding-right:1rem;">¡Verifiquemos tu nuevo mail!</a>
          </div>
        </div>
      </div>
    </div>
  </div>`,
            },
          ],
        },
        (err: any, message: any) => {
          res.status(404).json({ message: "Error sending email" });
        }
      );

      res
        .status(200)
        .json({ message: "Profile Description was modified", user });
    } catch (err) {
      res.status(404).json({ message: "Error ocurred in UPDATE EMAIL" });
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
    if (method && method === "PUT") {
      return cases[method](req, res);
    }
    return cases["ERROR"](req, res);
  } else {
    res.status(500).json({ message: "Acces Denied" });
  }
}
