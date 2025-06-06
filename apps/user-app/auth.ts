import { adapter, prisma } from "@repo/db/prisma"
import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend"
 
export const authOptions : NextAuthConfig = ({
  adapter: adapter,
  providers: [
    Google,
    Resend({
      from: "no-reply@updates.mukeshtech.site",
      sendVerificationRequest,
      secret: process.env.AUTH_RESEND_KEY
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin"
  },
  callbacks:  {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user}) {
      if(user) {
        token.sub = user.id,
        token.email = user.email,
        token.name = user.name
      }
      return token;
    }, 
    async redirect({url, baseUrl}){
      return `${baseUrl}/user-dashboard`;
    }
  },
  events: {
    async signIn({user, account, profile, isNewUser}) {
      if (isNewUser) {
        try {
          await prisma.walletBalance.create({
            data: {
              amount: 0,
              locked: 0,
              user: {
                connect: { id : user.id}
              }
            }
          })
        }catch (error){
          console.error("Error creating wallet balance:", error);
        }
      } 
    }
  }
 
})

export async function sendVerificationRequest(params: { identifier: string; provider: any; url: string; theme: any }) {
  const { identifier: to, provider, url, theme } = params
  const { host } = new URL(url)
  
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host, theme }),
      text: text({ url, host }),
    }),
  })
 
  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()))
}
 
function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params
 
  const escapedHost = host.replace(/\./g, "&#8203;.")
 
  const brandColor = theme.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }
 
  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}
 
// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}