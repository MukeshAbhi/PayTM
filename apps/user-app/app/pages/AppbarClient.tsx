"use client"
import { Topbar } from '@repo/ui/pages/topbar'
import { homeRedirect, logout } from '../actions/auth'
import { useSession } from "next-auth/react"

function AppbarClient() {
  const { data: session } = useSession()

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-fixed ">
      <Topbar loginHandler={homeRedirect} logoutHandler={logout} user={session?.user} />
    </div>
  )
}

export default AppbarClient
