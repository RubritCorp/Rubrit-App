import axios from 'axios';
// import { SMTPClient } from 'emailjs';
import { NextApiRequest, NextApiResponse } from 'next';
import ServiceRequest from 'models/ServiceRequest';
import 'utils/db';

import type IServiceRequest from 'models/ServiceRequest/IServiceRequest';


interface DataSuccess {
  message: string;
  serviceRequest?: IServiceRequest;
}

interface DataError {
  message: string;
}

interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataSuccess>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  POST: async (req, res) => {
    const { category, subcategory, title, description, location, lat, lng, images, userId, professionalId } = req.body;

    if (!title || !description || !location) return res.status(422).json({ message: 'Invalid Data' });

    try {
      let data;
      let locationObject = { formattedAddress: location, lat, lng };
      professionalId ? data = { title, description, location: locationObject, images, userId, professionalId } : data = { category, subcategory, title, description, location: locationObject, images, userId, professionalId }
      const serviceRequest = await ServiceRequest.create(data);

      // const client: any = new SMTPClient({
      //   user: process.env.EMAIL_SENDER,
      //   password: process.env.EMAIL_PASSWORD,
      //   host: 'smtp.gmail.com',
      //   ssl: true,
      // });

      // client.send(
      //   {
      //     text: '¡Gracias por registrarse en Rubrit App!',
      //     from: process.env.EMAIL_SENDER,
      //     to: email,
      //     subject: 'Verificacion de la cuenta',
      //     attachment: [
      //       {
      //         data: `<h1>Confirmacion de Email</h1><h2>Hola ${name}</h2>         
      //         <p>¡Gracias por registrarse en Rubrit App!. Porfavor confirma tu email clickeando en el siguiente link!</p>         
      //         <a href=${process.env.CALLBACK_REDIRECT_EMAIL_AUTH}code=${code}&email=${email}> Click aquí</a></div>`,
      //         alternative: true,
      //       },
      //     ],
      //   },
      //   (err: any, message: any) => {
      //     res.status(404).json({ message: 'Error sending email' });
      //   }
      // );
      return res.status(200).json({ message: 'Request created', serviceRequest });
    } catch (err) {
      console.log('Error in POST USER');
      console.log(err);
    }
  },
  ERROR: (_, res) => {
    res.status(400).json({ message: 'Invalid Method' });
  },
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === 'POST') {
    return cases[method](req, res);
  } else {
    return cases['ERROR'](req, res);
  }
}