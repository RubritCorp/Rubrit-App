import { Types } from "mongoose";
export interface ISubcategory {
  _id: Types.ObjectId;
  name: string;
  picture: string;
  icon: string;
  description: string;
}
