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
        
        <div className="
        md:container
        container-none

        ml-32
        md:ml-64

        mt-20
        md:mt-5
        
        grid
        grid-cols-3

        md:grid-cols-8

        gap-2
        my-5
        px-2"
        >
            <div className="md:col-start-2 col-span-4">
                <DailyUsage/>
            </div>
            <div className="md:col-span-3 col-span-3">
                <OccupancySection/>
            </div>
            <div className="md:col-start-2 col-span-7">
                <AdvertisementsSection/>
            </div>
        </div>
    )
}
export default MainContainer