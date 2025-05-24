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
import {  loginGoogle, loginResend } from "../actions/auth"
import { ErrMsg,  } from "@repo/types/zodtypes"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {

  const router = useRouter();

  const [errMsg, setErrMsg ] = useState<ErrMsg>({
      message: "",
      status: ""
    })

  
    return (
      <div className={cn("flex flex-col ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
            {errMsg?.message && (
            <span className={`text-sm ${
              errMsg.status == 'failed'
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
            }`}>
              {errMsg.message}
            </span>
          )}
          </div>
            <form action={loginResend}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
                </div>
              </form>

              <Button onClick={loginGoogle} variant="outline" className="w-full mt-2">
                Login with Google
              </Button>
              
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
           
          </CardContent>
        </Card>
      </div>
    )
  }
