import { useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname() || null;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const isLoading = status === "loading";
  useEffect(() => {
    if (isLoading || !isClient) return;

    if (status === "authenticated") {
      const redirectPage = pathName === "/" ? DEFAULT_LOGIN_REDIRECT : pathName;
      router.push(`${redirectPage}`);
    } else {
      router.push("/");
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
