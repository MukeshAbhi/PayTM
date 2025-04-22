import { auth } from "@/authTypes"
import Image from "next/image"
import Link from "next/link"

export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div className="flex flex-col gap-4 text-2xl font-bold bg-amber-300 h-screen justify-center items-center">
     <div>Name:{session.user.name}</div>
     <div>Email:{session.user.email}</div>
     {session.user.image && (
      <Image src={session.user.image} width={48} height={48} alt={session.user.name ?? "Avatar"} />
     )
     }
     <Link href={"/"}>Home</Link>
    </div>
  )
}