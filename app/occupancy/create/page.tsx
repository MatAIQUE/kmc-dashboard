"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Nav from "../../../components/ui/nav";
import SOIcon from "../../assets/icons/SO.svg";
import CWIcon from "../../assets/icons/CW.svg";
import SOActiveIcon from "../../assets/icons/SOActiveIcon.svg";
import CWActiveIcon from "../../assets/icons/CWActiveIcon.svg";
import DangerIcon from "../../assets/icons/DangerIcon.svg";
import axios from "axios";
import Image from "next/image";
import {
  FaBuilding,
  FaChair,
  FaMinus,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
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

import SuccessIcon from "../../../app/assets/icons/success-icon.svg";
import WarningIcon from "../../../app/assets/icons/warning-icon.svg";
import Link from "next/link";

const CreateLockerPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState("serviced-office");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrDialog, setShowErrDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDoors, setAvailableDoors] = useState<number>(10);
  const [isLoadingDoor, setIsLoadingDoor] = useState(false);
  const [errorDoor, setErrorDoor] = useState("");
  const [doorCount, setDoorCount] = useState(1);
  const [lockerQty, setLockerQty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [hide, setHide] = useState(false);

  const router = useRouter();

  const formSchemaVO = z.object({
    clientName: z.string().min(2, {
      message: "Client name must be at least 2 characters.",
    }),
    mobileNumber: z
      .string()
      .length(11, {
        message: "POC Contact # must be exactly 11 numbers.",
      })
      .regex(/^\d+$/, {
        message: " POC Contact # must contain only numbers.",
      }),
  });

  const formSchemaCO = z.object({
    bookingNumber: z.string().min(7, {
      message: "bookingId must be at least 7 characters.",
    }),
    mobileNumber: z
      .string()
      .length(11, {
        message: "Contact # must be exactly 11 numbers.",
      })
      .regex(/^\d+$/, {
        message: "Contact # must contain only numbers.",
      }),
  });

  const selectedServiceFormat =
    selectedService === "serviced-office" ? formSchemaVO : formSchemaCO;

  const { reset, ...form } = useForm({
    resolver: zodResolver(selectedServiceFormat),
    defaultValues: {
      mobileNumber: "",
      bookingNumber: "",
      clientName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof selectedServiceFormat>) {
    try {
      setIsLoading(true);
      const data =
        selectedService === "serviced-office"
          ? {
              ...values,
              // lockerId: "4000",
              bookingOrigin: 8,
            }
          : {
              ...values,
              // lockerId: "4000",
              bookingOrigin: 8,
            };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/otp/kmc`,
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
        setHide(true);
        setLockerQty(true);
        setShowBtn(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      setShowErrDialog(true);
      console.error("Error while making POST request:", error);
      setIsLoading(false);
    }
  }

  async function createLocker(values: z.infer<typeof selectedServiceFormat>) {
    try {
      setIsLoading(true);
      const data = {
        ...values,
        lockerId: "4000",
        bookingOrigin: "8",
        doorCount: doorCount,
      };
      const newLocker = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/door/reserve/0003/kmc?`,
        data,
        {
          headers: {
            "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
            "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(newLocker.status);
      if (newLocker.status === 201) {
        const datas = {
          ...values,
          lockerId: "4000",
          doorCount: doorCount,
          paymentMethod: "add_to_invoice",
          bookingOrigin: 8,
        };

        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/kmc`,
            datas,
            {
              headers: {
                "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
                "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("Error payment:", error);
        }

        setShowSuccessDialog(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      setShowErrDialog(true);
      console.error("Error while making POST request:", error);
      setIsLoading(false);
    }
  }

  function handleServiceChange(service: string) {
    if (service !== selectedService) {
      setSelectedService(service);
      reset({
        bookingNumber: "",
        mobileNumber: "",
        clientName: "",
      });
    }
  }

  const availableDoorsCount = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_GET_AVAILABLE_DOORS as string,
        {
          headers: {
            "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
            "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAvailableDoors(response.data.data.locker.available);
      }
      setIsLoadingDoor(false);
    } catch (error) {
      setIsLoadingDoor(true);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 416) {
          setErrorDoor("No available doors");
        }
      }
      setIsLoadingDoor(false);
    }
  };

  const addCart = () => {
    if (doorCount < availableDoors) setDoorCount((prev) => prev + 1);
  };

  const subtractCart = () => {
    if (doorCount > 1) {
      setDoorCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[500px]">
              <CardHeader>
                <CardTitle>Book a Locker</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Form reset={reset} {...form}>
                  <form
                    onSubmit={
                      showBtn
                        ? form.handleSubmit(createLocker)
                        : form.handleSubmit(onSubmit)
                    }
                    className="space-y-8"
                  >
                    <div className="grid gap-2 gap-y-6">
                      <div className="gap-y-2 grid">
                        <div className="flex font-bold text-xs">
                          <h6 className="me-1">Service</h6>
                          <span className="text-primary">*</span>
                        </div>
                      </div>

                      {!lockerQty ? (
                        <>
                          <div className="grid grid-cols-2 gap-2">
                            <div
                              className={`outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2 ${
                                selectedService === "serviced-office"
                                  ? "outline outline-primary outline-1 rounded p-4 grid gap-y-2"
                                  : ""
                              }`}
                              onClick={() => {
                                handleServiceChange("serviced-office");
                                setHide(false);
                                setLockerQty(false);
                                setShowBtn(false);
                                setDoorCount(1);
                              }}
                            >
                              <Image
                                src={
                                  selectedService === "serviced-office"
                                    ? SOActiveIcon
                                    : SOIcon
                                }
                                alt="SO Icon"
                                width={24}
                                height={25}
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
                              onClick={() => {
                                handleServiceChange("coworking-virtual");
                                setHide(false);
                                setLockerQty(false);
                                setShowBtn(false);
                                setDoorCount(1);
                              }}
                            >
                              <Image
                                src={
                                  selectedService === "coworking-virtual"
                                    ? CWActiveIcon
                                    : CWIcon
                                }
                                alt="CW Icon"
                                width={24}
                                height={25}
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
                          {selectedService === "serviced-office" && (
                            <>
                              <FormField
                                control={form.control}
                                name="clientName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      <div className="flex font-bold text-xs">
                                        <h6 className="me-1">Client Name</h6>
                                        <span className="text-primary">*</span>
                                      </div>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                        placeholder="Client Name"
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
                                        <h6 className="me-1">
                                          POC Contact No.
                                        </h6>
                                        <span className="text-primary">*</span>
                                      </div>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                        placeholder="POC Contact #"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}

                          {selectedService === "coworking-virtual" && (
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
                                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
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
                                        <h6 className="me-1">Contact #</h6>
                                        <span className="text-primary">*</span>
                                      </div>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="md:text-xs text-md outline outline-gray-300 outline-1 rounded p-2"
                                        placeholder="Contact #"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedService === "serviced-office" ? (
                              <div
                                className={`outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2 ${
                                  selectedService === "serviced-office"
                                    ? "outline outline-primary outline-1 rounded p-4 grid gap-y-2"
                                    : ""
                                }`}
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
                            ) : (
                              <div
                                className={`outline outline-gray-300 outline-1 rounded p-4 grid gap-y-2 ${
                                  selectedService === "coworking-virtual"
                                    ? "outline outline-primary outline-1 rounded p-4 grid gap-y-2"
                                    : ""
                                }`}
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
                            )}
                          </div>

                          <div className="grid grid-cols-2 items-start justify-between w-full">
                            <div className="text-sm font-bold">Locker</div>

                            <div className="flex justify-end">
                              <div className="flex items-center justify-evenly">
                                <div
                                  onClick={subtractCart}
                                  className={
                                    doorCount > 1
                                      ? `bg-primary p-1 text-xs text-white rounded-full text-center`
                                      : `bg-gray-300 p-1 text-xs text-white rounded-full text-center`
                                  }
                                >
                                  <FaMinus />
                                </div>
                                <div className="font-bold text-sm mx-2 w-[30px] text-center truncate pe-none">
                                  {doorCount}
                                </div>
                                <div
                                  onClick={addCart}
                                  className={
                                    doorCount >= availableDoors
                                      ? `bg-gray-300 p-1 text-xs text-white rounded-full text-center`
                                      : `bg-primary p-1 text-xs text-white rounded-full text-center`
                                  }

                                  // disabled={quantity >= availableDoorsCount}
                                >
                                  <FaPlus />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/occupancy?status=vacant">
                          <button
                            type="button"
                            className="w-full text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize"
                          >
                            Cancel
                          </button>
                        </Link>

                        <button
                          type="submit"
                          className="text-xs bg-primary text-white p-2 rounded capitalize flex justify-center items-center"
                        >
                          {isLoading ? (
                            <FaSpinner className="animate-spin text-center" />
                          ) : (
                            "Continue"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>

              {showSuccessDialog && (
                <AlertDialog defaultOpen>
                  <AlertDialogContent>
                    <AlertDialogHeader className="mb-10">
                      <AlertDialogTitle className="grid gap-y-2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={SuccessIcon}
                            width={32}
                            height={28}
                            alt="warning icon"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          Locker Book
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex items-center justify-center">
                        Locker 4 has been successfully booked to (Client Name)
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
                  <AlertDialogContent className="w-[80%] rounded">
                    <AlertDialogHeader className="mb-10">
                      <AlertDialogTitle className="grid gap-y-2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={DangerIcon}
                            width={48}
                            height={48}
                            alt="warning icon"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          No Match
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex items-center justify-center">
                        I&apos;m sorry we didn&apos;t find any match of the
                      </AlertDialogDescription>
                      <AlertDialogDescription className="flex items-center justify-center">
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
