
'use client'

import { WhatsappButton } from '@/components/WhatsappButton'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <WhatsappButton />
    </div>
  )
}
