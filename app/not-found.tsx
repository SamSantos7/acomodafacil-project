
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-muted-foreground">Página não encontrada</p>
      <Button asChild className="hover-scale">
        <Link href="/">Voltar para Home</Link>
      </Button>
    </div>
  )
}
