"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
import { FaCog } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import Toggle from "../toggle";
import Logo from "./logo";
import AdsIcon from "../../app/assets/ads-icon";
import OccupancyIcon from "../../app/assets/occupancy-icon";
import DashboardIcon from "../../app/assets/dashboard-icon";
import ConfigurationIcon from "../../app/assets/configuration-icon";

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
    </>
  );
};
export default Nav;
