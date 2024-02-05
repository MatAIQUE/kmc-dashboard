import { FaPlusCircle, FaEllipsisV, FaInfoCircle } from "react-icons/fa";
import Nav from "../../components/ui/nav";
import Image from "next/image";
import SampleImage from "../../app/assets/img/kmc-ad-2.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";

const AdvertisementPage = () => {
  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
            <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
              <div className="py-4 px-6">
                <div className="grid md:grid-cols-4 grid-cols-2 py-4 flex items-center py-4">
                  <div>
                    <h1 className="md:text-xl font-bold capitalize text-sm">
                      Advertisements
                    </h1>
                  </div>
                  <div className="md:col-start-4 md:me-4 md:col-start-4 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="btn rounded items-center p-2 md:p-4 text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md">
                          <FaPlusCircle className="text-sm" />
                          <p className="md:ml-3 text-xs ml-1">New Ad</p>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                          Active
                        </a>
                      </li>
                      <li className="md:me-2">
                        <a
                          href="#"
                          className="inline-block p-4 text-primary border-b-2 border-primary rounded-t-lg dark:text-primary dark:border-blue-500"
                          aria-current="page"
                        >
                          Inactive
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full mt-2 grid grid-cols-3 gap-2">
                  <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                      <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                        <FaEllipsisV />
                      </button>
                      <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                      />
                      <h1 className="font-bold mt-4 text-xs md:mt-1">
                        Advertisement Title
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                      <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                        <FaEllipsisV />
                      </button>
                      <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                      />
                      <h1 className="font-bold mt-4 text-xs md:mt-1">
                        Advertisement Title
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                      <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                        <FaEllipsisV />
                      </button>
                      <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                      />
                      <h1 className="font-bold mt-4 text-xs md:mt-1">
                        Advertisement Title
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                      <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                        <FaEllipsisV />
                      </button>
                      <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                      />
                      <h1 className="font-bold mt-4 text-xs md:mt-1">
                        Advertisement Title
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                      <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                        <FaEllipsisV />
                      </button>
                      <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                      />
                      <h1 className="font-bold mt-4 text-xs md:mt-1">
                        Advertisement Title
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="my-5 text-xs text-center text-gray-400 flex items-center justify-center">
                  <span className="me-2">
                    <FaInfoCircle />
                  </span>
                  <p className="">Maximum of 5 Advertisements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisementPage;
