"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

async function getData(status: string) {
  const response = await fetch(
    `https://8920-110-54-134-139.ngrok-free.app/lockers/door/0003/kmc/query?location=one ayala&status=${status}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const responseData = await response.json();
  return responseData.data.locker.availableDoors;
}

const OccupancyPage = () => {
  const [dataOccupied, setDataOccupied] = useState<Locker[]>([]);
  const [dataVacant, setDataVacant] = useState<Locker[]>([]);

  const { isLoading: isLoadingOccupied, isError: isErrorOccupied } = useQuery(
    ["occupied"],
    () => getData("occupied"),
    {
      onSuccess: (data) => {
        setDataOccupied(data);
      },
    }
  );

  const { isLoading: isLoadingVacant, isError: isErrorVacant } = useQuery(
    ["vacant"],
    () => getData("vacant"),
    {
      onSuccess: (data) => {
        setDataVacant(data);
      },
    }
  );
  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
            <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
              <div className="py-4 px-6">
                <div className="grid md:grid-cols-4 md:gap-2 grid-cols-2 p-2">
                  <div className="flex items-center">
                    <h1 className="md:text-xl font-bold capitalize text-sm">
                      Occupancy
                    </h1>
                  </div>
                </div>

                <Tabs defaultValue="occupied">
                  <TabsList>
                    <TabsTrigger value="occupied">Occupied</TabsTrigger>
                    <TabsTrigger value="vacant">Vacant</TabsTrigger>
                  </TabsList>
                  <TabsContent value="occupied">
                    {/* Adjust the width of the DataTable container */}
                    <div className="w-full">
                      <DataTable columns={columns} data={dataOccupied} />
                    </div>
                  </TabsContent>
                  <TabsContent value="vacant">
                    <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
                      {dataVacant.map((item) => (
                        <div
                          key={item.doorId}
                          className="col-span-3 md:col-span-1 mb-6"
                        >
                          <div className="w-full flex flex-col justify-between sm:h-auto">
                            <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
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
