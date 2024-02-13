import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const AcceptInvitePage = () => {
    return (
        <div className="p-2 grid gap-y-2 w-full flex items-center px-10 md:px-[35%] h-screen pb-[25%]">
            <div className="gap-y-2 grid flex items-center">
                <h1 className="font-black text-xl">Accept Invite</h1>
                <Input placeholder="password" type="password" className="w-full"/>
                <Input placeholder="retype password" type="password" className="w-full"/>
                <Button>Accept Invite</Button>
            </div>
        </div>
    )
}

export default AcceptInvitePage