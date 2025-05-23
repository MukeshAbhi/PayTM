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
    await signIn("google",{redirectTo: '/'});
}

export const logout = async () => {
    await signOut({redirectTo: "/user-signin"});
}

export const homeRedirect = async () => {
    redirect("/user-signin");
}

export const customSignUp = async (data: SignUpSchema) => {
    try{
        const parsedData = signUpSchema.safeParse(data);

        if (!parsedData.success) {
              console.error("Zod error:", parsedData.error);
              return ({ message: "Inputs invalid" , status: 400 });
        }

        const { email, name, password } = parsedData.data;
        
        const existingUser = await prisma.user.findFirst({
            where: { email },
        });
        if (existingUser) {
              return (
                { message: "User already exists." ,
                 status: 400 }
              );
        }
        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        if (!newUser) {
              return (
                { message: "Failed to create user" ,
                 status: 500 }
            );
        }

        return (
              { message: "User created. Verification email sent." ,
               status: 201 }
            );
    }catch (error) {
        console.error("Signup error:", error);
        return (
          { message: "Internal Server Error" ,
           status: 500 }
        );
      }
}

export const customSignIn = async (data: SignIn) => {
    const { email, password } = data;

    try{
        const user = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                password: true
            }
        })

        if(!user){
            return {
                message: "User not found..!",
                status: 411
            }
        }

        const isMatch = await compare(password, (user.password) as string,);

        if(!isMatch){
            return {
                message: "Incorrect Password",
                status: 411
            }
        }

        return {
            message: "User successfully Logged In",
            status: 201
        }
    }catch(err){
        console.log("Error while logging In ", err);
        return{
            message:"Internal Server error",
            status: 500
        }
    }
}