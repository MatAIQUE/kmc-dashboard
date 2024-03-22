// "use server";

// import { signOut } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const logout = async () => {
  await signOut({ callbackUrl: "/login" });
  redirect("/login");
};
