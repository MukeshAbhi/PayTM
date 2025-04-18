"use client"
import { login } from "../actions/auth"
 
export default function SignIn() {
  return (
    <div>
      <button className="w-48 h-10 bg-amber-700" onClick={()=> login()}>SignIn</button>
    </div>
  )
} 