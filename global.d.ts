//from modules
import NextAuth from "next-auth";

declare var mongoose;
declare module "next-auth" {
  interface Session {
    expires: string;
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
    hideAddress: boolean;
    items: any;
    offers: any;
  }
}
