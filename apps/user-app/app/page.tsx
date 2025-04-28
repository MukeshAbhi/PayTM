import { auth } from "@/authTypes";
import { redirect } from 'next/navigation';
import { homeRedirect, logout } from "./actions/auth";
import { Topbar } from "@repo/ui/pages/topbar"


export default async function Page() {
    const session = await auth();
    return(
      <div>
        <Topbar loginHandler={homeRedirect}  logoutHandler={logout} user={session?.user}/>
      </div>
    )
  }
    

