"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Home, Building, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Dublin() {
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
            src="/images/hero-dublin.png"
            alt="Dublin, Irlanda"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Acomodações estudantis em Dublin
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Seja sua primeira vez fora do Brasil ou não, morar bem é parte essencial da sua experiência. Em Dublin,
                oferecemos casas de família, residências estudantis e opções privativas, sempre com segurança e suporte.
                Fale com a gente para receber opções sob medida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Acomodações</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/dublin-city.png" alt="Dublin" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Acomodação */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Tipos de Acomodação em Dublin
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as opções disponíveis para estudantes brasileiros em Dublin
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
                <p className="text-lg text-teal-500 font-medium">A partir de €800/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €900/mês</p>
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
                <p className="text-lg text-teal-500 font-medium">A partir de €650/mês</p>
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
              Principais Bairros em Dublin
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
                name: "Rathmines",
                description: "Bairro estudantil com boa infraestrutura e ambiente jovem.",
                pros: "Custo-benefício, ambiente estudantil",
                price: "€€",
              },
              {
                name: "Drumcondra",
                description: "Área residencial próxima a universidades e com boas conexões de transporte.",
                pros: "Tranquilo, bom para estudos",
                price: "€€",
              },
              {
                name: "Smithfield",
                description: "Bairro moderno e em desenvolvimento, com boa vida noturna.",
                pros: "Moderno, opções de lazer",
                price: "€€",
              },
              {
                name: "Dun Laoghaire",
                description: "Área costeira com belas paisagens e ambiente tranquilo.",
                pros: "Vista para o mar, tranquilidade",
                price: "€€",
              },
              {
                name: "Tallaght",
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

      {/* Acomodações Disponíveis */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Acomodações Disponíveis em Dublin
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Confira algumas das nossas opções de acomodação em Dublin
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Acomodação 1 */}
            <Card className="overflow-hidden border-none shadow-xl card-hover">
              <div className="relative h-[200px]">
                <Image
                  src="/images/student-residence.png"
                  alt="Residência Estudantil Central"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Residência Estudantil</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Residência Estudantil Central</h3>
                  <span className="text-lg font-bold text-teal-500">€950/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>123 O'Connell Street, Dublin 1</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Residência moderna no centro de Dublin, próxima às principais escolas de inglês e universidades.
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
                  alt="Apartamento Compartilhado - Temple Bar"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Apartamento Compartilhado</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Apartamento Compartilhado - Temple Bar</h3>
                  <span className="text-lg font-bold text-teal-500">€750/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>45 Temple Bar, Dublin 2</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Apartamento no coração de Dublin, compartilhado com outros estudantes internacionais.
                </p>
                <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Acomodação 3 */}
            <Card className="overflow-hidden border-none shadow-xl card-hover">
              <div className="relative h-[200px]">
                <Image src="/images/homestay.png" alt="Casa de Família - Dublin" fill className="object-cover" />
                <Badge className="absolute top-3 left-3 bg-white text-graphite-400">Casa de Família</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-graphite-400">Casa de Família - Dublin</h3>
                  <span className="text-lg font-bold text-teal-500">€900/mês</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-graphite-300 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>87 Griffith Avenue, Dublin 9</span>
                </div>
                <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                  Família irlandesa acolhedora em área residencial tranquila, a 20 minutos do centro de Dublin.
                </p>
                <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/acomodacoes">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link href="/acomodacoes">Ver Todas as Acomodações em Dublin</Link>
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
                src="/images/dublin-tips.png"
                alt="Dicas para morar em Dublin"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">
                Dicas para morar em Dublin
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Transporte público</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Dublin tem um bom sistema de transporte público. Considere adquirir o Leap Card para economizar nas
                    passagens.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Clima</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    O clima em Dublin é imprevisível. Esteja preparado para chuva em qualquer época do ano e invista em
                    roupas impermeáveis.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Custo de vida</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Dublin é uma cidade cara. Além do aluguel, reserve cerca de €150-200 por semana para despesas como
                    alimentação e transporte.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-graphite-400">Documentação</h3>
                  <p className="text-graphite-300 leading-relaxed">
                    Para alugar um imóvel, você precisará do GNIB (cartão de residência), comprovante de matrícula e, em
                    alguns casos, referências.
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
            Pronto para encontrar sua acomodação em Dublin?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Explore nossas opções de acomodação disponíveis em Dublin.
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