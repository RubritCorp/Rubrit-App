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
import envConfig from "../../../../next-env-config";

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
        return res.status(200).json({ message: "User already exists" });
      }

      const createCode = () => {
        return Math.floor(
          Math.random() *
            (Number(envConfig?.MAX) - Number(envConfig?.MIN) + 1) +
            Number(envConfig?.MIN)
        );
      };

      var code = createCode().toString();

      const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
        phone: {
          diallingCode: phone.diallingCode,
          number: phone.number,
        },
        authCode: await hashCode(code),
        isAuthenticated: false,
        withProvider,
      });

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
        <p style="text-align:center">¡Gracias por registrarse en Rubrit App!. Porfavor confirma tu email clickeando en el siguiente enlace!</p>
        <div style="width: 100%;display: flex;justify-content: center;height: 3rem;align-items: center;" >
          <div style="width: max-content;height: 2.5rem;border-radius: 8px;background-color: #2EB67D;display: flex;justify-content: center;align-items: center;margin:auto;">
            <a href=${envConfig?.redirectEmailAuth}code=${code}&email=${email} style="color: #fafafa;text-decoration: none;margin:auto;padding-left:1rem;padding-right:1rem;">¡Verifiquemos tu mail!</a>
          </div>
        </div>
      </div>
    </div>
  </div>`,

              alternative: true,
            },
          ],
        },
        (err: any, message: any) => {
          return res.status(404).json({ message: "Error sending email" });
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
