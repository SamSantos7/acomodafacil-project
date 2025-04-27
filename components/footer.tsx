import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-graphite-400 text-white">
      <div className="container px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="AcomodaFácil Logo"
                width={40}
                height={40}
                className="h-10 w-10 bg-white rounded-full p-1"
              />
              <span className="text-xl font-medium">AcomodaFácil</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Plataforma especializada em acomodações estudantis para brasileiros no exterior. Atendimento humanizado,
              parceiros verificados e soluções sob medida.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-300 hover:text-gold-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinos"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Destinos
                </Link>
              </li>
              <li>
                <Link
                  href="/acomodacoes"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Acomodações
                </Link>
              </li>
              <li>
                <Link
                  href="/quem-somos"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Quem Somos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Destinos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/destinos/dublin"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Dublin
                </Link>
              </li>
              <li>
                <Link
                  href="/destinos/cork"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Cork
                </Link>
              </li>
              <li>
                <Link
                  href="/destinos/limerick"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Limerick
                </Link>
              </li>
              <li>
                <Link
                  href="/destinos/galway"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Galway
                </Link>
              </li>
              <li>
                <Link
                  href="/destinos"
                  className="text-gray-300 hover:text-white transition-colors hover-underline inline-block"
                >
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold-300 mt-0.5" />
                <span className="text-gray-300">contato@acomodafacil.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold-300 mt-0.5" />
                <span className="text-gray-300">+353 (0) 1 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-300 mt-0.5" />
                <span className="text-gray-300">O'Connell Street, Dublin 1, Irlanda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AcomodaFácil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
