import Image from "next/image"
import ConfigurationIconImage from "../../app/assets/icons/configuration.svg"

const ConfigurationIcon = () => {
    return (
    <Image src={ConfigurationIconImage} width={20} height={20} alt=""/>
    )
}

export default ConfigurationIcon