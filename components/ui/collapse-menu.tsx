import Logo from "./logo"
import { FaBars } from "react-icons/fa";


const CollapsedMenu = () => {
    return (
        <>
        
        <div className="bg-white text-black fixed z-40 drop-shadow-md w-full md:hidden h-14 xs:block py-2 items-center justify-between flex">
            <Logo/>
            <button className="btn btn-default p-4">
                <FaBars/>   
            </button>
        </div>
        </>
    )
}

export default CollapsedMenu