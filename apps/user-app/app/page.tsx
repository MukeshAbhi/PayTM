import { auth } from "@/authTypes";
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect('/user-dashboard')
  } else {
    redirect('/api/auth/signin')
  }
    
}

