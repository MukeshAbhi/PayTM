"use server"

import { signIn, signOut } from "@/authTypes"
import { prisma } from "@repo/db/prisma";
import { SignIn, signUpSchema, SignUpSchema } from "@repo/types/zodtypes";
import { hash, compare } from "bcrypt";
import { redirect } from "next/navigation";

export const loginResend = async (formDta: FormData) => {
    const email = formDta.get("email") as string;
    const name = formDta.get("name") as string;

    await customSignUp(name, email);
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

const customSignUp = async (name: string, email: string) => {
        
    console.log("Fo=r==")
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user){
        await prisma.user.create({
            data: {
                email,
                name
            }
        })
    } 
    return;
}