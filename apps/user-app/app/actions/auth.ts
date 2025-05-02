"use server"

import { signIn, signOut } from "@/authTypes"
import { redirect } from "next/navigation";

export const loginResend = async (formDta: FormData) => {
    await signIn("resend", formDta);
}

export const loginGoogle = async() => {
    await signIn("google",{redirectTo: '/'});
}

export const logout = async () => {
    await signOut({redirectTo: "/user-signin"});
}

export const homeRedirect = async () => {
    redirect("/user-signin");
}