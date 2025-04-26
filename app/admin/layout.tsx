import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - AcomodaFácil",
  description: "Painel administrativo para gerenciamento da plataforma AcomodaFácil",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-gray-100">{children}</div>
}
