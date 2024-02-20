"use client";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Charts from "./charts";
import Image from "next/image";
import DownloadIcon from "../../app/assets/icons/download.svg"

const DailyUsage = () => {
  const router = useRouter();

  return (
    <div className="py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-bold capitalize text-sm">
          Usage history
        </h1>
        <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
          <Image src={DownloadIcon} width={24} height={24} alt="" className="text-xs md:text-lg"/>
        </button>
        <button
          className="p-4 md:hidden block"
          onClick={() => router.push("/usage-history")}
        >
          <FaChevronRight />
        </button>
      </div>
      <hr />

      <Charts />
    </div>
  );
};
export default DailyUsage;
