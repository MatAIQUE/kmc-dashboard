import { FaDownload, FaChevronRight } from "react-icons/fa";


const DailyUsage = () => {
    return (
        <div className="w-full bg-white drop-shadow-md py-4 px-6 rounded-xl h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold capitalize">Daily Usage</h1>
                <button className="p-4 hidden md:block hover:bg-secondary rounded-lg">
                    <FaDownload/>
                </button>
                <button className="p-4 md:hidden block">
                    <FaChevronRight/>
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