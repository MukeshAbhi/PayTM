"use client"
import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { loginGoogle, signUpResend } from "../actions/auth"
import { ErrMsg } from "../types/index"
import { useState } from "react"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [errMsg, setErrMsg ] = useState<ErrMsg>({
    message: "",
    status: ""
  })



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">PAYMENTS</CardTitle>
          <CardTitle className="text-xl">SIGN UP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            {errMsg?.message && (
            <span className={`text-sm ${
              errMsg.status == 'failed'
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
            } mt-0.5`}>
              {errMsg.message}
            </span>
          )}
          </div>
          <form
             action={signUpResend}
             method="post"
            >
            <div className="grid gap-5">
                <Label htmlFor="name">User Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
            
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                <Label className="pt-4 "  htmlFor="email">Email</Label>
                <CardDescription>
                  Enter your email below
                </CardDescription>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <Button onClick={loginGoogle} variant="outline" className="w-full mt-4">
                Sign Up with Google
          </Button>
          <div className="mt-4 text-center text-sm ">
              Already have an account?{" "}
              <a href="/signin" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
