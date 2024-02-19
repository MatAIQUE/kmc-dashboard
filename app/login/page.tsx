"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { useRouter } from "next/navigation";
import Header from "../../components/ui/header";

const LoginPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>LOG IN</CardTitle>
                <CardDescription>
                  Welcome to Smart Locker Management
                </CardDescription>
                <hr className="my-4 border-t border-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 gap-y-6">
                  <div className="grid gap-2 gap-y-4">
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Email</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Client Name"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Last Name"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <button className="text-xs bg-primary text-white p-2 rounded capitalize">
                      Log In
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

export default LoginPage;
