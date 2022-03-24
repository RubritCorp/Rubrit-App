//from modules
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
//import GitHubProvider from "next-auth/providers/github";

//utils
import "utils/db";
import { verifyPassword } from "utils/verifyPassword";
//models
import User from "models/User";
import envConfig from "../../../../next-env-config";
import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
      },
      async authorize(credentials) {
        const user = await User.findOne({
          email: credentials?.email.toLowerCase(),
        });

        if (!user || user.statusAccount === "DISABLED") {
          return null;
        }
        const isValid = await verifyPassword(
          credentials?.password,
          user.password
        );

        if (!isValid) {
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_ID}`,
      clientSecret: `${process.env.FACEBOOK_SECRET}`,
    }),
    /* GitHubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    }), */
  ],
  secret: envConfig?.secret,
  events: {
    async signIn(message) {
      "Inicio de sesión exitoso";
    },
    async signOut(message) {
      "Cierre de sesión exitoso";
    },
    async session(message) {
      "Recuperación de sesión exitoso";
    },
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const userSession = await User.findOne({
          email: user.email,
        });

        if (userSession) {
          return userSession;
        }
        const newUser = User.create({
          email: user.email,
          name: user.name,
          profilePic: user.image,
        });

        return newUser;
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    },
    async session({ session }) {
      if (session) {
        const populateQuery = [
          {
            path: "workerData.items.category",
            model: "Category",
            select: "_id name picture_small",
          },
          {
            path: "workerData.items.subcategories",
            model: "Subcategory",
            select: "_id name",
          },
        ];
        const userSession = await User.findOne({
          email: session.user?.email,
        }).populate(populateQuery);
        const { data } = await axios.post(`${envConfig?.apiUrl}/user/token`, {
          id: userSession._id,
        });
        const newSession = {
          expires: session.expires,
          _id: userSession._id,
          email: userSession.email,
          name: userSession.name,
          role: userSession.role,
          statusAccount: userSession.statusAccount,
          image: userSession.profilePic,
          phone: userSession.phone
            ? userSession.phone
            : { dialingCode: "", number: "" },
          description: userSession.description,
          address: userSession.address,
          withProvider: userSession.withProvider,
          isPremium: userSession.isPremium,
          isAuthenticated: userSession.isAuthenticated,
          isWorker: userSession.isWorker,
          preferences: userSession.preferences,
          workerData: userSession.workerData,
          requests: userSession.requests,
          payerId: userSession.payerId,
          token: data.token,
        };
        return newSession;
      }
      return session;
    },
  },
  theme: {
    colorScheme: "dark",
    /*
      brandColor: "", // Hex color code
      logo: "" // Absolute URL to image
    */
  },
  pages: {
    signIn: envConfig?.signIn,
    signOut: envConfig?.signOut,
    newUser: `${envConfig?.host}/COMPLETARPERFIL`,
    error: `${envConfig?.host}`,
  },
  debug: true,
});
