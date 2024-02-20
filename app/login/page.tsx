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
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isText, setIsText] = useState(false)

  const ToggleEye = () => {
    setIsText(true)
    console.log(isText)
  }

  const mouseUp = () => {
    setIsText(false)
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-[32px]">LOG IN</CardTitle>
                <CardDescription className="text-sm">
                  Welcome to Smart Locker Management
                </CardDescription>
                <hr className="my-4 border-t border-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 gap-y-6">
                  <div className="grid gap-2 gap-y-4">
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-sm">
                        <h6 className="me-1">Email</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Client Name"
                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div className="gap-y-2 grid">
                      <div className="flex font-bold text-sm">
                        <h6 className="me-1">Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <div className="relative">
                        <input type={`${isText ? "text":"password"}`} className="outline outline-gray-300 outline-1 rounded block w-full md:text-xs text-md p-2" placeholder="Enter password"/>
                        <span className="absolute top-0 end-0 h-full flex items-center">
                        <button type="button" className=" p-2 rounded" onMouseDown={ToggleEye} onMouseUp={mouseUp} value="12313123">
                          <svg className="flex-shrink-0 size-3.5 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                            <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                            <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
                            <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <button className="text-md bg-primary text-white p-2 rounded capitalize">
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
