import { auth } from "@/authTypes";
import SignIn from "./components/SignIn";
import Link from "next/link";
import Balance from "./components/Balance";
import SignOut from "./components/SignOut";

export default async function Page() {

  const session = await auth();

  if(session?.user) {
    return(
      <div className="flex flex-col gap-4 text-2xl font-bold bg-amber-300 h-screen justify-center items-center"> 
      <Link href={"/user-info"} >User Info</Link>
      <Link href={"/test-info"}>Test db</Link>
      <Balance />
      <SignOut />
    </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>You are not Signed In</div>
        <SignIn/>
      </div>
    </div>
  )
}
