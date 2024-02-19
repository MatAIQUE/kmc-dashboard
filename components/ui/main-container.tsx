import AdvertisementsSection from "./advertisements"
import DailyUsage from "./daily-usage"
import OccupancySection from "./occupancy"

const MainContainer = () => {
    return (
        <div className="p-2 pt-10 md:pt-10 sm:ml-64">
            <div className="rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
                    <div className="md:col-span-2 col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <DailyUsage/>
                    </div>
                    <div className="md:col-span-1 col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <OccupancySection/>
                    </div>
                    <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <AdvertisementsSection/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainContainer