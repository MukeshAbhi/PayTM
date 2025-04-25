"use server"

import { signIn, signOut } from "@/authTypes"

export const login = async (formDta: FormData) => {
    await signIn("resend", formDta);
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}