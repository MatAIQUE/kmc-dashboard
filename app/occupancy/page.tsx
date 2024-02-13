"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RiArchiveDrawerLine } from "react-icons/ri";
import Nav from "../../components/ui/nav";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Locker, columns } from "./columns";
import { DataTable } from "./data-table";
import { IoDownload } from "react-icons/io5";
import { Input } from "../../components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "../../components/ui/skeleton";

async function getData(status: string) {
  try {
    const response = await fetch(
      `https://8920-110-54-134-139.ngrok-free.app/lockers/door/0003/kmc/query?location=one ayala&status=${status}`
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

  const status = searchParams.get("status") || "occupied";
  const doorNumberToFilter = searchParams.get("doorNumber"); // Get bookingId from URL query params

  // Fetch data based on whether doorNumber is provided or not
  const fetchData = doorNumberToFilter
    ? () => getFilteredData(status, doorNumberToFilter)
    : () => getData(status);

  useEffect(() => {
    // Fetch data when component mounts or when doorNumberToFilter changes
    fetchData();
  }, [doorNumberToFilter]);

  const { isLoading, isError, isFetching } = useQuery(
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
                      <IoDownload />
                    </button>
                  </div>
                </div>
                <div className="block md:hidden w-full">
                  <Input
                    placeholder="Name, Locker, Id"
                    className="min-w-full py-3 mb-2"
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
                    {/* Adjust the width of the DataTable container */}
                    <div className="w-full">
                      <DataTable
                        columns={columns}
                        data={dataOccupied}
                        isFetching={isFetching}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="vacant">
                    {isLoading ? (
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    ) : (
                      <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
                        {dataVacant.map((item) => (
                          <div
                            key={item.doorNumber}
                            className="col-span-3 md:col-span-1 mb-6"
                          >
                            <div className="w-full flex flex-col justify-between sm:h-auto">
                              <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative  justify-center">
                                <div className="flex items-start mt-3 justify-center">
                                  {/* <FaUserCircle className="h-10 w-10" /> */}
                                  <RiArchiveDrawerLine />
                                </div>
                                <div className="grid ms-2 col-span-2">
                                  <div>
                                    <p className="font-bold w-full">{`Locker - ${item.doorNumber}`}</p>
                                    <p className="opacity-80 w-full hidden md:block">
                                      Vacant
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OccupancyPage;
