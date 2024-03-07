"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Nav from "../../components/ui/nav";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Locker, tableColumns } from "./columns";
import { DataTable } from "./data-table";
import VacantLockers from "./data-vacant";
import { ActionCell } from "./action-cell";
import DownloadIcon from "../../app/assets/icons/download.svg";
import Image from "next/image";
import Link from "next/link";
import MobileDataTable from "./mobile-data-table";
// import { getSession, useSession } from "next-auth/react";
import { fetchAuthenticatedData } from "@/lib/api";
// import { useSession } from "next-auth/react";

const OccupancyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataOccupied, setDataOccupied] = useState<Locker[]>([]);
  const [dataVacant, setDataVacant] = useState<Locker[]>([]);
  const status = searchParams?.get("status") || "occupied";

  async function getData(status: string) {
    // const { data } = useSession();
    // console.log({ data });
    try {
      // const sesh = useSession();/
      // const { data: session } = useSession();
      // console.log({ sesh });

      const response = await fetchAuthenticatedData(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/door/0003/kmc/query?location=one ayala&lockerId=4000&status=${status}`,
        "GET"
      );
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/door/0003/kmc/query?location=one ayala&lockerId=4000&status=${status}`
      // );

      console.log({ response });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch data");
      // }

      const responseData = await response.json();
      return responseData.data.doors || [];
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  }

  const { isLoading, isError, isFetching, refetch } = useQuery(
    [status],
    () => getData(status),
    {
      refetchInterval: false,
      onSuccess: (data) => {
        if (status === "occupied") {
          setDataOccupied(data || []);
        } else {
          setDataVacant(data || []);
        }
      },
    }
  );

  const changeStatus = (status: string) => {
    const url = `/occupancy?status=${status}`;
    router.push(url);
  };

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
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
                  <div className="flex justify-end md:hidden">
                    <button className="p-2">
                      <Image src={DownloadIcon} alt="" width={24} height={24} />
                    </button>
                  </div>
                </div>
                <div
                  className={`block md:hidden w-full ${
                    status === "vacant" ? "hidden" : ""
                  }`}
                >
                  <Input
                    placeholder="Name, ID, Locker"
                    className="min-w-full py-3 mb-2 md:text-xs text-md"
                  />
                </div>
                <Tabs defaultValue={status}>
                  <TabsList className="w-full !justify-start border-b-2 border-gray-300 p-0 !items-end">
                    <TabsTrigger
                      value="occupied"
                      onClick={() => changeStatus("occupied")}
                      className="w-full md:w-auto"
                    >
                      Occupied
                    </TabsTrigger>
                    <TabsTrigger
                      value="vacant"
                      onClick={() => changeStatus("vacant")}
                      className="w-full md:w-auto"
                    >
                      Vacant
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="occupied">
                    <div className="w-full">
                      <DataTable
                        columns={[
                          ...tableColumns,
                          {
                            id: "actions",
                            cell: ({ row }) => (
                              <ActionCell
                                locker={row.original}
                                onTerminate={refetch}
                              />
                            ),
                          },
                        ]}
                        data={dataOccupied}
                        isFetching={isFetching}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="vacant">
                    <div className="md:me-4 md:col-start-4 flex justify-end">
                      <Link href="/occupancy/create">
                        <Button className="btn rounded items-center p-2 md:p-4 text-white bg-primary  hover:bg-primary/90 text-xs md:text-md hidden md:flex">
                          <FaPlusCircle className="text-sm" />
                          <p className="md:ml-3 text-xs ml-1">Book Locker</p>
                        </Button>
                      </Link>
                    </div>
                    {isLoading ? (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-y-2">
                          <Skeleton className="w-[100px] h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                        </div>
                        <div className="grid gap-y-2">
                          <Skeleton className="w-[100px] h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                        </div>
                        <div className="grid gap-y-2">
                          <Skeleton className="w-[100px] h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                          <Skeleton className="w-full h-[20px] rounded-full" />
                        </div>
                      </div>
                    ) : (
                      <VacantLockers dataVacant={dataVacant} />
                    )}
                  </TabsContent>
                </Tabs>

                <MobileDataTable
                  status={status}
                  dataOccupied={dataOccupied}
                  onTerminate={refetch}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed bottom-0 left-0 h-[60px] w-full bg-white flex items-center justify-center p-4 transition-transform ${
            status === "occupied" ? "translate-y-full" : ""
          }`}
        >
          <Button
            onClick={() => router.push("/occupancy/create")}
            className="btn rounded items-center w-full text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md md:hidden justify-center"
          >
            <FaPlusCircle className="text-sm" />
            <p className="md:ml-3 text-xs ml-1">Book Locker</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default OccupancyPage;
