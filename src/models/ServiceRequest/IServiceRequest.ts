import { Types } from "mongoose";
export default interface IServiceRequest {
  title: string;
  description: string;
  location: {
    formattedAddress: string;
    lat: number;
    lng: number;
  }
  images: string[];
  userId: Types.ObjectId;
  professionalId: string; // Pending: change to ObjectId
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
}
