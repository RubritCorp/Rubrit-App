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
  phone: {
    diallingCode: string;
    number: string;
  };
  password: string;
  description: string;
  authCode: string;
  withProvider: boolean;
  isAuthenticated: boolean;
  profilePic: string;
  isWorker: boolean;
  isPremium: boolean;
  payerId: string;
  address: {
    name: string;
    lat: number;
    lng: number;
    searchRange: number;
    timeZone: string;
  };
  preferences: {
    notificationsMessages: boolean;

    notificationsNewOffer: boolean;
    showAllChats: boolean;
    language: string;
    hideAddress: boolean;
  };
  rating: {
    userComment: Types.ObjectId;
    description: string;
    score: string;
  };
  items: HItems[];
  offers: Types.ObjectId[];
}
