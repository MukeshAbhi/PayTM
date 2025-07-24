import { auth } from "@/authTypes";
import { Intro } from "@/components/Intro";
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  console.log("Form home : ", session);
  
  if (session?.user) {
    redirect('/dashboard/home')
  } else {
    return (
      <Intro/>
    )
  }
    
}

