"use server"

import { signIn, signOut } from "@/nextAuthTypes";

export const login = async () => {
    await signIn("github", { callbackUrl: "/user-info" });

}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}