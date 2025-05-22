import { Geist, Geist_Mono } from "next/font/google"
import "@repo/ui/globals.css"
import { SessionProvider } from "next-auth/react"
import { Providers } from "@/components/providers"
import { JotaiProvider } from "@/components/jotaiProviders"

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
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <JotaiProvider>
          <SessionProvider>
            <Providers>
              {children}
            </Providers>
          </SessionProvider>
        </JotaiProvider> 
      </body>    
    </html>
  )
}
