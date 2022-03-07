//from modules
import NextAuth from "next-auth";

declare var mongoose;
declare module "next-auth" {
  interface Session {
    expires: string;
    name: string;
    email: string;
    image: string;
    phone: string;
    description: string;
    adress: {
      lat: number;
      lng: number;
    };
    isAuthenticated: boolean;
    withProvider: boolean;
    isWorker: boolean;
    hideAddress: boolean;
    items: any;
    offers: any;
  }
}
