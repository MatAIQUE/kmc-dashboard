"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle, FaTrash, FaUserCircle } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import Nav from "../../components/ui/nav";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import WarningIcon from "./../assets/icons/warning-icon.svg";

const formSchema = z.object({
  role: z.enum(["", "admin", "ads_manager", "member"]).refine(
    (value) => {
      return value !== null && value !== undefined;
    },
    { message: "Role is required" }
  ),
});

const roles = [
  { value: "admin", label: "Admin" },
  { value: "ads_manager", label: "Ads Manager" },
  { value: "member", label: "Member" },
];

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const ConfigurationPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownShown, setDropdownShown] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>("");

  const searchParams = useSearchParams();
  const tab = searchParams?.get("pricing") || "users";
  const observer = useRef<IntersectionObserver>();

  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        ...values,
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${dropdownShown}/role`,
        data,
        {
          headers: {
            "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
            "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setIsLoading(true);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          console.error("User already exists.");
        }
      }
      setIsLoading(false);
      console.error("Error while making POST request:", error);
    }

    setDropdownShown(null);
  }

  // async function onDelete(values: z.infer<typeof formSchema>) {
  //   try {
  //     setIsLoading(true);
  //     const data = {
  //       ...values,
  //     };

  //     await axios.patch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${dropdownShown}/role`,
  //       data,
  //       {
  //         headers: {
  //           "x-api-key": "pk-79ccd394-0be5-40ea-a527-8f27098db549",
  //           "x-api-secret": "sk-fcb71bfd-7712-4969-a46b-6b78f8a47bd2",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     setIsLoading(true);
  //     if (axios.isAxiosError(error) && error.response) {
  //       if (error.response.status === 409) {
  //         console.error("User already exists.");
  //       }
  //     }
  //     setIsLoading(false);
  //     console.error("Error while making POST request:", error);
  //   }

  //   setDropdownShown(null);
  // }

  const changeTab = (status: string) => {
    const url = `/configuration?tab=${tab}`;
    router.push(url);
  };

  const ShowDropdown = (id: string) => {
    setDropdownShown((prevId) => (prevId !== id ? id : null));
  };

  useEffect(() => {
    getUserData();
    observer.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (observer.current && users.length > 0) {
      const lastUserElement = document.getElementById(
        `user-${users.length - 1}`
      );
      if (lastUserElement) {
        observer.current.observe(lastUserElement);
      }
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [tab, page, limit]);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/query?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...responseData.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col justify-between h-screen p-2">
        <div className="p-2 pt-10 md:pt-10 sm:ml-64 relative">
          <div className="rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
              <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow">
                <div className="py-4 px-6">
                  <div className="grid md:grid-cols-4 md:gap-2 grid-cols-2 p-2">
                    <div className="flex items-center md:justify-start justify-between">
                      <h1 className="md:text-xl font-bold capitalize text-sm">
                        Occupancy
                      </h1>
                    </div>
                  </div>
                  <Tabs defaultValue={tab}>
                    <TabsList className="w-full md:w-auto">
                      <TabsTrigger
                        value="users"
                        onClick={() => changeTab("users")}
                        className="w-full md:w-auto"
                      >
                        Users
                      </TabsTrigger>
                      <TabsTrigger
                        value="pricing"
                        onClick={() => changeTab("pricing")}
                        className="w-full md:w-auto"
                      >
                        Pricing
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="users">
                      <div className="md:me-4 md:col-start-4 flex justify-end">
                        <Link href="/configuration/add-user">
                          <Button className="btn rounded items-center p-2 md:p-4 text-white bg-primary  hover:bg-primary/90 text-xs md:text-md hidden md:flex">
                            <FaPlusCircle className="text-sm" />
                            <p className="md:ml-3 text-xs ml-1">Add User</p>
                          </Button>
                        </Link>
                      </div>
                      <div className="w-full">
                        <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
                          {users.map((user, index) => (
                            <div
                              key={user._id}
                              className="col-span-3 md:col-span-1 mb-6"
                            >
                              <div className="w-full flex flex-col justify-between sm:h-auto">
                                <div className="grid grid-cols-4 bg-white md:drop-shadow-md rounded-xl p-4 relative  justify-center">
                                  <div className="flex items-start mt-3 justify-center">
                                    <FaUserCircle className="h-10 w-10" />
                                  </div>
                                  <div className="grid ms-2 col-span-2">
                                    <div>
                                      <p className="font-bold w-full">
                                        {user.firstName} {user.lastName}
                                      </p>
                                      <p className="opacity-80 w-full hidden md:block text-sm">
                                        {user.email}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="w-full mt-2">{user.role}</p>
                                    </div>
                                  </div>
                                  <div className="absolute top-0 right-0 p-4">
                                    {/* DROPDOWN TRIGGER */}

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-8 w-8 p-0"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => {
                                            ShowDropdown(user._id);
                                            setAction("role");
                                          }}
                                        >
                                          <FaArrowRotateRight className="text-sm me-2" />
                                          Change Role
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          onClick={() => {
                                            ShowDropdown(user._id);
                                            setAction("user");
                                          }}
                                        >
                                          <FaTrash className="text-red-800 text-sm me-2" />
                                          <span className="text-red-800">
                                            Remove User
                                          </span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                    {/*END OF DROPDOWN TRIGGER */}
                                    {/* DROPDOWN CONTENT */}
                                    <div
                                      className={` w-full mt-1 z-50 ${
                                        dropdownShown === user._id
                                          ? "block"
                                          : "hidden"
                                      }`}
                                    >
                                      <div
                                        className={`w-auto rounded right-0 absolute bg-white ${
                                          dropdownShown ? "drop-shadow" : ""
                                        }`}
                                      >
                                        <div className="mw-auto">
                                          {dropdownShown === user._id &&
                                            action === "role" && (
                                              <AlertDialog defaultOpen>
                                                <AlertDialogContent className="rounded w-[90%]">
                                                  <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-left">
                                                      Change role?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-left gap-y-4 grid">
                                                      Select a new role for{" "}
                                                      {user.email}
                                                      <p className="text-black text-left">
                                                        Role{" "}
                                                        <span className="text-destructive">
                                                          *
                                                        </span>
                                                      </p>
                                                      <Form {...form}>
                                                        <form
                                                          onSubmit={form.handleSubmit(
                                                            onSubmit
                                                          )}
                                                          className="space-y-8"
                                                        >
                                                          <div className="grid gap-2 gap-y-6">
                                                            <>
                                                              <FormField
                                                                control={
                                                                  form.control
                                                                }
                                                                name="role"
                                                                render={({
                                                                  field,
                                                                }) => (
                                                                  <FormItem>
                                                                    <Select
                                                                      onValueChange={
                                                                        field.onChange
                                                                      }
                                                                      defaultValue={
                                                                        field.value
                                                                      }
                                                                    >
                                                                      <FormControl>
                                                                        <SelectTrigger>
                                                                          <SelectValue placeholder="Select a role" />
                                                                        </SelectTrigger>
                                                                      </FormControl>
                                                                      <SelectContent>
                                                                        {roles.map(
                                                                          (
                                                                            role
                                                                          ) => (
                                                                            <SelectItem
                                                                              key={
                                                                                role.value
                                                                              }
                                                                              value={
                                                                                role.value
                                                                              }
                                                                            >
                                                                              {
                                                                                role.label
                                                                              }
                                                                            </SelectItem>
                                                                          )
                                                                        )}
                                                                      </SelectContent>
                                                                    </Select>

                                                                    <FormMessage />
                                                                  </FormItem>
                                                                )}
                                                              />
                                                            </>
                                                          </div>

                                                          <div className="w-full grid grid-cols-2 gap-3">
                                                            <AlertDialogCancel className="w-full my-0">
                                                              Cancel
                                                            </AlertDialogCancel>

                                                            <button
                                                              type="submit"
                                                              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full my-0"
                                                            >
                                                              {isLoading
                                                                ? "Loading..."
                                                                : "Save Changes"}
                                                            </button>
                                                          </div>
                                                        </form>
                                                      </Form>
                                                    </AlertDialogDescription>
                                                  </AlertDialogHeader>
                                                </AlertDialogContent>
                                              </AlertDialog>
                                            )}

                                          {dropdownShown === user._id &&
                                            action === "user" && (
                                              <AlertDialog defaultOpen>
                                                <AlertDialogContent className="rounded w-[90%]">
                                                  <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-center flex flex-col items-center">
                                                      <Image
                                                        className="mb-2"
                                                        src={WarningIcon}
                                                        width={48}
                                                        height={48}
                                                        alt="warning icon"
                                                      />
                                                      Remove user?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-center gap-y-4 grid">
                                                      Are you sure you want to
                                                      remove keme access to
                                                      locker keme
                                                    </AlertDialogDescription>
                                                  </AlertDialogHeader>
                                                  <AlertDialogFooter className="w-full grid grid-cols-2 my-0 gap-2">
                                                    <AlertDialogCancel className="w-full my-0">
                                                      No
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction className="w-full my-0 bg-[#C5280C] hover:bg-[#C5280C] hover:opacity-80 text-white">
                                                      Yes, Remove
                                                    </AlertDialogAction>
                                                  </AlertDialogFooter>
                                                </AlertDialogContent>
                                              </AlertDialog>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* END OF DROPDOWN CONTENT */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="pricing">
                      <div>Pricing</div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 h-[60px] w-full flex items-center justify-center p-4">
          <Button
            onClick={() => router.push("/configuration/add-user")}
            className="btn rounded  w-full text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md md:hidden  items-center justify-center"
          >
            <FaPlusCircle className="text-sm" />
            <p className="md:ml-3 text-xs ml-1">Add User</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfigurationPage;
