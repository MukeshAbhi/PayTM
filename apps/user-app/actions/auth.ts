"use server"

import { signIn, signOut } from "@/authTypes"
import { prisma } from "@repo/db/prisma";
import { SignIn, signUpSchema, SignUpSchema } from "@repo/types/zodtypes";
import { hash, compare } from "bcrypt";
import { redirect } from "next/navigation";

export const signUpResend = async (formDta: FormData) => {
    const email = formDta.get("email") as string;
    const name = formDta.get("name") as string;

    await customSignUp(name, email);
    await signIn("resend", formDta);
}

export const logInResend = async (email: string) => {
    const result = await customLogin (email);

    if (!result.success) {
        // handle error accordingly
        console.error(result.message);
        return {
            message: "Email Id not found. Sign up",
            status: 411
        }; // or throw error
    }
    const formDta = new FormData();
    formDta.append("email", email);
    await signIn("resend", formDta);

    return{
        status:200,
        message: "Sign-in link has been sent to your email.",
  };
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
        
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user){
        const user = await prisma.user.create({
            data: {
                email,
                name,
            }
        })

        await prisma.walletBalance.create({
            data: {
                amount: 0,
                locked: 0,
                user: {
                connect: { id: user.id }
                }
            }
        });

    } 
    return;
}

const customLogin = async(email: string): Promise<{ success: boolean; message?: string }> => {

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user){
        return{
            message:"Email Id not found. Sign up",
            success: false
        }
    }
    return {
        success: true
    }
}