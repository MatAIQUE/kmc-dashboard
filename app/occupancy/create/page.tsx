"use client";
import React from "react";
import Nav from "../../../components/ui/nav";
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

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Book a Locker</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
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
                </Form>
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
