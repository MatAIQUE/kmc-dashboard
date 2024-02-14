"use client";
import React from "react";
import Nav from "../../../components/ui/nav";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { FaBuilding, FaChair } from "react-icons/fa";

const formSchema = z.object({
  bookingId: z.string().min(7, {
    message: "bookingId must be at least 7 characters.",
  }),
  contactNo: z
    .string()
    .length(11, {
      message: "Contact No# must be exactly 11 numbers.",
    })
    .regex(/^\d+$/, {
      message: "Contact No# must contain only numbers.",
    }),
});

const CreateLockerPage: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingId: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const router = useRouter();

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Book a Locker</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {/* <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="bookingId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Booking ID" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact No#</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact No#" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Continue</Button>
                  </form>
                </Form> */}
                <div className="grid gap-2 gap-y-6">
                  <div
                  // Center Content
                  className="grid gap-2 gap-y-4"
                  >
                    <div
                      // Service
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Service</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="outline outline-primary outline-1 rounded p-4 grid gap-y-2">
                          <FaBuilding className="text-primary"/>
                          <p className="font-semibold capitalize text-xs">
                            Serviced Office
                          </p>
                        </div>
                        <div className="outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2">
                          <FaChair />
                          <p className="font-semibold capitalize text-xs">
                            Coworking/Virtual
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      // Client Name
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Client Name</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Client Name"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div
                      // POC Contact
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">POC Contact #</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="+63"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                    onClick={() => router.push("/occupancy?status=vacant")}
                    >Cancel</button>
                    <button className="text-xs bg-primary text-white p-2 rounded capitalize">Continue</button>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter> */}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLockerPage;
