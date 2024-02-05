"use client";
import {
  FaDownload,
  FaEllipsisH,
  FaEllipsisV,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import Nav from "../../components/ui/nav";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { IoDownloadOutline } from "react-icons/io5";
import { RiArchiveDrawerLine } from "react-icons/ri";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "Occupied",
      locker: "LO1",
      service: "Coworking Space",
      bookingId: "KMC-0001",
      name: "Charles Gomez",
      from: "Jan 01, 2023",
      to: "Dec 30 , 2024",
    },
    {
      id: "adsfasdf",
      status: "Occupied",
      locker: "LO1",
      service: "Coworking Space",
      bookingId: "KMC-0001",
      name: "Charles Gomez",
      from: "Jan 01, 2023",
      to: "Dec 30 , 2024",
    },
    {
      id: "728easdfad52f",
      status: "Occupied",
      locker: "LO1",
      service: "Coworking Space",
      bookingId: "KMC-0001",
      name: "Charles Gomez",
      from: "Jan 01, 2023",
      to: "Dec 30 , 2024",
    },

    // ...
  ];
}

const OccupancyPage = async () => {
  const data = await getData();

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
                  <div className="md:col-span-2 justify-end flex">
                    <button className="btn rounded items-center p-2 md:p-4 text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md">
                      <IoDownloadOutline />
                      <p className="md:ml-3 text-xs ml-1">Download Report</p>
                    </button>
                  </div>
                  <div className="relative flex items-center mt-4 md:mt-0 col-span-2 md:col-span-1">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border text-gray-900 md:text-sm appearance-none rounded-lg focus:outline-none focus:outline-ring-primary focus:border-primary w-full ps-10 p-2.5"
                      placeholder="Name, Locker, ID"
                    />
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
                      <DataTable columns={columns} data={data} />
                    </div>
                  </TabsContent>
                  <TabsContent value="vacant">
                    <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
                      <div className="col-span-3 md:col-span-1 mb-6">
                        <div className="w-full flex flex-col justify-between sm:h-auto">
                          <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
                            <div className="flex items-start mt-3 justify-center">
                              {/* <FaUserCircle className="h-10 w-10" /> */}
                              <RiArchiveDrawerLine />
                            </div>
                            <div className="grid ms-2 col-span-2">
                              <div>
                                <p className="font-bold w-full">Locker - 05</p>
                                <p className="opacity-80 w-full hidden md:block">
                                  Vacant
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-1 mb-6">
                        <div className="w-full flex flex-col justify-between sm:h-auto">
                          <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
                            <div className="flex items-start mt-3 justify-center">
                              {/* <FaUserCircle className="h-10 w-10" /> */}
                              <RiArchiveDrawerLine />
                            </div>
                            <div className="grid ms-2 col-span-2">
                              <div>
                                <p className="font-bold w-full">Locker - 05</p>
                                <p className="opacity-80 w-full hidden md:block">
                                  Vacant
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-1 mb-6">
                        <div className="w-full flex flex-col justify-between sm:h-auto">
                          <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
                            <div className="flex items-start mt-3 justify-center">
                              {/* <FaUserCircle className="h-10 w-10" /> */}
                              <RiArchiveDrawerLine />
                            </div>
                            <div className="grid ms-2 col-span-2">
                              <div>
                                <p className="font-bold w-full">Locker - 05</p>
                                <p className="opacity-80 w-full hidden md:block">
                                  Vacant
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-1 mb-6">
                        <div className="w-full flex flex-col justify-between sm:h-auto">
                          <div className="grid grid-cols-3 bg-white md:drop-shadow-md rounded-xl p-4 relative flex justify-center">
                            <div className="flex items-start mt-3 justify-center">
                              {/* <FaUserCircle className="h-10 w-10" /> */}
                              <RiArchiveDrawerLine />
                            </div>
                            <div className="grid ms-2 col-span-2">
                              <div>
                                <p className="font-bold w-full">Locker - 05</p>
                                <p className="opacity-80 w-full hidden md:block">
                                  Vacant
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
