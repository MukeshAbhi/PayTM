import { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const authOptions : NextAuthConfig = ({
  providers: [GitHub],
})