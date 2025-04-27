"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Home, Building, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Galway() {
  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/galway-city.png"
            alt="Galway, Irlanda"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Acomodações estudantis em Galway
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Galway é conhecida como a capital cultural da Irlanda, com uma atmosfera artística e vibrante. Cidade
                universitária por excelência, oferece uma experiência autêntica da cultura irlandesa em um ambiente
                acolhedor e cheio de vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Acomodações</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/galway-city.png" alt="Galway" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Acomodação */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Tipos de Acomodação em Galway
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as opções disponíveis para estudantes brasileiros em Galway
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <Home className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Casas de Família</h3>
                <p className="text-graphite-300 mb-6 leading-relaxed">
                  Experimente a cultura irlandesa morando com uma família local. Inclui refeições e um ambiente
                  acolhedor para praticar inglês.
                </p>
                <p className="text-lg text-teal-500 font-medium">A partir de €650/mês</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <Building className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Residências Estudantis</h3>
                <p className="text-graphite-300 mb-6 leading-relaxed">
                  Acomodações projetadas para estudantes, com áreas comuns, internet e serviços inclusos. Ideal para
                  conhecer pessoas.
                </p>
                <p className="text-lg text-teal-500 font-medium">A partir de €750/mês</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Apartamentos Compartilhados</h3>
                <p className="text-graphite-300 mb-6 leading-relaxed">
                  Divida um apartamento com outros estudantes. Opção econômica com mais independência e oportunidade de
                  convívio.
                </p>
                <p className="text-lg text-teal-500 font-medium">A partir de €500/mês</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bairros */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Principais Bairros em Galway
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as regiões mais procuradas por estudantes brasileiros
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "City Centre",
                description: "Centro histórico da cidade, com ruas de pedra e muita vida cultural.",
                pros: "Localização central, vida noturna, cultura",
                price: "€€€",
              },
              {
                name: "Salthill",
                description: "Área costeira com bela praia e vista para a Baía de Galway.",
                pros: "Vista para o mar, tranquilidade, passeio à beira-mar",
                price: "€€€",
              },
              {
                name: "Newcastle",
                description: "Bairro universitário próximo à National University of Ireland Galway.",
                pros: "Ambiente estudantil, próximo à universidade",
                price: "€€",
              },
              {
                name: "Knocknacarra",
                description: "Área residencial moderna com boas conexões de transporte.",
                pros: "Tranquilo, moderno, bom para famílias",
                price: "€€",
              },
              {
                name: "Renmore",
                description: "Bairro residencial tranquilo a leste do centro.",
                pros: "Tranquilo, bom para estudos, parques",
                price: "€€",
              },
              {
                name: "Oranmore",
                description: "Vila nos arredores de Galway com preços mais acessíveis.",
                pros: "Econômico, tranquilo, comunidade local",
                price: "€",
              },
            ].map((bairro) => (
              <Card key={bairro.name} className="border-none shadow-xl card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-graphite-400">{bairro.name}</h3>
                  </div>
                  <p className="text-graphite-300 mb-4 leading-relaxed">{bairro.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-graphite-300">Vantagens: </span>
                      <span className="text-graphite-400">{bairro.pros}</span>
                    </div>
                    <div className="text-teal-500 font-medium">{bairro.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Acomodações Disponíveis */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Acomodações Disponíveis em Galway
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Confira algumas das nossas opções de acomodação em Galway
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Acomodação 1 */}
            <Card className="overflow-hidden border-none shadow-xl card-hover">
              <div className="relative h-[200px]">
                <Image src="/images/homestay.png" alt="Casa de Família em Galway" fill className="object-cover" />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Casa de Família</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Casa de Família em Galway</h3>
                  <span className="text-lg font-bold text-teal-500">€850/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>78 Salthill Road, Galway</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Família acolhedora em Galway, com experiência em receber estudantes internacionais.
                </p>
                <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Acomodação 2 */}
            <Card className="overflow-hidden border-none shadow-xl card-hover">
              <div className="relative h-[200px]">
                <Image
                  src="/images/shared-apartment.png"
                  alt="Apartamento Compartilhado - Galway"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Apartamento Compartilhado</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Apartamento Compartilhado - Galway</h3>
                  <span className="text-lg font-bold text-teal-500">€650/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>15 Eyre Square, Galway</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Apartamento bem localizado no centro de Galway, compartilhado com outros estudantes.
                </p>
                <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link href="/acomodacoes">Ver Todas as Acomodações em Galway</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dicas */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/images/galway-tips.png"
                alt="Dicas para morar em Galway"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">
                Dicas para morar em Galway
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Cultura e eventos</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Galway é conhecida por seus festivais e vida cultural. Aproveite eventos como o Galway International
                    Arts Festival e o Film Fleadh.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Clima</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Por estar na costa oeste, Galway pode ser ainda mais chuvosa e ventosa que outras cidades
                    irlandesas. Esteja preparado para mudanças rápidas no clima.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Custo de vida</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    O custo de vida em Galway é mais acessível que Dublin, mas os aluguéis podem ser altos devido à
                    grande população estudantil. Reserve cerca de €100-150 por semana para despesas.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Transporte</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Galway é uma cidade compacta e muitos lugares são acessíveis a pé ou de bicicleta. Há também um
                    sistema de ônibus que atende bem a cidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para encontrar sua acomodação em Galway?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Preencha nosso formulário de cotação e receba as melhores opções para sua estadia em Galway.
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
