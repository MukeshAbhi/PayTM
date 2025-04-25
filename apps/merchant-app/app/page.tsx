import { auth } from "@/authTypes";
import Link from "next/link";
import Button from "./components/Button";
import { logout } from "./actions/auth";

export default async function Page() {

  const session = await auth();

  if(session?.user) {
    return(
      <div className="flex flex-col gap-4 text-2xl font-bold bg-amber-300 h-screen justify-center items-center"> 
        <Button onClick={logout}>Sign Out</Button>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>You are not Signed In</div>
        <Link href={"/admin-signin"}>Sign In</Link>
      </div>
    </div>
  )
}
