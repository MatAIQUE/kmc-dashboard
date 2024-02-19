"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import Header from "../../components/ui/header";

import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";

// import { useRouter } from "next/router";

const AcceptInvitePage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  //   const router = useRouter();
  //   const { token } = router.query;

  //   useEffect(() => {
  //     if (typeof window !== "undefined" && typeof token === "string") {
  //       try {
  //         const decodedToken: any = verify(token, "secret");
  //         const tokenExpirationTime = decodedToken.exp * 1000;
  //         const currentTime = Date.now();
  //         if (currentTime > tokenExpirationTime) {
  //           setTokenExpired(true);
  //         }
  //       } catch (error) {
  //         console.error("Error decoding token:", error);
  //         setTokenExpired(true);
  //       }
  //     }
  //   }, [token]);

  const handleAcceptInvite = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (tokenExpired) {
      setError("Token has expired");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>CREATE YOUR PASSWORD.</CardTitle>
                <hr className="my-4 border-t border-gray-300" />
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 gap-y-6">
                  <div className="grid gap-2 gap-y-4">
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Retype Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="grid">
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      className="text-xs bg-primary text-white p-2 rounded capitalize"
                      onClick={handleAcceptInvite}
                    >
                      Accept Invite
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context;
//   const { token } = query;

//   if (typeof token === "string") {
//     try {
//       const decodedToken: any = verify(token, "secret");
//       const tokenExpirationTime = decodedToken.exp * 1000;
//       const currentTime = Date.now();
//       if (currentTime > tokenExpirationTime) {
//         return {
//           props: { tokenExpired: true },
//         };
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return {
//         props: { tokenExpired: true },
//       };
//     }
//   }

//   return {
//     props: { tokenExpired: false },
//   };
// };

export default AcceptInvitePage;
