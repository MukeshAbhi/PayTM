"use client"
import { login } from "@/app/actions/auth";
import  Button from "components/Button";

function SignIn() {
  return (
    <div>
      <Button variant={"destructive"} onClick={() => login()}>SignIn</Button>
    </div>
  )
}

export default SignIn