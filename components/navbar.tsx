"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white bg-opacity-95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="AcomodaFácil Logo" width={40} height={40} className="h-10 w-10" />
          <span className="text-xl font-medium text-teal-500">AcomodaFácil</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors"
            >
              Destinos <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </button>
            {isDestinationsOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 animate-fadeIn">
                <div className="py-1">
                  <Link
                    href="/destinos/dublin"
                    className="block px-4 py-2 text-sm text-graphite-400 hover:bg-sand-100 hover:text-teal-500 transition-colors"
                  >
                    Dublin
                  </Link>
                  <Link
                    href="/destinos/cork"
                    className="block px-4 py-2 text-sm text-graphite-400 hover:bg-sand-100 hover:text-teal-500 transition-colors"
                  >
                    Cork
                  </Link>
                  <Link
                    href="/destinos/limerick"
                    className="block px-4 py-2 text-sm text-graphite-400 hover:bg-sand-100 hover:text-teal-500 transition-colors"
                  >
                    Limerick
                  </Link>
                  <Link
                    href="/destinos"
                    className="block px-4 py-2 text-sm font-medium text-teal-500 hover:bg-sand-100 transition-colors"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/acomodacoes"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Acomodações
          </Link>
          <Link
            href="/quem-somos"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Quem Somos
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">{/* Botões removidos */}</div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-graphite-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t animate-slideUp">
          <div className="container px-4 py-3 flex flex-col gap-3">
            <Link href="/" className="py-2 text-sm font-medium text-graphite-400" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <button
              onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
              className="flex items-center justify-between py-2 text-sm font-medium text-graphite-400"
            >
              Destinos{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isDestinationsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDestinationsOpen && (
              <div className="pl-4 flex flex-col gap-2 animate-fadeIn">
                <Link
                  href="/destinos/dublin"
                  className="py-2 text-sm text-graphite-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dublin
                </Link>
                <Link
                  href="/destinos/cork"
                  className="py-2 text-sm text-graphite-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cork
                </Link>
                <Link
                  href="/destinos/limerick"
                  className="py-2 text-sm text-graphite-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Limerick
                </Link>
                <Link
                  href="/destinos"
                  className="py-2 text-sm font-medium text-teal-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ver todos
                </Link>
              </div>
            )}
            <Link
              href="/acomodacoes"
              className="py-2 text-sm font-medium text-graphite-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Acomodações
            </Link>
            <Link
              href="/quem-somos"
              className="py-2 text-sm font-medium text-graphite-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </Link>
            <div className="flex flex-col gap-2 pt-2">{/* Botões removidos */}</div>
          </div>
        </div>
      )}
    </header>
  )
}
