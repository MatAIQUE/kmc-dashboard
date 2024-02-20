"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
import { FaBasketballBall, FaCog } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import Toggle from "../toggle";
import Logo from "./logo";
import AdsIcon from "../../app/assets/ads-icon";
import OccupancyIcon from "../../app/assets/occupancy-icon";
import DashboardIcon from "../../app/assets/dashboard-icon";
import ConfigurationIcon from "../../app/assets/configuration-icon";
import { useState } from "react";
import Image from "next/image";
import MenuIcon from "../../app/assets/icons/menu.svg";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        title: "Occupancy",
        path: "/occupancy",
        icon: <OccupancyIcon />,
      },
      {
        title: "Advertisements",
        path: "/advertisement",
        icon: <AdsIcon />,
      },
      {
        title: "Configuration",
        path: "/configuration",
        icon: <ConfigurationIcon />,
      },
    ],
  },
];

const Nav = () => {
  const router = useRouter();

  const pathname = usePathname();
  const [sidebarShown, setSidebarShow] = useState(false);

  const showSidebar = () => {
    !sidebarShown ? setSidebarShow(true) : setSidebarShow(false);
  };

  return (
    <>
      <div className="md:hidden fixed z-40 flex w-full justify-between pt-2 md:pt-0 items-center bg-white drop-shadow">
        <Logo />
        <button
          type="button"
          className="inline-flex items-center p-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 "
          onClick={showSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Image src={MenuIcon} alt="menu icon" width={24} height={24} />
        </button>
      </div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform sm:translate-x-0 ${
          !sidebarShown ? "-translate-x-full " : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between bg-white drop-shadow dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className="w-full mb-10 hidden md:block">
              <Logo />
            </div>

            {menuItems.map((cat, index) => (
              <li key={index}>
                {cat.list.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.path}
                    className={`flex items-center p-2 mb-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                    ${pathname === item.path && "bg-gray-100"}`}
                  >
                    {item.icon}
                    <span className="ms-3">{item.title}</span>
                  </Link>
                ))}
              </li>
            ))}
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => router.push("/")}
              >
                <PiSignOut />
                <span className="ms-3 text-destructive">Signout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="pb-[50px]"></div>
    </>
  );
};
export default Nav;
