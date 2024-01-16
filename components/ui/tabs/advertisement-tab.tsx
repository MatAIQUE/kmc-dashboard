import Image from "next/image";
import AdvertisementIcon from "../../../app/assets/icons/ads.svg"


const AdvertisementTab = () => {
    return (
        <>
        <button className="w-full p-0 py-3 md:p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={AdvertisementIcon}
        alt="Advertisement Icon"
        width={25}
        height={25}
        className="w-3 md:w-5"
        />
            <p className="md:ms-4 ms-1 font-medium md:text text-xs">Advertisements</p>
        </button>
        </>
    )
}

export default AdvertisementTab