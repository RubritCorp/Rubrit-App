//from modules
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface ICredential {
  username: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
        },
      },
      authorize: (credentials) => {
        if (credentials?.username && credentials.password) {
          return {
            id: 2,
            name: credentials.username,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});
