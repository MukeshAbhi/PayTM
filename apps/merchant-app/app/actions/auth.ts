"use server"

import { signIn, signOut } from "@/authTypes";

export const login = async () => {
    await signIn("github", { callbackUrl: "/user-info" });

}

export const logout = async () => {
    await signOut({redirectTo: "/"});
}