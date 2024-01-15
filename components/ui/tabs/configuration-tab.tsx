import Image from "next/image";
import ConfigurationIcon from "../../../app/assets/icons/configuration.svg"


const ConfigurationTab = () => {
    return (
        <>
        <button className="w-full p-4 rounded items-center flex hover:bg-secondary">
        <Image
        src={ConfigurationIcon}
        alt="Dashboard Icon"
        width={25}
        height={25}
        />
            <p className="ms-4 font-medium">Configuration</p>
        </button>
        </>
    )
}

export default ConfigurationTab