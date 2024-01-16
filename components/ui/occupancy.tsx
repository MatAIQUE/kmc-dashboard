import { FaDownload, FaChevronRight } from "react-icons/fa";


const OccupancySection = () => {
    return (
        <div className="py-4 px-6">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="md:text-xl font-bold capitalize text-sm">Occupancy</h1>
                <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
                    <FaDownload className=" md:text-lg"/>
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
                <ul className="flex justify-evenly w-full px-5 sm:flex-col md:flex-row">
                    <li className="flex items-center sm:w-full sm:justify-center sm:justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full me-2 sm:w-2 sm:h-2"></div>
                        <p className="sm:text-xs">Occupied</p>
                    </li>
                    <li className="flex items-center sm:w-full sm:justify-center sm:justify-center">
                        <div className="w-3 h-3 bg-info rounded-full me-2 sm:w-2 sm:h-2"></div>
                        <p className="sm:text-xs">Reserved</p>
                    </li>
                    <li className="flex items-center sm:w-full sm:justify-center sm:justify-center">
                        <div className="w-3 h-3 bg-success rounded-full me-2 sm:w-2 sm:h-2"></div>
                        <p className="sm:text-xs">Available</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default OccupancySection