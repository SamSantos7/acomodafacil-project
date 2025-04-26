import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'AcomodaFácil - Acomodações Premium para Intercambistas',
  description: 'Encontre acomodações exclusivas para seu intercâmbio com a AcomodaFácil. Seu lar longe de casa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
