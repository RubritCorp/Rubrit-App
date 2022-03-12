import { NextApiRequest, NextApiResponse } from "next";

import Contract from "models/Contract";

import { IContract } from "models/Contract/IContract";

import { IUser } from "models/User/IUser";

import "utils/db";
import User from "models/User";

type DataContract = {
  message: string;
  contract?: IContract;
};

type DataError = {
  message: string;
};



interface ICases {
  POST(req: NextApiRequest, res: NextApiResponse<DataContract>): void;
  ERROR(req: NextApiRequest, res: NextApiResponse<DataError>): void;
}

const cases: ICases = {
  POST: async (req, res) => {
    const {
      userId,
      professionalId,
      currentDate,
      approxDuration,
      budget,
      detalles,
      state,
    } = req.body;

    try {

      const user = await User.findById(userId);
      const professional = await User.findById(professionalId);

      if (!user && !professional)
        return res.status(404).json({ message: "User not found" });
      const newContract = new Contract({
        userId: user._Id,
        professionalId: professional._Id,
        currentDate,
        approxDuration,
        budget,
        detalles,
        state,
      });

      const contract = await newContract.save();

      User.findByIdAndUpdate(userId, {
        $push: { contracts: contract._id },
      });

      await User.findByIdAndUpdate(professionalId, {
        $push: { contracts: contract._id },
      });


      res.status(200).json({ message: "Contract created succesfully", contract });

      if (!contract)
        return res.status(404).json({ message: "Error saving contract" });

    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error fetching data" });
    }
  },

  ERROR: (req, res) => {
    res.status(404).json({ message: "Error fetching data" });
  },
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === "POST") {
    return cases[method](req, res);
  }
  return cases["ERROR"](req, res);
}
