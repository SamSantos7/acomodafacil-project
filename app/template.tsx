'use client'

import { Navbar } from '@/components/Navbar'
import { WhatsappButton } from '@/components/WhatsappButton'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <WhatsappButton />
    </div>
  )
} 