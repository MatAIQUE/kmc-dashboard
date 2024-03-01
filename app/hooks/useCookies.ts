// // hooks/useCookies.ts
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//   parseCookies,
//   setCookie as setNookiesCookie,
//   destroyCookie as destroyNookiesCookie,
// } from "nookies";
// import { Cookies } from "universal-cookie";

// const useCookies = () => {
//   const router = useRouter();
//   const cookies = new Cookies();

//   useEffect(() => {
//     // Get the cookies from the request headers
//     const initialCookies = parseCookies();

//     // Set the cookies in the universal-cookie instance
//     Object.entries(initialCookies).forEach(([key, value]) => {
//       cookies.set(key, value);
//     });
//   }, []);

//   const setCookie = (key: string, value: any, options?: any) => {
//     cookies.set(key, value, options);
//     setNookiesCookie(null, key, value, options);
//   };

//   const removeCookie = (key: string, options?: any) => {
//     cookies.remove(key);
//     destroyNookiesCookie(null, key, options);
//   };

//   return { cookies, setCookie, removeCookie };
// };

// export default useCookies;
