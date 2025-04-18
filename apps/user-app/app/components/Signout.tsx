"use client"
import { logout } from "../actions/auth"
 
export default function SignOut() {
  return (
    <div>
      <button className="w-48 h-10 bg-amber-700" onClick={()=> logout()}>LogOut</button>
    </div>
  )
} 