import { FaMicrosoft } from "react-icons/fa"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const LoginPage = () => {
    return (
        <>
        <div className="p-2 grid hidden gap-y-2 w-full flex items-center px-[35%] h-screen pb-[25%]">
            <div className="gap-y-2 grid flex items-center">
                <h1>Login</h1>
                <Input placeholder="password" type="password" className="w-full"/>
                <Input placeholder="retype password" type="password" className="w-full"/>
                <Button>Login</Button>
            </div>
        </div>
        <div className="flex items-center w-full justify-center h-screen pb-[25%] px-10 md:px-0">
            <div className="bg-white grid py-12 gap-y-2 px-10 md:w-[410px] w-full drop-shadow rounded-xl">
                <h1 className="font-black text-xl text-left">LOG IN</h1>
                <p className="opacity-80 text-xs">Welcome to Smart Locker Management</p>
                <div className="py-2">
                    <hr/>
                </div>
                <button className="px-4 flex items-center justify-center text-sm py-2 w-full border outline-gray-500 rounded">
                    <span className="me-2"><FaMicrosoft/></span>
                    <p>Sign in with Microsoft</p>
                </button>
            </div>
        </div>
        </>
    )
}

export default LoginPage