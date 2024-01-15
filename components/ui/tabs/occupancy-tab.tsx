import Image from "next/image";
import OccupancyIcon from "../../../app/assets/icons/occupancy.svg"


const OccupancyTab = () => {
    return (
        <>
        <button className="w-full p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={OccupancyIcon}
        alt="Occupancy Icon"
        width={25}
        height={25}
        />
            <p className="ms-4 font-medium">Occupancy</p>
        </button>
        </>
    )
}

export default OccupancyTab