import { Types } from "mongoose";

interface HItems {
  category: Types.ObjectId;
  subcategories: Types.ObjectId[];
  description: string;
  certification: string[];
}

export interface IUser {
  email: string;
  name: string;
  phone: string;
  password: string;
  isAuthenticated: boolean;
  authCode: string;
  profilePic: string;
  isWorker: boolean;
  address: string;
  hideAddress: boolean;
  rating: {
    description: string;
    score: string;
  };
  items: HItems[];
  offers: {
    title: string;
    description: string;
    photos: string[];
  };
}
