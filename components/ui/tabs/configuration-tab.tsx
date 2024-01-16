import Image from "next/image";
import ConfigurationIcon from "../../../app/assets/icons/configuration.svg"


const ConfigurationTab = () => {
    return (
        <>
        <button className="w-full sm:p-0 sm:py-3 p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={ConfigurationIcon}
        alt="Configuration Icon"
        width={25}
        height={25}
        className="sm:w-3"
        />
            <p className="ms-4 sm:ms-1 font-medium sm:text-xs">Configuration</p>
        </button>
        </>
    )
}

export default ConfigurationTab