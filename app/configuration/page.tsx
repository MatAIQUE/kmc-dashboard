"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaPlusCircle,
  FaEllipsisV,
  FaEllipsisH,
  FaUserCircle,
} from "react-icons/fa";
import Nav from "../../components/ui/nav";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  _id: string;
  name: string;
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

  const searchParams = useSearchParams();
  const tab = searchParams?.get("pricing") || "users";
  const observer = useRef<IntersectionObserver>();

  const changeTab = (status: string) => {
    const url = `/configuration?tab=${tab}`;
    router.push(url);
  };

  const ShowDropdown = (id: string) => {
    setDropdownShown((prevId) => (prevId === id ? null : id));
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
                        <Button
                          onClick={() => router.push("/configuration/add-user")}
                          className="btn rounded items-center p-2 md:p-4 text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md hidden md:flex"
                        >
                          <FaPlusCircle className="text-sm" />
                          <p className="md:ml-3 text-xs ml-1">Add User</p>
                        </Button>
                      </div>
                      <div className="w-full">
                        <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
                          {users.map((user, index) => (
                            <div
                              key={user._id}
                              className="col-span-3 md:col-span-1 mb-6"
                            >
                              <div className="w-full flex flex-col justify-between sm:h-auto">
                                <div className="grid grid-cols-4 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
                                  <div className="flex items-start mt-3 justify-center">
                                    <FaUserCircle className="h-10 w-10" />
                                  </div>
                                  <div className="grid ms-2 col-span-2">
                                    <div>
                                      <p className="font-bold w-full">
                                        {user.name}
                                      </p>
                                      <p className="opacity-80 w-full hidden md:block">
                                        {user.email}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="w-full mt-2">Admin</p>
                                    </div>
                                  </div>
                                  <div className="absolute top-0 right-0 p-4">
                                    {/* DROPDOWN TRIGGER */}
                                    <div
                                      className="relative h-full w-full p-4 rounded hover:cursor-pointer hover:bg-gray-100"
                                      onClick={() => ShowDropdown(user._id)}
                                    >
                                      <div className="absolute w-full h-full top-0 left-0">
                                        <div className="flex items-center justify-center w-full h-full">
                                          <FaEllipsisH className="md:hidden" />
                                          <FaEllipsisV className="md:block hidden" />
                                        </div>
                                      </div>
                                    </div>
                                    {/*END OF DROPDOWN TRIGGER */}
                                    {/* DROPDOWN CONTENT */}
                                    <div
                                      className={`relative w-full mt-1 z-50 ${
                                        dropdownShown === user._id
                                          ? "block"
                                          : "hidden"
                                      }`}
                                    >
                                      <div className="w-auto rounded drop-shadow-xl right-0 absolute bg-white">
                                        <div className="mw-auto">
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <div className="whitespace-nowrap hover:bg-gray-100 hover:cursor-pointer px-4 py-3 text-sm">
                                                Change Role
                                              </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className=" rounded">
                                              <AlertDialogHeader>
                                                <AlertDialogTitle className="text-left">
                                                  Change role?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-left gap-y-4 grid">
                                                  Select a new role for asdasd
                                                  <hr />
                                                  <p className="text-black text-left">
                                                    Role{" "}
                                                    <span className="text-destructive">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Select>
                                                    <SelectTrigger className="w-full">
                                                      <SelectValue placeholder="Select a Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      <SelectItem value="light">
                                                        Light
                                                      </SelectItem>
                                                      <SelectItem value="dark">
                                                        Dark
                                                      </SelectItem>
                                                      <SelectItem value="system">
                                                        System
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter className="w-full mt-4 grid grid-cols-2">
                                                <AlertDialogCancel className="w-full">
                                                  Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction className="w-full">
                                                  Save Changes
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>

                                          <div className="whitespace-nowrap hover:bg-gray-100 hover:cursor-pointer px-4 py-3 text-sm text-destructive font-semibold">
                                            Remove User
                                          </div>
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
            className="btn rounded items-center w-full text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md md:hidden block flex items-center justify-center"
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
