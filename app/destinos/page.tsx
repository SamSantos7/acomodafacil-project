"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

export default function Destinos() {
  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const destinos = [
    {
      name: "Dublin",
      description: "Capital da Irlanda, com rica vida cultural e excelentes escolas de inglês.",
      count: "250+ acomodações",
      image: "/images/dublin-city.png",
      options: ["Residências estudantis", "Apartamentos compartilhados", "Casas de família"],
    },
    {
      name: "Cork",
      description: "Segunda maior cidade da Irlanda, com ambiente universitário e custo de vida mais acessível.",
      count: "120+ acomodações",
      image: "/images/cork-city.png",
      options: ["Apartamentos compartilhados", "Casas de família", "Estúdios individuais"],
    },
    {
      name: "Galway",
      description: "Cidade costeira com forte tradição cultural irlandesa e ambiente acolhedor.",
      count: "80+ acomodações",
      image: "/images/galway-city.png",
      options: ["Casas de família", "Apartamentos compartilhados", "Acomodações temporárias"],
    },
    {
      name: "Limerick",
      description: "Centro urbano com universidades renomadas e opções de acomodação mais econômicas.",
      count: "65+ acomodações",
      image: "/images/limerick-city.png",
      options: ["Residências estudantis", "Apartamentos compartilhados", "Casas de família"],
    },
    {
      name: "Waterford",
      description: "Cidade histórica com ambiente tranquilo, ideal para estudantes que buscam foco nos estudos.",
      count: "40+ acomodações",
      image: "/images/galway-city.png", // Usando Galway como fallback
      options: ["Casas de família", "Apartamentos compartilhados", "Acomodações de curta duração"],
    },
    {
      name: "Belfast",
      description: "Capital da Irlanda do Norte, com rica história e excelentes instituições de ensino.",
      count: "70+ acomodações",
      image: "/images/belfast-city.png",
      options: ["Residências estudantis", "Apartamentos compartilhados", "Estúdios individuais"],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/ireland-map.png"
            alt="Mapa da Irlanda"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Destinos na Irlanda</h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Conheça as principais cidades irlandesas onde oferecemos acomodações para estudantes brasileiros. Cada
              destino tem características únicas e opções selecionadas para atender às suas necessidades.
            </p>
          </div>
        </div>
      </section>

      {/* Destinos Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-10 md:gap-12">
            {destinos.map((destino, index) => (
              <div
                key={destino.name}
                className={`grid gap-8 md:grid-cols-2 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src={destino.image || "/placeholder.svg"} 
                    alt={destino.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-teal-500" />
                      <h2 className="text-3xl font-bold text-graphite-400">{destino.name}</h2>
                    </div>
                    <p className="text-graphite-300 text-lg">{destino.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-graphite-400">Opções de acomodação:</h3>
                    <ul className="space-y-2">
                      {destino.options.map((option, i) => (
                        <li key={i} className="flex items-center gap-2 text-graphite-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500"></span>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-teal-500 font-medium">{destino.count}</p>

                  <div className="pt-2">
                    <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
                      <Link href={`/destinos/${destino.name.toLowerCase()}`}>Ver detalhes de {destino.name}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa Futuro Section */}
      <section className="bg-sand-50 py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-graphite-400 mb-4">Mapa Interativo</h2>
            <p className="text-graphite-300 mb-8">
              Em breve, disponibilizaremos um mapa interativo onde você poderá explorar todas as nossas opções de
              acomodação em cada cidade, com filtros por tipo, preço e localização.
            </p>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-dashed border-teal-300 bg-white/50 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="h-16 w-16 text-teal-300 mx-auto mb-4" />
                <p className="text-teal-500 font-medium">Mapa interativo em desenvolvimento</p>
                <p className="text-graphite-300 text-sm mt-2">
                  Explore todas as acomodações disponíveis em cada cidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para encontrar sua acomodação ideal?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Preencha nosso formulário de cotação e receba as melhores opções para sua estadia na Irlanda.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/acomodacoes" className="flex items-center gap-2">
              Ver Acomodações <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
