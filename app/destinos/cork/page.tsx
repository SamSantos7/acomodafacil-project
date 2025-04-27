"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Home, Building, Users, ArrowRight } from "lucide-react"

export default function Cork() {
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
          <Image src="/images/cork-city.png" alt="Cork, Irlanda" fill className="object-cover opacity-10" priority />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Acomodações estudantis em Cork
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Cork é a segunda maior cidade da Irlanda e oferece uma experiência estudantil única, com custo de vida
                mais acessível que Dublin e uma comunidade universitária vibrante. Encontre aqui as melhores opções de
                acomodação para sua jornada acadêmica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/cotacao">Receba uma Cotação</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/cork-city.png" alt="Cork" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Acomodação */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Tipos de Acomodação em Cork
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as opções disponíveis para estudantes brasileiros em Cork
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
                <p className="text-lg text-teal-500 font-medium">A partir de €700/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €800/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €550/mês</p>
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
              Principais Bairros em Cork
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as regiões mais procuradas por estudantes brasileiros
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "City Centre",
                description: "Centro da cidade, próximo às principais atrações e escolas de inglês.",
                pros: "Localização central, fácil acesso a transporte",
                price: "€€€",
              },
              {
                name: "Bishopstown",
                description: "Área universitária próxima ao Cork Institute of Technology.",
                pros: "Ambiente estudantil, boas conexões de ônibus",
                price: "€€",
              },
              {
                name: "Douglas",
                description: "Bairro residencial tranquilo a poucos minutos do centro.",
                pros: "Tranquilo, bom para estudos",
                price: "€€",
              },
              {
                name: "Wilton",
                description: "Área residencial com boas opções de compras e serviços.",
                pros: "Infraestrutura completa, bom custo-benefício",
                price: "€€",
              },
              {
                name: "Blackrock",
                description: "Área costeira com belas paisagens e ambiente tranquilo.",
                pros: "Vista para o mar, tranquilidade",
                price: "€€€",
              },
              {
                name: "Ballincollig",
                description: "Região mais afastada com preços mais acessíveis e boa infraestrutura.",
                pros: "Econômico, espaçoso",
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

      {/* Dicas */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/images/cork-tips.png"
                alt="Dicas para morar em Cork"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">
                Dicas para morar em Cork
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Transporte público</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Cork tem um bom sistema de ônibus. O Leap Card também funciona aqui e oferece descontos nas
                    passagens.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Clima</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    O clima em Cork é similar ao de Dublin, com chuvas frequentes. Invista em roupas impermeáveis e um
                    bom guarda-chuva.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Custo de vida</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Cork oferece um custo de vida cerca de 15-20% menor que Dublin. Reserve aproximadamente €120-170 por
                    semana para despesas como alimentação e transporte.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Vida estudantil</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Cork tem uma vibrante vida estudantil graças à University College Cork e ao Cork Institute of
                    Technology. Aproveite os eventos e atividades organizados para estudantes.
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
            Pronto para encontrar sua acomodação em Cork?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Preencha nosso formulário de cotação e receba as melhores opções para sua estadia em Cork.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/cotacao" className="flex items-center gap-2">
              Receba uma Cotação <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
