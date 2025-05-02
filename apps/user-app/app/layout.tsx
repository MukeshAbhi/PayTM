import { Geist, Geist_Mono } from "next/font/google"

import "@repo/ui/globals.css"
import { Providers } from "@/app/components/providers"
import { JotaiProvider } from "@/app/components/jotaiProviders"
import AppbarClient from "./pages/AppbarClient"
import { SessionProvider } from "next-auth/react"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <JotaiProvider>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
      <SessionProvider>
        <Providers>
          <AppbarClient />
            {children}
        </Providers>
        </SessionProvider>
      </body>
      
      </JotaiProvider> 
    </html>
  )
}
