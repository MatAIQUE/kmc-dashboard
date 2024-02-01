"use client";
import { FaDownload, FaSearch } from "react-icons/fa";
import Nav from "../../components/ui/nav";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

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
                    <button className="md:p-4 md:block hover:bg-secondary rounded-lg p-2">
                      <FaDownload className=" md:text-lg" />
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

                {/* Content Table */}
                <div className="flex w-full justify-start items-start">
                  <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full md:w-auto">
                    <ul className="grid grid-cols-2">
                      <li className="md:me-2">
                        <a
                          href="#"
                          className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >
                          Occupied
                        </a>
                      </li>
                      <li className="md:me-2">
                        <a
                          href="#"
                          className="inline-block p-4 text-primary border-b-2 border-primary rounded-t-lg dark:text-primary dark:border-blue-500"
                          aria-current="page"
                        >
                          Vacant
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <DataTable columns={columns} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OccupancyPage;
