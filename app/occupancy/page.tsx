"use client";
import {
  FaChevronRight,
  FaDownload,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import Nav from "../../components/ui/nav";
import { useRouter } from "next/navigation";

const OccupancyPage = () => {
  const router = useRouter();

  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
            <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
              <div className="py-4 px-6">
                {/* <div className="grid grid-cols-4 py-4 flex items-center py-4">
                  <div>
                    <h1 className="md:text-xl font-bold capitalize text-sm">
                      Occupancy
                    </h1>
                  </div>
                  <div className="col-start-3 flex justify-end">
                    <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
                      <FaDownload className=" md:text-lg" />
                    </button>
                  </div>
                  <div className="md:col-start-4 md:me-4 col-start-4 flex justify-end">
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FaSearch />
                      </div>
                      <input
                        type="text"
                        id="input-group-1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                      />
                    </div>
                  </div>
                </div> */}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
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
                  <p className="text-sm"></p>
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
