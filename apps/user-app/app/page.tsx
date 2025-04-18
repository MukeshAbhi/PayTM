import Balance from "./components/Balance";
import SignIn from "./components/Signin";
import { auth } from "@/nextAuth";
import SignOut from "./components/Signout";
import Link from "next/link";

export default async function Home() {

  const session = await auth();

  if(session?.user) {
    return(
      <div className="flex flex-col gap-4 text-2xl font-bold bg-amber-300 h-screen justify-center items-center"> 
        <Link href={"/user-info"} >User Info</Link>
        <Balance />
        <SignOut />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 text-2xl font-bold bg-amber-300 h-screen justify-center items-center"> 
      <div>You are not Signed In</div>
      <SignIn/>
    </div>
  );
}
