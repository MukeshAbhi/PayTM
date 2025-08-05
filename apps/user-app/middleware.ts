import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define routes that should be protected
const protectedRoutes = ["/user", "/dashboard"];

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log("Requested path:", pathname);

  // Allow unauthenticated access to auth endpoints and public routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/signin" ||
    pathname.startsWith("/o/oauth2/v2")
  ) {
    return NextResponse.next();
  }

  // ✅ Fix: Use correct cookie name for Auth.js v5+
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "__Secure-authjs.session-token", // Auth.js v5 +
  });

  console.log("Token from getToken:", token);

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If route is protected and no token exists, redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export default middleware;

// Only run middleware on these specific paths
export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*"],
};
