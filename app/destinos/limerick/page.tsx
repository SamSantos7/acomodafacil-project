"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Home, Building, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Limerick() {
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
            src="/images/limerick-city.png"
            alt="Limerick, Irlanda"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Acomodações estudantis em Limerick
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Limerick é a terceira maior cidade da Irlanda, com uma rica história e universidades renomadas. Oferece
                um custo de vida mais acessível e uma experiência autêntica da cultura irlandesa, longe do turismo
                massivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Acomodações</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/limerick-city.png" alt="Limerick" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Acomodação */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Tipos de Acomodação em Limerick
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as opções disponíveis para estudantes brasileiros em Limerick
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
                <p className="text-lg text-teal-500 font-medium">A partir de €600/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €700/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €450/mês</p>
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
              Principais Bairros em Limerick
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as regiões mais procuradas por estudantes brasileiros
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "City Centre",
                description: "Centro histórico da cidade, com fácil acesso a comércio e transporte.",
                pros: "Localização central, vida noturna, cultura",
                price: "€€",
              },
              {
                name: "Castletroy",
                description: "Área universitária próxima à University of Limerick.",
                pros: "Ambiente estudantil, próximo à universidade",
                price: "€€",
              },
              {
                name: "Dooradoyle",
                description: "Bairro residencial com boas opções de compras e serviços.",
                pros: "Tranquilo, shopping center, infraestrutura",
                price: "€€",
              },
              {
                name: "Raheen",
                description: "Área residencial tranquila com boas conexões de transporte.",
                pros: "Familiar, tranquilo, bom para estudos",
                price: "€",
              },
              {
                name: "Corbally",
                description: "Bairro residencial às margens do rio Shannon.",
                pros: "Vista para o rio, tranquilidade, natureza",
                price: "€€",
              },
              {
                name: "Annacotty",
                description: "Vila nos arredores de Limerick com preços mais acessíveis.",
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
              Acomodações Disponíveis em Limerick
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Confira algumas das nossas opções de acomodação em Limerick
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Acomodação 1 */}
            <Card className="overflow-hidden border-none shadow-xl card-hover">
              <div className="relative h-[200px]">
                <Image
                  src="/images/student-residence.png"
                  alt="Residência Universitária - Limerick"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Residência Estudantil</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Residência Universitária - Limerick</h3>
                  <span className="text-lg font-bold text-teal-500">€800/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>University of Limerick, Castletroy</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Residência dentro do campus da Universidade de Limerick, com todas as facilidades universitárias.
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
                  src="/images/apartment-living.png"
                  alt="Estúdio Moderno - Limerick"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Estúdio Individual</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Estúdio Moderno - Limerick</h3>
                  <span className="text-lg font-bold text-teal-500">€900/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>34 O'Connell Street, Limerick</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Estúdio recém-reformado no centro de Limerick, com móveis modernos e ótima localização.
                </p>
                <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link href="/acomodacoes">Ver Todas as Acomodações em Limerick</Link>
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
                src="/images/limerick-tips.png"
                alt="Dicas para morar em Limerick"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">
                Dicas para morar em Limerick
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Universidades</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Limerick abriga a University of Limerick e o Limerick Institute of Technology, ambas instituições de
                    ensino de excelente qualidade.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Clima</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    O clima em Limerick é similar ao resto da Irlanda, com chuvas frequentes. A cidade está localizada
                    no rio Shannon, o que pode tornar algumas áreas mais úmidas.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Custo de vida</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Limerick oferece um dos custos de vida mais acessíveis entre as grandes cidades irlandesas. Reserve
                    aproximadamente €100-140 por semana para despesas como alimentação e transporte.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Transporte</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    A cidade tem um bom sistema de ônibus urbanos. Para viagens mais longas, Limerick tem boas conexões
                    de trem e ônibus com outras cidades irlandesas.
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
            Pronto para encontrar sua acomodação em Limerick?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Preencha nosso formulário de cotação e receba as melhores opções para sua estadia em Limerick.
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
