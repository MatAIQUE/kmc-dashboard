import Image from "next/image";
import DashboardIcon from "../../../app/assets/icons/dashboard.svg"


const DashboardTab = () => {
    return (
        <>
        <button className="w-full sm:p-0 sm:py-3 p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={DashboardIcon}
        alt="Dashboard Icon"
        width={25}
        height={25}
        className="sm:w-3"
        />
            <p className="ms-4 sm:ms-1 font-medium sm:text-xs">Dashboard</p>
        </button>
        </>
    )
}

export default DashboardTab