// import { SMTPClient } from 'emailjs';
import { NextApiRequest, NextApiResponse } from "next";
import ServiceRequest from "models/ServiceRequest";
import User from "models/User";
import "utils/db";

import type IServiceRequest from "models/ServiceRequest/IServiceRequest";

interface DataSuccess {
  message: string;
  serviceRequest?: IServiceRequest;
}

interface DataError {
  message: string;
  requests?: any;
}

interface ICases {
  GET(req: NextApiRequest, res: NextApiResponse<DataError>): void;
  PUT(req: NextApiRequest, res: NextApiResponse<DataError>): void;
  DELETE(req: NextApiRequest, res: NextApiResponse<DataError>): void;
  POST(req: NextApiRequest, res: NextApiResponse<DataSuccess>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  POST: async (req, res) => {
    const {
      category,
      subcategory,
      title,
      description,
      location,
      lat,
      lng,
      images,
      userId,
      professionalId,
    } = req.body;

    if (!title || !description || !location)
      return res.status(422).json({ message: "Invalid Data" });

    try {
      let data;
      let locationObject = { formattedAddress: location, lat, lng };
      professionalId
        ? (data = {
            title,
            description,
            location: locationObject,
            images,
            userId,
            professionalId,
            commented : false,
          })
        : (data = {
            category,
            subcategory,
            title,
            description,
            location: locationObject,
            images,
            userId,
            professionalId,
          });

          
      const serviceRequest = await ServiceRequest.create(data);

      
      await User.findByIdAndUpdate(userId, {
        $push: { "requests.sent": serviceRequest._id },
      });
      if (professionalId)
        await User.findByIdAndUpdate(professionalId, {
          $push: { "requests.received": serviceRequest._id },
        });

      return res
        .status(200)
        .json({ message: "Request created", serviceRequest });
    } catch (err) {
      console.log("Error in POST USER");
      console.log(err);
    }
  },
  GET: async (req, res) => {
    try {
      const { id } = req.query;

      const userRequests = await User.findOne({ _id: id }).populate([
        {
          path: "requests.sent",
          model: "ServiceRequest",
        },
        {
          path: "requests.received",
          model: "ServiceRequest",
        },
      ]);

      const requestsPop = await userRequests.populate([
        {
          path: "requests.received.subcategory",
          model: "Subcategory",
          select: "name ",
        },
        {
          path: "requests.received.category",
          model: "Category",
          select: "name icon",
        },
        {
          path: "requests.sent.subcategory",
          model: "Subcategory",
        },
        {
          path: "requests.sent.category",
          model: "Category",
          select: "name icon",
        },
        {
          path: "requests.sent.userId",
          model: "User",
          select: "name profilePic isAuthenticated",
        },
        {
          path: "requests.received.userId",
          model: "User",
          select: "name profilePic isAuthenticated",
        },
        {
          path: "requests.sent.professionalId",
          model: "User",
          select: "name profilePic isAuthenticated description",
        },
        {
          path: "requests.received.professionalId",
          model: "User",
          select: "name profilePic isAuthenticated description",
        },
      ]);

      if (requestsPop) {
        res
          .status(200)
          .json({ message: "Requests found", requests: requestsPop.requests });
      }
    } catch (err) {
      console.log("Error in GET REQUESTS");
      console.log(err);
      res.status(400).json({ message: `${err}` });
    }
  },
  PUT: async (req, res) => {
    try {
      const { params, state } = req.body.data;

      const update = {
        active: state === "Activar" ? true : false,
        pending: state === "Desactivar" ? true : false,
        completed: state === "Completada" ? true : false,
        canceled: state === "Finalizada" ? true : false,
      };

      const requestUpdate = await ServiceRequest.findByIdAndUpdate(
        { _id: params },
        update,
        {
          returnOriginal: false,
        }
      );

      requestUpdate.state = update;

      if (state === "Completada") {
        const professional = await User.findOne({
          _id: requestUpdate.professionalId,
        });

        professional.requests.completed = professional.requests.completed + 1;
        professional.save();
      }

      requestUpdate.save();

      res
        .status(200)
        .json({ message: "Request updated", requests: requestUpdate });
    } catch (err) {
      console.log(err)
    }
  },
  DELETE: async (req, res) => {
    try {
      const { id } = req.body;

      const deletedRequest = await ServiceRequest.deleteOne({ _id: id });

      res.status(200).json({
        message: "Request deleted successfully",
        requests: deletedRequest,
      });
    } catch (err) {
      console.log(err);
    }
  },

  ERROR: (_, res) => {
    res.status(400).json({ message: "Invalid Method" });
  },
};

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (
    (method && method === "POST") ||
    method === "GET" ||
    method === "DELETE" ||
    method === "PUT"
  ) {
    return cases[method](req, res);
  } else {
    return cases["ERROR"](req, res);
  }
}
