"use server"

import { signIn, signOut } from "@/authTypes"

export const login = async () => {
    await signIn('github', {redirectTo: "/"});
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}