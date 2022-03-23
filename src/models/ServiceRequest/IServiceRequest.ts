import { Types } from "mongoose";

interface IStates {
  active: boolean;
  pending: boolean;
  completed: boolean;
  canceled: boolean;
  comment?: string;
}
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
  professionalId: Types.ObjectId;
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
  state: IStates;
  contractID: Types.ObjectId;
}
