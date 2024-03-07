"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
// import { useEffect } from "react";
import { useRouter } from "next/navigation"; //
import { getServerSideProps } from "@/pages/accept-invite";
// import { useRouter } from "next/router"; // instead of 'next/navigation'

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const { data: session } = useSession();
  // const router = useRouter();
  console.log("sisyon", session);
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session, router]);

  // if (!session) {
  //   return null;
  // }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
