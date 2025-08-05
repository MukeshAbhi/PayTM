import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/user","/dashboard"];

// export function middleware(req: NextRequest) {
//   return NextResponse.next(); // 🔁 do nothing, just pass through
// }

export const middleware = async (request:NextRequest) =>  {
    const { pathname } = request.nextUrl;
    console.log("path name: ", pathname);
    
    // Skip middleware for auth API routes and signin page
    if (pathname.startsWith('/api/auth') || pathname === '/signin' || pathname.startsWith('/o/oauth2/v2')) {
        return NextResponse.next();
    }

    const token = await getToken({req: request , secret: process.env.NEXTAUTH_SECRET});
    console.log("token name: ", token);

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if(isProtected && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*"],
};
