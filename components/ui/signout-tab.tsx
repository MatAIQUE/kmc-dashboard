import { FaSignOutAlt } from "react-icons/fa";


const SignoutTab = () => {
    return (
        <>
        <div className="bottom-0 left-0 absolute w-full px-2 text-destructive">
            <button className="w-full p-4 rounded items-center flex mb-4 hover:bg-secondary">
                <FaSignOutAlt/>
                <p className="ms-4 font-medium">Signout</p>
            </button>
        </div>
        </>
    )
}

export default SignoutTab