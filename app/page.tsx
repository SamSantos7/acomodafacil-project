"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const featuredRef = useRef<HTMLDivElement>(null)

  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextSlide = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: 320, behavior: "smooth" })
      setActiveSlide((prev) => (prev + 1) % 4)
    }
  }

  const prevSlide = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: -320, behavior: "smooth" })
      setActiveSlide((prev) => (prev - 1 + 4) % 4)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/hero-home.png"
            alt="Estudantes em Dublin"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                AcomodaFácil
                <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 text-teal-500">
                  Sua nova casa no mundo, escolhida com atenção a cada detalhe.
                </span>
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Somos especialistas em acomodação estudantil para brasileiros na Irlanda. Cuidamos da sua chegada com
                conforto, segurança e suporte 100% em português.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/cotacao">Receba uma Cotação</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                  <Link href="/como-funciona">Como Funciona</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-current text-gold-500" />
                <Star className="h-4 w-4 fill-current text-gold-500" />
                <Star className="h-4 w-4 fill-current text-gold-500" />
                <Star className="h-4 w-4 fill-current text-gold-500" />
                <Star className="h-4 w-4 fill-current text-gold-500" />
                <span className="text-graphite-300">
                  <strong>4.9/5</strong> - Mais de 500 estudantes satisfeitos
                </span>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/student-group.png"
                alt="Estudantes brasileiros na Irlanda"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Encontre a acomodação ideal em 3 passos
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Acomodações selecionadas por especialistas, com suporte local e atendimento em português desde o primeiro
              contato.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Preencha o Formulário</h3>
                <p className="text-graphite-300">Você preenche o formulário com seu perfil e destino</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Receba Opções</h3>
                <p className="text-graphite-300">A gente busca as melhores opções com nossos parceiros locais</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl card-hover bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">Viaje Tranquilo</h3>
                <p className="text-graphite-300">Você escolhe, confirma e viaja com tudo resolvido</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curadoria Personalizada Section */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Recomendação Personalizada
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Cada acomodação que oferecemos é escolhida com cuidado, para que sua experiência no exterior comece com
              conforto e tranquilidade.
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory" ref={featuredRef}>
              {[
                {
                  title: "Residência Estudantil Premium",
                  location: "Dublin",
                  price: "€950/mês",
                  features: ["Quarto individual", "Banheiro privativo", "Área comum", "Wi-Fi de alta velocidade"],
                  image: "/images/student-residence.png",
                },
                {
                  title: "Apartamento Compartilhado",
                  location: "Cork",
                  price: "€750/mês",
                  features: ["Quarto mobiliado", "Cozinha equipada", "Localização central", "Contas inclusas"],
                  image: "/images/shared-apartment.png",
                },
                {
                  title: "Casa de Família Selecionada",
                  location: "Galway",
                  price: "€850/mês",
                  features: ["Quarto privativo", "Café da manhã e jantar", "Ambiente familiar", "Prática de inglês"],
                  image: "/images/homestay.png",
                },
                {
                  title: "Estúdio Individual",
                  location: "Limerick",
                  price: "€1050/mês",
                  features: [
                    "Totalmente mobiliado",
                    "Independência total",
                    "Localização privilegiada",
                    "Segurança 24h",
                  ],
                  image: "/images/apartment-living.png",
                },
              ].map((item, index) => (
                <div key={index} className="min-w-[300px] md:min-w-[350px] snap-start">
                  <Card className="border-none shadow-xl overflow-hidden card-hover h-full">
                    <div className="relative h-[200px]">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-graphite-400">{item.title}</h3>
                          <p className="text-sm text-graphite-300 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {item.location}
                          </p>
                        </div>
                        <span className="text-teal-500 font-bold">{item.price}</span>
                      </div>
                      <ul className="space-y-2 mt-4">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-graphite-300">
                            <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white">
                        <Link href="/cotacao">Receba uma Cotação</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-graphite-400 hover:text-teal-500 transition-colors z-10 hidden md:block"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg text-graphite-400 hover:text-teal-500 transition-colors z-10 hidden md:block"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === index ? "w-8 bg-teal-500" : "w-2 bg-gray-300"
                  }`}
                  onClick={() => {
                    if (featuredRef.current) {
                      featuredRef.current.scrollTo({
                        left: index * 320,
                        behavior: "smooth",
                      })
                      setActiveSlide(index)
                    }
                  }}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinos Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Destinos Populares</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Conheça as principais cidades da Irlanda onde ajudamos estudantes brasileiros a encontrar acomodação
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dublin", count: "250+ acomodações", image: "/images/dublin-city.png" },
              { name: "Cork", count: "120+ acomodações", image: "/images/cork-city.png" },
              { name: "Galway", count: "80+ acomodações", image: "/images/galway-city.png" },
              { name: "Limerick", count: "65+ acomodações", image: "/images/limerick-city.png" },
              { name: "Waterford", count: "40+ acomodações", image: "/images/waterford-city.png" },
              { name: "Belfast", count: "70+ acomodações", image: "/images/belfast-city.png" },
            ].map((city) => (
              <Link
                key={city.name}
                href={`/destinos/${city.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-[1.02] card-hover"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-400/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{city.name}, Irlanda</span>
                    </div>
                    <h3 className="text-2xl font-bold">{city.name}</h3>
                    <p className="text-sm text-gray-200">{city.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
              <Link href="/destinos">Ver Todos os Destinos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vantagens Section */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">
                Destaques da plataforma
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Casas de família, residências estudantis e quartos individuais",
                    description: "Oferecemos diversos tipos de acomodação para atender às suas necessidades.",
                  },
                  {
                    title: "Suporte humanizado e especializado",
                    description: "Atendimento personalizado durante todo o processo.",
                  },
                  {
                    title: "Atendimento em português",
                    description: "Comunicação facilitada do início ao fim, sem barreiras linguísticas.",
                  },
                  {
                    title: "Acomodações verificadas e seguras",
                    description: "Todas as opções são verificadas pela nossa equipe para garantir sua segurança.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-graphite-400">{item.title}</h3>
                      <p className="text-graphite-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Link href="/quem-somos">Conheça Nossa Equipe</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/team-photo.png" alt="Equipe AcomodaFácil" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              O que dizem nossos estudantes
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Veja os depoimentos de brasileiros que encontraram sua acomodação ideal na Irlanda com nossa ajuda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Mariana Silva"
              location="Dublin"
              image="/images/testimonial-1.png"
              rating={5}
              text="A AcomodaFácil foi fundamental para que eu encontrasse um apartamento ótimo em Dublin. Todo o processo foi tranquilo e seguro, recomendo muito!"
            />

            <TestimonialCard
              name="Rafael Costa"
              location="Cork"
              image="/images/testimonial-2.png"
              rating={5}
              text="Consegui uma acomodação perfeita para meu orçamento e próxima da minha escola. O atendimento em português fez toda diferença!"
            />

            <TestimonialCard
              name="Juliana Mendes"
              location="Galway"
              image="/images/testimonial-3.png"
              rating={5}
              text="Cheguei na Irlanda com tudo resolvido graças à AcomodaFácil. Minha casa é exatamente como nas fotos e o suporte continua mesmo após a mudança."
            />
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
              <Link href="/depoimentos" className="flex items-center gap-2">
                Ver Mais Depoimentos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Frase de impacto + CTA Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Com a gente, você chega com endereço certo.
          </h2>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/cotacao">Quero descobrir minha próxima casa</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
