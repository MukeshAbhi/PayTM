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
import { loginGoogle, logInResend } from "../actions/auth";
import { ErrMsg } from "../types/index";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  interface formData {
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const [errMsg, setErrMsg] = useState<ErrMsg>({
    message: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: formData) => {
    const { email } = data;

    setErrMsg({ message: "", status: "" });
    setLoading(true);

    try {
      const res = await logInResend(email);
      
      setLoading(false);

      if (!res) {
        setErrMsg({
          message: "Failed to log in",
          status: "failed",
        });
      } else if (res?.status !== 200) {
        setErrMsg({
          message: res.message,
          status: "failed",
        });
      } else {
        setErrMsg({
          message: res.message,
          status: "success",
        });
      }
    } catch (err) {
      console.log("Error while login :", err);
      setLoading(false);
      setErrMsg({
        message: "Failed to login",
        status: "failed",
      });
    }
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">PAYMENTS</CardTitle>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }`}
              >
                {errMsg.message}
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={loading}
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Enter your email address",
                  })}
                />
                {errors.email?.message && (
                  <span className="text-xs text-[#f64949fe] mt-0.5 ml-2">
                    {String(errors.email?.message)}
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full text-white" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <Button
            onClick={loginGoogle}
            variant="outline"
            className="w-full mt-2"
            disabled={loading}
          >
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
  );
}
