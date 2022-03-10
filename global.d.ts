//from modules
import NextAuth from "next-auth";
import { Types } from "mongoose";

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
      timeZone: string;
    };
    isAuthenticated: boolean;
    withProvider: boolean;
    isWorker: boolean;
    preferences: {
      notificationsMessages: boolean;
      notificationsNewOffer: boolean;
      showAllChats: boolean;
      language: string;
      hideAddress: boolean;
    };
    items: any;
    offers: any;
  }
}
