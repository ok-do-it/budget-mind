import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { AppProviders } from "@/app/providers"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Budget Mind",
  description: "Track and visualize personal credit card transactions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
        >
          <AppProviders>{children}</AppProviders>
        </body>
      </ClerkProvider>
    </html>
  )
}
