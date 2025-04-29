
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sand-50 p-4">
      <h1 className="text-6xl font-bold text-teal-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-graphite-400 mb-2">Página não encontrada</h2>
      <p className="text-graphite-300 mb-8 text-center max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Voltar para Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/acomodacoes" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Explorar Acomodações
          </Link>
        </Button>
      </div>
    </div>
  )
}
