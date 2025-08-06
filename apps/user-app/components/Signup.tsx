"use client";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { loginGoogle, signUpResend } from "../actions/auth";
import { useState, useTransition } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await signUpResend(formData); // calling the server action manually
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">PAYMENTS</CardTitle>
          <CardTitle className="text-xl">SIGN UP</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                <Label className="pt-4" htmlFor="email">
                  Email
                </Label>
                <CardDescription>Enter your email below</CardDescription>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-white" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing up...
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>

          <Button onClick={loginGoogle} variant="outline" className="w-full mt-4">
            Sign Up with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/signin" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
