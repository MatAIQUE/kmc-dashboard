"use client";
import Nav from "../../../components/ui/nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

const formSchema = z.object({
  firstName: z.string().max(30).min(1, { message: "First Name is required" }),
  lastName: z.string().max(30).min(1, { message: "Last Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  role: z.enum(["admin", "ads_manager", "member"]).refine(
    (value) => {
      return value !== null && value !== undefined;
    },
    { message: "Role is required" }
  ),
});

const AddUserPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [email, setEmail] = useState("");
  const { reset, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({ values });
      setIsLoading(true);
      const data = {
        ...values,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/invite`,
        data
      );

      console.log(response);
      const {
        data: {
          data: { email },
        },
      } = response;
      console.log(email);
      if (response.status === 201) {
        setEmail(email);
        setShowSuccessDialog(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          setError("User already exists.");
        }
      }
      reset();
      setIsLoading(false);
      console.error("Error while making POST request:", error);
    }
  }

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Add Users</CardTitle>
                <hr className="my-4 border-t border-gray-300" />
              </CardHeader>
              <CardContent>
                <Form reset={reset} {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid gap-2 gap-y-6">
                      <>
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex font-bold text-xs">
                                  <h6 className="me-1">First Name</h6>
                                  <span className="text-primary">*</span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex font-bold text-xs">
                                  <h6 className="me-1">Last Name</h6>
                                  <span className="text-primary">*</span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex font-bold text-xs">
                                  <h6 className="me-1">Email Address</h6>
                                  <span className="text-primary">*</span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex font-bold text-xs">
                                  <h6 className="me-1">Role</h6>
                                  <span className="text-primary">*</span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Select
                                  placeholder="Select a Role"
                                  options={[
                                    { value: "admin", label: "Admin" },
                                    {
                                      value: "ads_manager",
                                      label: "Ads Manager",
                                    },
                                    { value: "member", label: "Member" },
                                  ]}
                                  className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              {error && (
                                <p className="text-red-500 text-sm font-medium mt-1">
                                  {error}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      </>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                          onClick={() => router.push("/configuration")}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="text-xs bg-primary text-white p-2 rounded capitalize"
                        >
                          {isLoading ? "Loading..." : "Continue"}
                        </button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              {showSuccessDialog && (
                <AlertDialog defaultOpen>
                  <AlertDialogContent>
                    <AlertDialogHeader className="flex items-center justify-center">
                      <AlertDialogTitle>Invitation Sent!</AlertDialogTitle>
                      <AlertDialogDescription>
                        We’ve sent an invitation to {email}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <div className="w-full">
                        <div>
                          <Button
                            onClick={() => {
                              setShowSuccessDialog(false);
                              router.push("/configuration");
                            }}
                            className="w-full"
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserPage;
