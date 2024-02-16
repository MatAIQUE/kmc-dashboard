"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Nav from "../../../components/ui/nav";

import { FaBuilding, FaChair, FaPlusCircle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "../../../components/ui/input";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

const formSchema = z.object({
  bookingNumber: z.string().min(7, {
    message: "bookingId must be at least 7 characters.",
  }),
  mobileNumber: z
    .string()
    .length(11, {
      message: "Contact No# must be exactly 11 numbers.",
    })
    .regex(/^\d+$/, {
      message: "Contact No# must contain only numbers.",
    }),
});

const CreateLockerPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState("serviced-office");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrDialog, setShowErrDialog] = useState(false);

  const router = useRouter();

  const { reset, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: "",
      bookingNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        ...values,
        lockerId: "4001",
        bookingOrigin: 8,
      };

      const response = await axios.post(
        "https://pandora-v3.onrender.com/dashboard/validate-booking/kmc",
        data,
        {
          headers: {
            "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
            "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setShowSuccessDialog(true);
      }

      console.log("Post request successful:", response.data);
    } catch (error) {
      setShowErrDialog(true);
      console.error("Error while making POST request:", error);
    }
  }

  function handleServiceChange(service: string) {
    if (service !== selectedService) {
      setSelectedService(service);
      reset({
        bookingNumber: "",
        mobileNumber: "",
      });
    }
  }

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Book a Locker</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Form reset={reset} {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid gap-2 gap-y-6">
                      <div className="gap-y-2 grid">
                        <div className="flex font-bold text-xs">
                          <h6 className="me-1">Service</h6>
                          <span className="text-primary">*</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            className={`outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2 ${
                              selectedService === "serviced-office"
                                ? "outline outline-primary outline-1 rounded p-4 grid gap-y-2"
                                : ""
                            }`}
                            onClick={() =>
                              handleServiceChange("serviced-office")
                            }
                          >
                            <FaBuilding
                              className={`${
                                selectedService === "serviced-office"
                                  ? "text-primary"
                                  : ""
                              } `}
                            />
                            <p className="font-semibold capitalize text-xs">
                              Serviced Office
                            </p>
                          </div>
                          <div
                            className={`outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2 ${
                              selectedService === "coworking-virtual"
                                ? "outline outline-primary outline-1 rounded p-4 grid gap-y-2"
                                : ""
                            }`}
                            onClick={() =>
                              handleServiceChange("coworking-virtual")
                            }
                          >
                            <FaChair
                              className={`${
                                selectedService === "coworking-virtual"
                                  ? "text-primary"
                                  : ""
                              } `}
                            />
                            <p className="font-semibold capitalize text-xs">
                              Coworking/Virtual
                            </p>
                          </div>
                        </div>
                      </div>
                      {selectedService === "serviced-office" ? (
                        // <>
                        //   <FormField
                        //     control={form.control}
                        //     name="clientName"
                        //     render={({ field }) => (
                        //       <FormItem>
                        //         <FormLabel>
                        //           <div className="flex font-bold text-xs">
                        //             <h6 className="me-1">Client Name</h6>
                        //             <span className="text-primary">*</span>
                        //           </div>
                        //         </FormLabel>
                        //         <FormControl>
                        //           <Input
                        //             className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                        //             placeholder="Client Name"
                        //             {...field}
                        //           />
                        //         </FormControl>
                        //         <FormMessage />
                        //       </FormItem>
                        //     )}
                        //   />
                        //   <FormField
                        //     control={form.control}
                        //     name="pocContactNo"
                        //     render={({ field }) => (
                        //       <FormItem>
                        //         <FormLabel>
                        //           <div className="flex font-bold text-xs">
                        //             <h6 className="me-1">POC Contact No#</h6>
                        //             <span className="text-primary">*</span>
                        //           </div>
                        //         </FormLabel>
                        //         <FormControl>
                        //           <Input
                        //             className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                        //             placeholder="POC Contact No#"
                        //             {...field}
                        //           />
                        //         </FormControl>
                        //         <FormMessage />
                        //       </FormItem>
                        //     )}
                        //   />
                        // </>
                        <p>Coming soon!.</p>
                      ) : (
                        <>
                          <FormField
                            control={form.control}
                            name="bookingNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <div className="flex font-bold text-xs">
                                    <h6 className="me-1">Booking ID</h6>
                                    <span className="text-primary">*</span>
                                  </div>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                    placeholder="Booking ID"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <div className="flex font-bold text-xs">
                                    <h6 className="me-1">Contact No#</h6>
                                    <span className="text-primary">*</span>
                                  </div>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                                    placeholder="Contact No#"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                          onClick={() =>
                            router.push("/occupancy?status=vacant")
                          }
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-xs bg-primary text-white p-2 rounded capitalize"
                        >
                          Continue
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
                      <AlertDialogTitle>Locker Book</AlertDialogTitle>
                      <AlertDialogDescription>
                        Locker 4 has been successfully booked to (Client Name)
                      </AlertDialogDescription>
                      <AlertDialogDescription>
                        (Client Name)
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <div className="w-full">
                        <div>
                          <Button
                            onClick={() => {
                              setShowSuccessDialog(false); // Hide the dialog
                              router.push("/occupancy?status=vacant");
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

              {showErrDialog && (
                <AlertDialog defaultOpen>
                  <AlertDialogContent>
                    <AlertDialogHeader className="flex items-center justify-center">
                      <AlertDialogTitle>No Match</AlertDialogTitle>
                      <AlertDialogDescription>
                        Im sorry we didnt find any match of the
                      </AlertDialogDescription>
                      <AlertDialogDescription>
                        Booking ID/Client Name
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <div className="w-full">
                        <div>
                          <Button
                            onClick={() => {
                              setShowErrDialog(false); // Hide the dialog
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

export default CreateLockerPage;
