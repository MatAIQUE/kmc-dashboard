import { NextAuthOptions } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { parseCookies } from "./lib/cookie-parser";

type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  access_token?: string | null;
};
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { withCredentials: true }
          );

          console.log({ res });

          if (res.status === 200) {
            const cookie = res.headers["set-cookie"] || [];
            console.log(cookie);
            const access_token = parseCookies(cookie);

            return {
              id: res.data.data._id,
              email: credentials?.email,
              access_token,
            };
          } else {
            throw new Error("Authentication failed");
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      const token = params.token;
      const user: CustomUser = params.user;
      console.log("jwt callback", { token }, { user });

      if (user) {
        token.email = user.email;
        token.token = user.access_token;
        // params.session.token = user.access_token;
      }
      console.log({ token }, params.session);
      return token;
    },
    // async signIn(params) {
    //   console.log("signIn callback", params.user);

    //   if (params.user) {
    //     console.log(params.user);
    //     return true;
    //     // params.account?.access_token = params.user.access_token
    //   }
    //   return "";
    // },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      console.log(token.token);
      if (token && token.email) {
        session.user = { email: token.email };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;
