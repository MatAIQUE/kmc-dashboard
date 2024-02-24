"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import Header from "../../components/ui/header";
import axios from "axios";
import PasswordInput from "../../components/ui/password-input";
import { FaSpinner } from "react-icons/fa";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { reset, ...form } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        { ...values }
      );
      if (!response) {
        throw new Error("Invalid credentials");
      }
      setIsLoading(false);
      router.push("/occupancy");
    } catch (error) {
      setIsLoading(true);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setError("Invalid credentials");
        }
      }
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center pt-32 h-screen">
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
                <Form reset={reset} {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2 gap-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex font-bold text-xs">
                                <h6 className="me-1">Email</h6>
                                <span className="text-primary">*</span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex font-bold text-xs">
                                <h6 className="me-1">Password</h6>
                                <span className="text-primary">*</span>
                              </div>
                            </FormLabel>
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
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <FaSpinner className="animate-spin text-center" />
                          ) : (
                            "Log In"
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

export default LoginPage;
