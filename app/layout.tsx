
import React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "AcomodaFácil - Seu lar no intercâmbio começa aqui",
  description: "Descubra acomodações estudantis selecionadas especialmente para você. AcomodaFácil: Seu lar no intercâmbio começa aqui.",
  icons: {
    icon: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={poppins.variable}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
