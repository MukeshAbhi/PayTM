import { auth } from "@/authTypes";
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard/home')
  } else {
    redirect('/signin')
  }
    
}

