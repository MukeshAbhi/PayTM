"use server"

import { signIn, signOut } from "@/authTypes"

export const login = async (formDta: {email: string}) => {
    await signIn("resend", formDta);
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}