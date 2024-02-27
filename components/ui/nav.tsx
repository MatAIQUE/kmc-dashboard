"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
import { FaBasketballBall, FaCog, FaUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import Toggle from "../toggle";
import Logo from "./logo";
import { useState } from "react";
import Image from "next/image";
import MenuIcon from "../../app/assets/icons/menu.svg"
import SignoutIcon from "../../app/assets/icons/signout.svg"
import Avatar from "../../app/assets/icons/Avatar.svg"
import { FaXmark } from "react-icons/fa6";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        navStatus: "disabled",
        icon: <MdOutlineDashboard />,
      },
      {
        title: "Occupancy",
        path: "/occupancy",
        navStatus: "active",
        icon: <RiArchiveDrawerLine />,
      },
      {
        title: "Advertisements",
        path: "/advertisement",
        navStatus: "disabled",
        icon: <CiImageOn />,
      },
      {
        title: "Configuration",
        path: "/configuration",
        navStatus: "active",
        icon: <FaCog />,
      },
    ],
  },
];

const Nav = () => {
  const router = useRouter();

  const pathname = usePathname();
  const [sidebarShown, setSidebarShow] = useState(false)

const showSidebar = () => {
  !sidebarShown ? setSidebarShow(true) : setSidebarShow(false)
}


  return (
    <>
      <div className="md:hidden fixed z-40 flex w-full justify-between pt-2 md:pt-0 items-center bg-white drop-shadow">
        <Logo/>
        <button type="button" className="inline-flex items-center p-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 " onClick={showSidebar}>
            <span className="sr-only">Open sidebar</span>
            <Image src={MenuIcon} alt="menu icon" width={24} height={24} />
        </button>
        </div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-50 md:w-64 w-full h-screen transition-transform sm:translate-x-0 ${!sidebarShown ? "-translate-x-full ":""}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between bg-white drop-shadow dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className="w-full border-b-[1.5px] pb-4 flex items-center justify-between">
              <Logo />
              <button className="p-4"  onClick={showSidebar}>
                <FaXmark className="text-gray-500"/>
              </button>
            </div>
            <div className="flex items-center md:hidden border-b-[1.5px] border-gray-300">
              <div className="p-4">
                <Image src={Avatar} alt="" width={42} height={42} />
              </div>
              <div className="grid">
                <div>
                  <h1 className="font-semibold text-lg">Jane Doe</h1>
                </div>
                <div>
                  <p className="text-primary text-sm font-light">
                    See your profile
                  </p>
                </div>
              </div>
            </div>

            {menuItems.map((cat, index) => (
              <li key={index} className={`h-full`}>
                {cat.list.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.path}
                    className={`flex items-center border-b-[1.5px] border-gray-300 px-2 py-4 md:border-0 mb-3 text-gray-900 md:rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                    ${pathname === item.path && "md:bg-gray-100" || 
                      item.navStatus === "disabled" && "pointer-events-none opacity-30"
                  }`}
                  >
                    <span className={`${pathname === item.path && "border-2 rounded me-2 py-2 border-primary w-[.5px]"}`}></span>
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
                <Image src={SignoutIcon} width={24} height={24} alt="signout icon" />
                <span className="ms-3 text-[#C5280C] font-semibold">Logout</span>
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
