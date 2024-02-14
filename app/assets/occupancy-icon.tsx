import Image from "next/image"
import OccupancyIconImage from "../../app/assets/icons/occupancy.svg"

const OccupancyIcon = () => {
    return (
    <Image src={OccupancyIconImage} width={20} height={20} alt=""/>
    )
}

export default OccupancyIcon