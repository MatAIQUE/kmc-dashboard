"use client";
import "../app/globals.css";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import Header from "../components/ui/header";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";

interface AcceptInviteProps {
  tokenExpired: boolean;
  email: string;
  isLinkAlreadyUsed: boolean;
}
const AcceptInvitePage: React.FC<AcceptInviteProps> = ({
  tokenExpired,
  email,
  isLinkAlreadyUsed,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tokenExpired) {
      setError("Link has already expired.");
    }
    if (isLinkAlreadyUsed) {
      setError("Link already used.");
    } else {
      setEmail(email);
    }
  }, [tokenExpired, email, isLinkAlreadyUsed]);

  const handleAcceptInvite = async () => {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (tokenExpired) {
        setError("URL has already expired");
        return;
      }

      if (isLinkAlreadyUsed) {
        setError("URL already used");
        return;
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/password`,
        { email: userEmail, password }
      );

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error resetting pin:", error);
    } finally {
      setIsLoading(false);
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
                        <h6 className="me-1">New Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Confirm Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Retype Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="grid">
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      disabled={tokenExpired || isLinkAlreadyUsed}
                      className="text-xs bg-primary text-white p-2 rounded capitalize"
                      onClick={handleAcceptInvite}
                    >
                      {isLoading ? "Loading..." : "Accept Invite"}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { token } = query;

  let email = "";

  if (typeof token === "string") {
    try {
      const decodedToken = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${token}/verify`
      );
      const { exp, email: userEmail } = decodedToken.data.data;
      email = userEmail;

      const tokenExpirationTime = exp * 1000;
      const currentTime = Date.now();
      if (currentTime > tokenExpirationTime) {
        return {
          props: { tokenExpired: true },
        };
      } else {
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userEmail}`
        );
        const userData = userResponse.data.data;
        if (userData.isVerified) {
          return { props: { isLinkAlreadyUsed: true } };
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return {
        props: { tokenExpired: true },
      };
    }
  }
  return {
    props: { tokenExpired: false, email, isLinkAlreadyUsed: false },
  };
};

export default AcceptInvitePage;
