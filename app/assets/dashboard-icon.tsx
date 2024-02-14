import Image from "next/image"
import DashboardIconImage from "../../app/assets/icons/dashboard.svg"

const DashboardIcon = () => {
    return (
    <Image src={DashboardIconImage} width={20} height={20} alt=""/>
    )
}

export default DashboardIcon