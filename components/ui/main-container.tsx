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
        
        <div className="md:container container-none mt-20 md:mt-5 grid grid-cols-3 gap-2 my-5 px-2">
            <div className="md:col-span-2 col-span-3">
                <DailyUsage/>
            </div>
            <div className="md:col-span-1 col-span-3">
                <OccupancySection/>
            </div>
            <div className="col-span-3">
                <AdvertisementsSection/>
            </div>
        </div>
    )
}
export default MainContainer