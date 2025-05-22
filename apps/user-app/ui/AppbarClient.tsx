"use client"
import { Topbar } from '@repo/ui/pages/topbar'
import { homeRedirect, logout } from '../actions/auth'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

function AppbarClient() {
  const { data: session } = useSession()
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('user-profile');
  }

  const handleHomeClick = () => {
    router.push('user-dashboard');
  }
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-fixed ">
      <Topbar loginHandler={homeRedirect} logoutHandler={logout} user={session?.user} homeClick={handleHomeClick} profileClick={handleProfileClick} />
    </div>
  )
}

export default AppbarClient
