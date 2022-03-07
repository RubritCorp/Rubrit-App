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
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return null;
        }
        const isValid = verifyPassword(credentials?.password, user.password);

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
  secret: process.env.SECRET,
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
        const userSession = await User.findOne({
          email: session.user?.email,
        });
        const newSession = {
          expires: session.expires,
          email: userSession.email,
          name: userSession.name,
          image: userSession.profilePic,
          phone: userSession.phone ? userSession.phone : "",
          description: userSession.description,
          adress: userSession.adress,
          withProvider: userSession.withProvider,
          isAuthenticated: userSession.isAuthenticated,
          isWorker: userSession.isWorker,
          hideAddress: userSession.hideAddress,
          items: userSession.items,
          offers: userSession.offers,
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
    signIn: "http://localhost:3000/",
    signOut: "http://localhost:3000/",
    newUser: "http://localhost:3000/COMPLETARPERFIL",
    error: "http://localhost:3000/",
  },
  debug: false,
});
