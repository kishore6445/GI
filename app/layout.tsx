import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { TopNav } from "@/components/top-nav"
import { UserNav } from "@/components/user-nav"
import { Suspense } from "react"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

// export const metadata = {
//   title: "GI Software",
//   description: "Performance management and team collaboration system",
//     generator: 'v0.dev'
// }

// export const metadata = {
//   title: "GI Software",
//   description: "Performance management and team collaboration system",
// //   generator: 'v0.dev',
// //   metadataBase: new URL(process.env.VERCEL_URL ? 
// //     `https://${process.env.VERCEL_URL}` : 
// //     'http://localhost:3000')
// // }

export const metadata: Metadata = {
  title: "GI Software",
  description: "Performance management and team collaboration system",
  metadataBase: new URL(
    process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "GI Software",
    description: "Performance management and team collaboration system",
    siteName: "GI Software",
  },
  twitter: {
    card: "summary_large_image",
    title: "GI Software",
    description: "Performance management and team collaboration system",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-brand-secondary shadow-sm">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-4 md:gap-8">
                  <Suspense fallback={<div className="h-6 w-6" />}>
                    <MainNav />
                  </Suspense>
                  <Suspense fallback={<div className="h-6 w-20" />}>
                    <TopNav />
                  </Suspense>
                </div>
                <div className="flex items-center">
                  <Suspense fallback={<div className="h-8 w-8 rounded-full bg-muted" />}>
                    <UserNav />
                  </Suspense>
                </div>
              </div>
            </header>
            <main className="flex-1 bg-white">
              <div className="container py-6">{children}</div>
            </main>
            <footer className="py-4 border-t bg-brand-secondary">
              <div className="container text-center text-sm text-muted-foreground">
                © 2025 GI Software. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
