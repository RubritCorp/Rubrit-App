import { Types } from "mongoose";

export interface ICategory {
  name: string;
  picture: string;
  icon: string;
  description: string;
  subcategories: Types.ObjectId[];
}
