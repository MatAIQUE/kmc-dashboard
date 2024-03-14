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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import PasswordInput from "../components/ui/password-input";
import { FaSpinner } from "react-icons/fa";

interface AcceptInviteProps {
  tokenExpired: boolean;
  email: string;
  isLinkAlreadyUsed: boolean;
  userRemoved: boolean;
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .refine(
        (password) => {
          return /(?=.*[A-z])(?=.*[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?])/.test(password);
        },
        { message: "Password must contain a letter and number or symbol." }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .refine(
        (data) => {
          return /(?=.*[A-z])(?=.*[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?])/.test(data);
        },
        { message: "Confirm Password must contain a letter and number or symbol." }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const AcceptInvitePage: React.FC<AcceptInviteProps> = ({
  tokenExpired,
  email,
  isLinkAlreadyUsed,
  userRemoved,
}) => {
  const [error, setError] = useState("");
  const [userEmail, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { reset, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  useEffect(() => {
    if (tokenExpired) {
      setError("Link has already expired.");
    }
    if (userRemoved) {
      setError(
        "There's an error encountered with your account. Please contact admin/cs immediately."
      );
    }
    if (isLinkAlreadyUsed) {
      setError("Link already used.");
    } else {
      setEmail(email);
    }
  }, [tokenExpired, email, isLinkAlreadyUsed]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
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
        { email: userEmail, password: values.password }
      );

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error setting password:", error);
    } finally {
      reset();
      setIsLoading(false);
    }
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
                <Form reset={reset} {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2 gap-y-6">
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">New Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PasswordInput
                                showVisibilityToggle
                                className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Confirm Password</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PasswordInput
                                showVisibilityToggle
                                className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-2">
                        <Button
                          type="submit"
                          className="text-md bg-primary text-white p-2 rounded capitalize"
                          disabled={
                            tokenExpired || isLinkAlreadyUsed || isLoading
                          }
                        >
                          {isLoading ? (
                            <FaSpinner className="animate-spin text-center" />
                          ) : (
                            "Save & Log in"
                          )}
                        </Button>
                        {error && (
                          <FormMessage>
                            <p className="text-red-500 text-sm font-medium mt-1">
                              {error}
                            </p>
                          </FormMessage>
                        )}
                      </div>
                    </div>
                  </form>
                </Form>
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
      // TODO: Getting `tokenExpired` message can be simplified
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
        try {
          const userResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userEmail}`
          );
          const userData = userResponse.data.data;
          if (userData.isVerified) {
            return { props: { isLinkAlreadyUsed: true } };
          }
        } catch (error) {
          return { props: { userRemoved: true } };
        }
      }
    } catch (error) {
      return {
        props: { tokenExpired: true },
      };
    }
  }
  return {
    props: {
      tokenExpired: false,
      email,
      isLinkAlreadyUsed: false,
      userRemoved: false,
    },
  };
};

export default AcceptInvitePage;
