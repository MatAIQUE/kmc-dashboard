import Logo from "./logo"
import { FaBars } from "react-icons/fa";
import DashboardTab from "./tabs/dashboard-tab";
import OccupancyTab from "./tabs/occupancy-tab";
import SignoutTab from "./signout-tab";
import ConfigurationTab from "./tabs/configuration-tab";
import AdvertisementTab from "./tabs/advertisement-tab";


const ExpandedMenuTabs = () => {
    return (
        <>
        <div className="w-full mt-20 h-auto">
            <DashboardTab/>
            <OccupancyTab/>
            <AdvertisementTab/>
            <ConfigurationTab/>
            <SignoutTab/>
        </div>
        </>
    )
}

export default ExpandedMenuTabs