import { adapter } from "@repo/db/prisma"
import { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const authOptions : NextAuthConfig = ({
  adapter: adapter,
  providers: [GitHub],
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_JWT_SECRET
})