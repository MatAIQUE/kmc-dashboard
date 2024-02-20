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
import { Locker, columns } from "./columns";
import { DataTable } from "./data-table";
import VacantLockers from "./data-vacant";
import { ActionCell } from "./action-cell";

import DownloadIcon from "../../app/assets/icons/download.svg";
import Image from "next/image";

async function getData(status: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/door/0003/kmc/query?location=one ayala&lockerId=4001&status=${status}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();
    return responseData.data.doors;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFilteredData(status: string, doorNumberToFilter: string) {
  const data = await getData(status);
  const filteredData = data.filter(
    (locker: any) => locker.doorNumber === doorNumberToFilter
  );
  console.log(filteredData); // Log the filtered data
  return filteredData;
}

const OccupancyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataOccupied, setDataOccupied] = useState<Locker[]>([]);
  const [dataVacant, setDataVacant] = useState<Locker[]>([]);

  const status = searchParams?.get("status") || "occupied";
  const doorNumberToFilter = searchParams?.get("doorNumber");

  const fetchData = doorNumberToFilter
    ? () => getFilteredData(status, doorNumberToFilter)
    : () => getData(status);

  useEffect(() => {
    fetchData();
  }, [doorNumberToFilter]);

  const { isLoading, isError, isFetching, refetch } = useQuery(
    [status],
    () => getData(status),
    {
      onSuccess: (data) => {
        if (status === "occupied") {
          setDataOccupied(data);
        } else {
          setDataVacant(data);
        }
      },
    }
  );

  const changeStatus = (status: string) => {
    const url = `/occupancy?status=${status}`;
    console.log(status)
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
                <div className={`block md:hidden w-full ${status === "vacant" ? "hidden":""}`}>
                  <Input
                    placeholder="Name, ID, Locker"
                    className="min-w-full py-3 mb-2 md:text-xs text-md"
                  />
                </div>
                <Tabs defaultValue={status}>
                  <TabsList className="w-full md:w-auto">
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
                          ...columns,
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
                      <Button
                        onClick={() => router.push("/occupancy/create")}
                        className="btn rounded items-center p-2 md:p-4 text-white bg-primary  hover:bg-primary/90 text-xs md:text-md hidden md:flex"
                      >
                        <FaPlusCircle className="text-sm" />
                        <p className="md:ml-3 text-xs ml-1">Book Locker</p>
                      </Button>
                    </div>
                    {isLoading ? (
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    ) : (
                      <VacantLockers dataVacant={dataVacant} />
                    )}
                  </TabsContent>
                </Tabs>

                {status === "occupied" && (
                  <div className="block md:hidden w-full">
                    {dataOccupied.map((data) => (
                      <div className="grid border-b-2 py-4 gap-y-2">
                        <div>
                          <p className="text-[12px] uppercase opacity-30">
                            L{data.doorNumber}
                          </p>
                        </div>
                        <div className="flex items-center py-2">
                          <span
                            className={`${
                              data.status === 8 ? "bg-blue-500 " : "bg-primary"
                            } rounded-full h-2 w-2 me-2`}
                          />
                          <h1 className="font-bold">{data.name}</h1>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="capitalize">
                            <p className="text-[12px] opacity-60">
                              {data.service}
                            </p>
                          </div>
                          <div className="uppercase text-right">
                            <p className="text-[12px] opacity-60">
                              {data.bookingId}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`fixed bottom-0 left-0 h-[60px] w-full flex items-center justify-center p-4 transition-transform ${status === "occupied" ? "translate-y-full":""}`}>
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
