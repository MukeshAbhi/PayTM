import { NextRequest, NextResponse } from "next/server";
import { auth } from "./authTypes";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/user-info"];

export const middleware = async (request:NextRequest) =>  {
    const token = await getToken({req: request, secret: process.env.AUTH_JWT_SECRET});
    console.log("token : ", token)

    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => 
        pathname.startsWith(route)
    );

    if(isProtected && !token) {
        return NextResponse.redirect(new URL("api/auth/signin", request.url));
    }

    return NextResponse.next();
    
}