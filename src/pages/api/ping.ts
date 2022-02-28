import type { NextApiRequest, NextApiResponse } from "next";
import "utils/db";
import { dbConnect } from "utils/db";

type Data = {
  message: string;
};

const connect = async () => {
  await dbConnect();
};
connect();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: "Pong" });
}
