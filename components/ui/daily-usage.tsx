"use client"
import { FaDownload, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";


const DailyUsage = () => {
    const router = useRouter();

    return (
        <div className="py-4 px-6">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="md:text-xl font-bold capitalize text-sm">Daily Usage</h1>
                <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
                    <FaDownload className="text-xs md:text-lg"/>
                </button>
                <button className="p-4 md:hidden block">
                    <FaChevronRight onClick={() => router.push('/')}/>
                </button>
            </div>
            <hr/>
            {/* content */}
            <div className="flex w-full justify-center py-40 items-center">
                <div className="p-4">
                    Graph
                </div>
            </div>
            {/* legends */}
        </div>
    )
}
export default DailyUsage