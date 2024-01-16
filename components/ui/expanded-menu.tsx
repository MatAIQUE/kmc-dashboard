import ExpandedMenuTabs from "./expanded-menu-tabs";
import Logo from "./logo"

const ExpandedMenu = () => {
    return (
        <>
        <div className="bg-white text-black fixed top-0 left-0 z-40 w-64 h-screen hidden md:block p-2 drop-shadow-xl ">
            <Logo/>
            <ExpandedMenuTabs/>
        </div>
        </>
    )
}

export default ExpandedMenu