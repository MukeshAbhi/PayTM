import { FC } from "react";
import { Button } from "@repo/ui/components/button"
import { House, User } from "lucide-react";

interface TopbarProps {
    user?:{
        name?:string | null
    }
    loginHandler: () => void;
    logoutHandler: () => void;
    profileClick: () => void;
    homeClick: () => void;
}
export const Topbar: FC<TopbarProps> = ({user, loginHandler, logoutHandler, profileClick, homeClick}) => {
    return(
        <div className="fixed bg-background flex items-center justify-between w-full  border-b p-5 ">
            <div className="px-8 text-2xl">
                PayTM
            </div>
            <div className=" flex space-x-4 justify-center items-center">
                <House onClick={homeClick} />
                <User onClick={profileClick}/>
                <Button className="text-xl text-white w-24" onClick={user ? logoutHandler : loginHandler}>{user ? "Logout" :"Login"}</Button>
            </div>
        </div>
    )
}