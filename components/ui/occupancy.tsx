import { FaDownload, FaChevronRight } from "react-icons/fa";


const OccupancySection = () => {
    return (
        <div className="w-full bg-white drop-shadow-md py-4 px-6 rounded-xl h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold capitalize">Occupancy</h1>
                <button className="p-4 hidden md:block hover:bg-secondary rounded-lg">
                    <FaDownload/>
                </button>
                <button className="p-4 md:hidden block">
                    <FaChevronRight/>
                </button>
            </div>
            <hr/>
            {/* content */}
            <div className="flex w-full justify-center py-40  items-center">
                Pie Chart
            </div>
            {/* legends */}
            <div className="flex w-full justify-between">
                <ul className="flex justify-evenly w-full px-5">
                    <li className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full me-2"></div>Occupied
                    </li>
                    <li className="flex items-center">
                        <div className="w-3 h-3 bg-accent rounded-full me-2"></div>Link 2
                    </li>
                    <li className="flex items-center">
                        <div className="w-3 h-3 bg-black rounded-full me-2"></div>Link 3
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default OccupancySection