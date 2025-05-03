"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Globe, Heart } from "lucide-react"

export default function QuemSomos() {
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
            src="/images/team-photo.png"
            alt="Equipe AcomodaFácil"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Sobre a AcomodaFácil</h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Conheça nossa história e como ajudamos estudantes brasileiros a encontrarem seu lar no exterior
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/team-photo.png" alt="Equipe AcomodaFácil" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-2xl leading-relaxed mb-8 text-graphite-400">
                A AcomodaFácil nasceu com um propósito simples: ajudar estudantes brasileiros a encontrarem uma casa
                segura, confortável e confiável no exterior.
              </p>
              <p className="text-xl leading-relaxed mb-8 text-graphite-300">
                Sabemos o quanto essa experiência pode ser desafiadora — e é por isso que cuidamos de cada detalhe da
                sua acomodação com suporte humanizado, parceiros verificados e uma curadoria feita com atenção real.
              </p>
              <p className="text-xl leading-relaxed mb-8 text-graphite-300">
                Seu sonho é estudar fora. O nosso é garantir que você se sinta em casa desde o primeiro dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores Section */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Nossos Valores</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Princípios que guiam nosso trabalho e compromisso com os estudantes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-gold-500">
                  <Heart className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Cuidado Humanizado</h3>
                <p className="text-graphite-300 leading-relaxed">
                  Tratamos cada estudante de forma personalizada, entendendo suas necessidades específicas e oferecendo
                  suporte genuíno.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-gold-500">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Confiabilidade</h3>
                <p className="text-graphite-300 leading-relaxed">
                  Verificamos cuidadosamente cada parceiro e acomodação para garantir segurança e qualidade aos nossos
                  estudantes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-gold-500">
                  <Globe className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Conexão Cultural</h3>
                <p className="text-graphite-300 leading-relaxed">
                  Facilitamos a adaptação cultural, ajudando brasileiros a se sentirem em casa mesmo estando longe.
                </p>
              </CardContent>
            </Card>
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
            Conte com nossa experiência para garantir um lar seguro e confortável durante seu intercâmbio.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/cotacao">Receba uma Cotação</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
