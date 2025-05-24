"use server"

import { signIn, signOut } from "@/authTypes"
import { prisma } from "@repo/db/prisma";
import { SignIn, signUpSchema, SignUpSchema } from "@repo/types/zodtypes";
import { hash, compare } from "bcrypt";
import { redirect } from "next/navigation";

export const loginResend = async (formDta: FormData) => {
    console.log(formDta);
    await signIn("resend", formDta);
}

export const loginGoogle = async() => {
    await signIn("google",{redirectTo: '/user-dashboard'});
}

export const logout = async () => {
    await signOut({redirectTo: "/signin"});
}

export const homeRedirect = async () => {
    redirect("/");
}

