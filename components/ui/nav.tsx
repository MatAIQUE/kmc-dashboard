"use client";
import Toggle from "../toggle";
import Image from "next/image";
import DashboardIcon from "../../app/assets/icons/dashboard.svg";
import OccupancyIcon from "../../app/assets/icons/occupancy.svg";
import AdvertisementIcon from "../../app/assets/icons/ads.svg";
import ConfigurationIcon from "../../app/assets/icons/configuration.svg";
import SignOutIcon from "../../app/assets/icons/signout.svg";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();

  return (
    <>
      <Toggle />
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between bg-white drop-shadow dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className="w-full mb-10 hidden md:block">
              <Logo />
            </div>

            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Image
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Dashboard Icon"
                  width={25}
                  height={25}
                  src={DashboardIcon}
                />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/occupancy"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Image
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Occupancy Icon"
                  width={25}
                  height={25}
                  src={OccupancyIcon}
                />
                <span className="ms-3">Occupancy</span>
              </Link>
            </li>
            <li>
              <Link
                href="/advertisement"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Image
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Advertisement Icon"
                  width={25}
                  height={25}
                  src={AdvertisementIcon}
                />
                <span className="ms-3">Advertisements</span>
              </Link>
            </li>
            <li>
              <Link
                href="/configuration"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Image
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Configuration Icon"
                  width={25}
                  height={25}
                  src={ConfigurationIcon}
                />
                <span className="ms-3">Configuration</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => router.push("/")}
              >
                <Image
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Dashboard Icon"
                  width={25}
                  height={25}
                  src={SignOutIcon}
                />
                <span className="ms-3 text-destructive">Signout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Nav;
