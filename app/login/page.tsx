import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const LoginPage = () => {
    return (
        <div className="p-2 grid gap-y-2 w-full flex items-center px-[35%] h-screen pb-[25%]">
            <div className="gap-y-2 grid flex items-center">
                <h1>Login</h1>
                <Input placeholder="password" type="password" className="w-full"/>
                <Input placeholder="retype password" type="password" className="w-full"/>
                <Button>Login</Button>
            </div>
        </div>
    )
}

export default LoginPage