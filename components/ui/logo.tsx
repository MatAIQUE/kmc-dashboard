"use client"
import Image from "next/image"
import KMCLogo from "../../app/assets/img/Logo-2x.png"
import { useRouter } from "next/navigation";



const Logo = () => {
    const router = useRouter();

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
        className="h-full hover:cursor-pointer"
        alt="KMC Logo"
        height={25}
        width={168}
        src={KMCLogo}
        onClick={() => router.push('/')}
        />
        </>
    )
}

export default Logo