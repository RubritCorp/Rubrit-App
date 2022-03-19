import { ISubcategory } from "models/Subcategory/ISubcategory";
import { Types } from "mongoose";
//import { ISubcategory } from "../Subcategory/ISubcategory" este comentario 
export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  picture: string;
  icon: string;
  description: string;
  subcategories: Types.ObjectId[]
}
