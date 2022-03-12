import { Types } from "mongoose";

interface HItems {
  category: Types.ObjectId;
  subcategories: Types.ObjectId[];
  description: string;
  certification: string[];
}

interface CItems {
  contract: Types.ObjectId;
}

export interface IUser {
  email: string;
  name: string;
  phone: {
    diallingCode: string;
    number: string;
  };
  password: string;
  isAuthenticated: boolean;
  authCode: string;
  profilePic: string;
  isWorker: boolean;
  address: {
    name: string;
    lat: number;
    lng: number;
    timeZone: string;
  };
  hideAddress: boolean;
  rating: {
    description: string;
    score: string;
  };
  items: HItems[];
  contracts: CItems[];
  offers: {
    title: string;
    description: string;
    photos: string[];
  };
}
