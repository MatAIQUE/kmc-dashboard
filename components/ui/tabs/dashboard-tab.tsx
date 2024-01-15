import Image from "next/image";
import DashboardIcon from "../../../app/assets/icons/dashboard.svg"


const DashboardTab = () => {
    return (
        <>
        <button className="btn w-full p-4 rounded bg-secondary items-center flex hover:bg-secondary">
        <div className="w-0.5 h-5 bg-primary rounded me-2"></div>
        <Image
        src={DashboardIcon}
        alt="Dashboard Icon"
        width={25}
        height={25}
        />
            <p className="ms-4 font-medium">Dashboard</p>
        </button>
        </>
    )
}

export default DashboardTab