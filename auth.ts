// import NextAuth from "next-auth";

// import {authOptions} from "./auth.config";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   update,
// } = NextAuth({
//   pages: {
//     signIn: "/login",
//     error: "/auth/error",
//   },
//   // events: {
//   //   async linkAccount({ user }) {
//   //   },
//   // },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && token.email) {
//         session.user = { email: token.email };
//       }
//       return session;
//     },
//   },
//   session: { strategy: "jwt" },
//   ...auth,
// });

// // import NextAuth from "next-auth";

// // import authConfig from "./auth.config";

// // const { providers } = authConfig;

// // const {
// //   handlers: { GET, POST },
// //   signIn,
// //   signOut,
// //   update,
// // } = NextAuth({ providers }); // Provide an empty object if no options are needed

// // export const auth = NextAuth({
// //   pages: {
// //     signIn: "/login",
// //     error: "/auth/error",
// //   },
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.email = user.email;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (token && token.email) {
// //         session.user = { email: token.email };
// //       }
// //       return session;
// //     },
// //   },
// //   session: { strategy: "jwt" },
// //   ...authConfig,
// // });

// // export { GET, POST, signIn, signOut, update };
