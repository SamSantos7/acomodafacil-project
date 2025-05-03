"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export const Navbar = () => {
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
          <Image src="/placeholder-logo.png" alt="AcomodaFácil Logo" width={48} height={48} className="h-12 w-12" priority />
          <span className="text-xl font-medium text-teal-500 ml-2">AcomodaFácil</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-1"></div>
        <nav className="hidden md:flex items-center gap-8 justify-end">
          <Link
            href="/"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Home
          </Link>
          <Link
            href="/destinos"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Destinos
          </Link>
          <Link
            href="/acomodacoes"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Acomodações
          </Link>
          <Link
            href="/sobre-nos"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Sobre Nós
          </Link>
          <Link
            href="/contato"
            className="text-sm font-medium text-graphite-400 hover:text-teal-500 transition-colors hover-underline"
          >
            Contato
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
              href="/sobre-nos"
              className="py-2 text-sm font-medium text-graphite-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              className="py-2 text-sm font-medium text-graphite-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex flex-col gap-2 pt-2">{/* Botões removidos */}</div>
          </div>
        </div>
      )}
    </header>
  )
}