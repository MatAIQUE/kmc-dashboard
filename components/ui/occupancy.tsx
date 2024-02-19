"use client";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DoughnutChart from "./doughnut-chart";
import DownloadIcon from "../../app/assets/icons/download.svg"
import Image from "next/image";
const OccupancySection = () => {
  const router = useRouter();

  return (
    <div className="py-4 px-6">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-bold capitalize text-sm">Occupancy</h1>
        <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
          <Image src={DownloadIcon} width={24} height={24} alt="" className="md:text-lg"/>
        </button>
        <button className="p-4 md:hidden block">
          <FaChevronRight onClick={() => router.push("/occupancy")} />
        </button>
      </div>
      <hr />
      {/* content */}
      <div className="flex w-full justify-center mt-5 items-center">
        {/* <PieChart completed={40} remaining={10} total={50} /> */}
        <DoughnutChart/>
      </div>

      <div className="grid grid-cols-3 my-2">
        <div className="flex col-span-3 sm:col-span-1 items-center justify-center">
          <div className="w-2 h-2 md:w-2 md:h-2 bg-primary rounded-full me-2"></div>
          <p className="text-sm md:text">Occupied</p>
        </div>
        <div className="flex col-span-3 sm:col-span-1 items-center justify-center">
          <div className="w-2 h-2 md:w-2 md:h-2 bg-primary rounded-full me-2"></div>
          <p className="text-sm md:text">Reserved</p>
        </div>
        <div className="flex col-span-3 sm:col-span-1 items-center justify-center">
          <div className="w-2 h-2 md:w-2 md:h-2 bg-primary rounded-full me-2"></div>
          <p className="text-sm md:text">Available</p>
        </div>
      </div>
    </div>
  );
};
export default OccupancySection;
