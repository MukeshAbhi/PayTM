"use client"
import { Button } from "@repo/ui/components/ui/button"
import { login } from "../actions/auth"
 
export default function SignIn() {
  return (
    <div>
      <button className="w-48 h-10 bg-amber-700" onClick={()=> login()}>SignIn</button>
      <Button variant={"outline"} >Button</Button>
    </div>
  )
} 