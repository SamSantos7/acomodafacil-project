
'use client'

import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-[200px] bg-gray-50" />,
  ssr: false
})

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
