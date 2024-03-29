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
import Image from "next/image";
import CheckIcon from "../../assets/icons/success-icon.svg";
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
import { FaSpinner } from "react-icons/fa";

const formSchema = z.object({
  firstName: z.string().max(30).min(1, { message: "First Name is required" }),
  lastName: z.string().max(30).min(1, { message: "Last Name is required" }),
  email: z.string().email().min(1),
  role: z.string().min(1, { message: "Role is required" }),
  // refine(
  //   (value) => {
  //     return value !== null && value !== undefined;
  //   },
  //   { message: "Role is required" }
  // ),
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
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        ...values,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/invite`,
        data
      );

      const {
        data: {
          data: { email },
        },
      } = response;
      if (response.status === 201) {
        setEmail(email);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      setIsLoading(true);
      if (axios.isAxiosError(error) && error.response) {
        const {
          data: { message, errors },
        } = error.response;

        // if (error.response.status === 409) {
        setError(message);
        // }
      }
      setIsLoading(false);
      console.error("Error while making POST request:", error);
    }
  }

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid justify-center gap-4 mb-4 mx-2">
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
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center font-bold text-sm space-y-2">
                            <h6 className="me-1">First Name</h6>
                            <span
                              className="text-primary"
                              style={{ marginTop: "-0.1em" }}
                            >
                              *
                            </span>
                          </div>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center font-bold text-sm space-y-2">
                            <h6 className="me-1">Last Name</h6>
                            <span
                              className="text-primary"
                              style={{ marginTop: "-0.1em" }}
                            >
                              *
                            </span>
                          </div>
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center font-bold text-sm space-y-2">
                            <h6 className="me-1">Email Address</h6>
                            <span
                              className="text-primary"
                              style={{ marginTop: "-0.1em" }}
                            >
                              *
                            </span>
                          </div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center font-bold text-sm space-y-2">
                            <h6 className="me-1">Role</h6>
                            <span
                              className="text-primary"
                              style={{ marginTop: "-0.1em" }}
                            >
                              *
                            </span>
                          </div>
                          <FormField
                            control={form.control}
                            name="role"
                            render={({ field, fieldState: { error } }) => (
                              <FormItem>
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
                                {error && (
                                  <p className="text-red-500 text-xs font-medium mt-1">
                                    {error.message}
                                  </p>
                                )}
                              </FormItem>
                            )}
                          />
                          {error && (
                            <FormMessage>
                              <p className="text-red-500 text-xs font-sm mt-1">
                                {error}
                              </p>
                            </FormMessage>
                          )}
                        </div>
                      </>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                          onClick={() => router.push("/configuration")}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="relative text-xs bg-primary text-white p-2 rounded capitalize"
                        >
                          {isLoading ? (
                            <FaSpinner className="absolute inset-0 m-auto animate-spin" />
                          ) : (
                            "Invite"
                          )}
                        </button>
                      </div>
                      {/* <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                          onClick={() => router.push("/configuration")}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="text-xs bg-primary text-white p-2 rounded capitalize"
                        >
                          {isLoading ? (
                            <FaSpinner className="animate-spin text-center" />
                          ) : (
                            "Invite"
                          )}
                        </button>
                      </div> */}
                    </div>
                  </form>
                </Form>
              </CardContent>
              {showSuccessDialog && (
                <AlertDialog defaultOpen>
                  <AlertDialogContent className="w-[80%] rounded">
                    <AlertDialogHeader className="flex items-center justify-center">
                      <AlertDialogTitle className="flex items-center flex-col">
                        <Image
                          src={CheckIcon}
                          width={48}
                          height={48}
                          alt="check"
                          className="mb-2"
                        />
                        Invitation Sent!
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        We&apos;ve sent an invitation to {email}
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
                            className="w-full mt-2"
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
