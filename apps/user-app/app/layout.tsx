import { Geist, Geist_Mono } from "next/font/google"
import "@repo/ui/globals.css"
import { SessionProvider } from "next-auth/react"
import { Providers } from "@/components/providers"
import { JotaiProvider } from "@/components/jotaiProviders"
import AppbarClient from "@/components/AppbarClient"

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
              <div className="flex flex-col min-h-screen">
                <AppbarClient />
                <div className="flex-1 pt-20 px-4">
                    {children}
                </div>
              </div>
            </Providers>
          </SessionProvider>
        </JotaiProvider> 
      </body>    
    </html>
  )
}
