import { FaChevronRight, FaDownload } from "react-icons/fa"
import AdvertisementsSection from "./advertisements"
import DailyUsage from "./daily-usage"
import OccupancySection from "./occupancy"

const MainContainer = () => {
    return (
        // <div className="text-black w-full flex flex-col items-center mx-0 md:ml-64 px-3 my-5 gap-y-2">
        //     <OccupancySection/>
        //     <DailyUsage/>
        //     <AdvertisementsSection/>
        // </div>
        
        // <div className="
        // md:container
        // container-none

        // ml-32
        // md:ml-64

        // mt-20
        // md:mt-5
        
        // grid
        // grid-cols-3

        // md:grid-cols-8

        // gap-2
        // my-5
        // px-2"
        // >
        //     <div className="md:col-start-2 col-span-4">
        //         <DailyUsage/>
        //     </div>
        //     <div className="md:col-span-3 col-span-3">
        //         <OccupancySection/>
        //     </div>
        //     <div className="md:col-start-2 col-span-7">
        //         <AdvertisementsSection/>
        //     </div>
        // </div>
        <div className="p-2 pt-10 md:pt-10 sm:ml-64">
            <div className="rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2 col-span-3 h-auto rounded bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <DailyUsage/>
                    </div>
                    <div className="md:col-span-1 col-span-3 h-auto rounded bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <OccupancySection/>
                    </div>
                    <div className="col-span-3 h-auto rounded bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <AdvertisementsSection/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainContainer