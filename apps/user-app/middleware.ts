import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const protectedRoutes = ["/user", "/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for auth routes or public pages like signin
  if (pathname.startsWith("/api/auth") || pathname === "/signin") {
    return NextResponse.next();
  }

  // Always use NEXTAUTH_SECRET (not AUTH_SECRET)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if current route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If trying to access a protected route without token, redirect
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
