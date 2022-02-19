import { Types } from "mongoose";

interface HItems {
  categorie: Types.ObjectId;
  subcategories: Types.ObjectId[];
  description: string;
  certification: string[];
}

export interface IUser {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  isAuthenticated: boolean;
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
