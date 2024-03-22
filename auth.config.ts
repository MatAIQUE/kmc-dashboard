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

          if (res.status === 200) {
            const cookie = res.headers["set-cookie"] || [];
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
  events: {
    async signOut({ token }) {
      console.log({ token });
    },
  },
  callbacks: {
    async jwt(params) {
      const token = params.token;
      const user: CustomUser = params.user;
      console.log("jwt callback", { token }, { user });

      if (user) {
        token.email = user.email;
        token.token = user.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token && token.email) {
        session.user = { ...session, email: token.email };
      }
      return { ...token, expires: session.expires };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;
