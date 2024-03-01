import Image from "next/image"
import AdsIconImage from "../../app/assets/icons/ads.svg"

const AdsIcon = () => {
    return (
    <Image src={AdsIconImage} width={20} height={20} alt=""/>
    )
}

export default AdsIcon