"use server"

import { signIn, signOut } from "@/authTypes"

export const loginResend = async (formDta: FormData) => {
    await signIn("resend", formDta);
}

export const loginGoogle = async() => {
    await signIn("google",{redirectTo: '/'});
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}