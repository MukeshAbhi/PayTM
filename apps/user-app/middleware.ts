import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/user","/dashboard"];

export function middleware(req: NextRequest) {
  return NextResponse.next(); // 🔁 do nothing, just pass through
}

// const middleware = async (request:NextRequest) =>  {
//     const { pathname } = request.nextUrl;

//     // Skip middleware for auth API routes and signin page
//     if (pathname.startsWith('/api/auth') || pathname === '/signin') {
//         return NextResponse.next();
//     }

//     const token = await getToken({req: request , secret: process.env.NEXTAUTH_SECRET});

//     const isProtected = protectedRoutes.some((route) =>
//         pathname.startsWith(route)
//     );

//     if(isProtected && !token) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
// }

export default middleware;