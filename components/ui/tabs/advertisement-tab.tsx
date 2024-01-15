import Image from "next/image";
import AdvertisementIcon from "../../../app/assets/icons/ads.svg"


const AdvertisementTab = () => {
    return (
        <>
        <button className="w-full p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={AdvertisementIcon}
        alt="Dashboard Icon"
        width={25}
        height={25}
        />
            <p className="ms-4 font-medium">Advertisements</p>
        </button>
        </>
    )
}

export default AdvertisementTab