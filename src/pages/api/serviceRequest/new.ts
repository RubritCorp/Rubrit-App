// import { SMTPClient } from 'emailjs';
import { NextApiRequest, NextApiResponse } from 'next';
import ServiceRequest from 'models/ServiceRequest';
import User from 'models/User';
import 'utils/db';

import type IServiceRequest from 'models/ServiceRequest/IServiceRequest';



interface DataSuccess {
  message: string;
  serviceRequest?: IServiceRequest;
}

interface DataError {
  message: string;
  requests?: any,
}

interface ICases {
  GET(req:NextApiRequest, res: NextApiResponse<DataError>): void;
  DELETE(req:NextApiRequest, res: NextApiResponse<DataError>): void;
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
      professionalId ? data = { title, description, location: locationObject, images, userId, professionalId, isActive: true } : data = { category, subcategory, title, description, location: locationObject, images, userId, professionalId, isActive: true }
      const serviceRequest = await ServiceRequest.create(data);

      await User.findByIdAndUpdate(userId, { $push: { "requests.sent": serviceRequest._id } });
      if (professionalId) await User.findByIdAndUpdate(professionalId, { $push: { "requests.received": serviceRequest._id } });

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
  GET: async (req,res) => {
    
    try {
        const { id } = req.query;
          
        const userRequests = await User.findOne({_id: id})
        .populate([{
          path: "requests.sent",
          model: "ServiceRequest"
        },
        {
          path: "requests.received",
          model: "ServiceRequest"
        }
      ])
        
   const requestsPop =  await userRequests.populate([{
      path:"requests.received.subcategory",
      model: "Subcategory",
      select: "name "
        },
        {
          path:"requests.received.category",
          model: "Category",
          select: "name icon"
        },
        {
          path:"requests.sent.subcategory",
          model: "Subcategory"
        },
      {
        path:"requests.sent.category",
          model: "Category",
          select: "name icon"
      },
      {
        path:"requests.sent.userId",
          model: "User",
          select: "name profilePic"
      },
      {
        path:"requests.received.userId",
          model: "User",
          select: "name profilePic"
      },
      {
        path:"requests.sent.professionalId",
          model: "User",
          select: "name profilePic isAuthenticated description"
      },
      {
        path:"requests.received.professionalId",
          model: "User",
          select: "name profilePic isAuthenticated description"
      }])
        
        if(requestsPop) {
         
            res.status(200).json({message: "Requests found", requests : requestsPop.requests})
        }

    } catch (err) {
      console.log('Error in GET REQUESTS');
      console.log(err)
      res.status(400).json({message: `${err}`})
    }

  },
  DELETE: async (req,res) => {
        
        try {
          const { id } = req.body
          
            const deletedRequest = await ServiceRequest.deleteOne({_id: id})

          res.status(200).json({message: "Request deleted successfully", requests:  deletedRequest})
        } catch(err) {
            console.log(err)


        }
      },
        
  ERROR: (_, res) => {
   
    res.status(400).json({ message: 'Invalid Method' });
  },
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;


  
  if (method && method === 'POST' || method === "GET" || method === "DELETE") {
    return cases[method](req, res);
  } else {
    return cases['ERROR'](req, res);
  }
}