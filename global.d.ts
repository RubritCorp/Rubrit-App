//from modules
import NextAuth from "next-auth";
import { Types } from "mongoose";
type Category = {
  _id: string;
  name: string;
  ["picture_small"]: string;
};
type Subcategory = {
  _id: string;
  name: string;
};
export interface Iitems {
  category: Category;
  subcategories: Subcategory[];
}

declare var mongoose;
declare module "next-auth" {
  interface Session {
    expires: string;
    _id: Types.ObjectId;
    name: string;
    email: string;
    image: string;
    phone: {
      diallingCode: string;
      number: string;
    };
    description: string;
    address: {
      name: string;
      lat: number;
      lng: number;
      searchRange: number;
      timeZone: string;
    };
    isAuthenticated: boolean;
    withProvider: boolean;
    isWorker: boolean;
    workerData: {
      images: string[];
      certification: string[];
      rangeCoverage: number;
      items: Iitems[];
    };
    preferences: {
      notificationsMessages: boolean;
      notificationsNewOffer: boolean;
      showAllChats: boolean;
      language: string;
      hideAddress: boolean;
    };
    requests: {
      received: Types.ObjectId[];
      send: Types.ObjectId[];
    };
    payerId: string;
  }
}
