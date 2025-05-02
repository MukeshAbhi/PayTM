"use client"
import { Topbar } from '@repo/ui/pages/topbar'
import { homeRedirect, logout } from '../actions/auth'
import { useSession } from "next-auth/react"

function AppbarClient() {
  const { data: session } = useSession()
  return (
    
    <Topbar loginHandler={homeRedirect}  logoutHandler={logout} user={session?.user}/>
  )
}

export default AppbarClient