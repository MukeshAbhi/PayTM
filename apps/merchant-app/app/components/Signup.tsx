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
import { loginGoogle, loginResend } from "../actions/auth"


export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">ADMIN SIGNUP</CardTitle>
          <CardDescription>
            Enter your email below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginResend}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-5">
                <Label htmlFor="email">Email</Label>
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
              <Button onClick={loginGoogle} variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/admin-signin" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
