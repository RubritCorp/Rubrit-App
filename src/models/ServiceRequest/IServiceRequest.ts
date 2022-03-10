import { Types } from "mongoose";
export default interface IServiceRequest {
  title: string;
  description: string;
  location: string;
  images: string[];
  userId: Types.ObjectId;
  professionalId: string; // Pending: change to ObjectId
  category: string; // Pending: change to ObjectId
  subcategory: string; // Pending: change to ObjectId
}
