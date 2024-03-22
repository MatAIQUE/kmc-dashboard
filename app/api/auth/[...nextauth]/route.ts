import { authOptions } from "../../../../auth.config";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import { authOptions } from "../../../../auth.config";
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export {
//   handler as GET,
//   handler as POST,
//   //   handler as auth,
//   //   handler as signIn,
//   //   handler as signOut,
// };