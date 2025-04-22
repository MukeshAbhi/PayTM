import { NextRequest, NextResponse } from "next/server";
import { auth } from "./authTypes";

const protectedRoutes = ["/user-info"];

export const middleware = async (request:NextRequest) =>  {
    const session = await auth();
    console.log("session : ", session)

    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => 
        pathname.startsWith(route)
    );

    if(isProtected && !session) {
        return NextResponse.redirect(new URL("api/auth/signin", request.url));
    }

    return NextResponse.next();
    
}