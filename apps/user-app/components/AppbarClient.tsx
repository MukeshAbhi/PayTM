"use client"
import { Topbar } from '@repo/ui/pages/topbar'
import { homeRedirect } from '../actions/auth'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

function AppbarClient() {
  const { data: session } = useSession()
  const router = useRouter();

  const handleProfileClick = () => {
    router.replace('/user/profile');
  }

  const handleHomeClick = () => {
    router.replace('/dashboard/home');
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/signin',
      redirect: true
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-fixed ">
      <Topbar loginHandler={homeRedirect} logoutHandler={handleLogout} user={session?.user} homeClick={handleHomeClick} profileClick={handleProfileClick} />
    </div>
  )
}

export default AppbarClient
