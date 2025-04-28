import { FC } from "react";
import { Button } from "@repo/ui/components/button"

interface TopbarProps {
    user?:{
        name?:string | null
    }
    loginHandler: () => void;
    logoutHandler: () => void;
}
export const Topbar: FC<TopbarProps> = ({user, loginHandler, logoutHandler}) => {
    return(
        <div className="fixed bg-none flex items-center justify-between w-full  border-b p-5 ">
            <div className="px-8 text-2xl">
                PayTM
            </div>
            <div className="px-8">
                <Button className="text-xl w-24" onClick={user ? logoutHandler : loginHandler}>{user?"Logout":"Login"}</Button>
            </div>
        </div>
    )
}