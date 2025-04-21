import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/user-info"];

export default async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET, // match this with authOptions.secret
    });

    console.log("token:", token);

    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    return NextResponse.next();
}
