import Image from "next/image"
import KMCLogo from "../../app/assets/img/Logo-2x.png"


const Logo = () => {
    return (
        <>
        {/* <Image
        className="hidden md:block sm:w-24"
        alt="KMC Logo"
        height={25}
        width={168}
        src={KMCLogo}
        />
        <Image
        className="md:hidden block"
        alt="KMC Logo"
        height={25}
        width={118}
        src={KMCLogo}
        /> */}
        <Image
        className="h-full"
        alt="KMC Logo"
        height={25}
        width={168}
        src={KMCLogo}
        />
        </>
    )
}

export default Logo