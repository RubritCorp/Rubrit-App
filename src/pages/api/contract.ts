import { NextApiRequest, NextApiResponse } from "next";

import Contract from "models/Contract";

import { IContract } from "models/Contract/IContract";


import "utils/db";

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
      nameCliente,
      emailCliente,
      addressCliente,
      nameProfessional,
      emailProfessional,
      addressProfessional,
      currentDate,
      approxDuration,
      budget,
      detalles,
        addressWorke,
        firmaClient,
        firmaProfessional
    } = req.body;

    try {
        const contract = new Contract({
            nameCliente,
            emailCliente,
            addressCliente,
            nameProfessional,
            emailProfessional,
            addressProfessional,
            currentDate,
            approxDuration,
            budget,
            detalles,
            addressWorke,
            firmaClient,
            firmaProfessional
        });
        await contract.save();
        res.status(200).json({
            message: "Contract saved",
            contract,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving contract",
        });
    }
    },
    ERROR: (_, res) => {
        res.status(400).json({ message: "Error, method is invalid!" });
    },
};
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method && method === "POST") {
    return cases[method](req, res);
  }
  return cases["ERROR"](req, res);
}