import { Types } from "mongoose";

export interface ICategorie {
  name: string;
  picture: string;
  icon: string;
  description: string;
  subcategories: Types.ObjectId[];
}
