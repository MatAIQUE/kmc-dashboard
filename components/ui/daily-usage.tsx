"use client";
import { FaDownload, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Charts from "./charts";

const DailyUsage = () => {
  const router = useRouter();

  return (
    <div className="py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-bold capitalize text-sm">
          Usage history
        </h1>
        <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
          <FaDownload className="text-xs md:text-lg" />
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
