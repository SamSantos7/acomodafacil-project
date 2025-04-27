"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, Quote } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"

export default function Depoimentos() {
  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "Mariana Silva",
      location: "Dublin",
      image: "/images/testimonial-1.png",
      rating: 5,
      text: "A AcomodaFácil foi fundamental para que eu encontrasse um apartamento ótimo em Dublin. Todo o processo foi tranquilo e seguro, recomendo muito! O suporte em português fez toda a diferença quando tive dúvidas sobre o contrato.",
      course: "Curso de Inglês",
      duration: "6 meses",
      accommodationType: "Apartamento Compartilhado",
    },
    {
      id: 2,
      name: "Rafael Costa",
      location: "Cork",
      image: "/images/testimonial-2.png",
      rating: 5,
      text: "Consegui uma acomodação perfeita para meu orçamento e próxima da minha escola. O atendimento em português fez toda diferença! Eles me ajudaram com todas as dúvidas e até me deram dicas sobre a região onde eu iria morar.",
      course: "Mestrado em Administração",
      duration: "12 meses",
      accommodationType: "Residência Estudantil",
    },
    {
      id: 3,
      name: "Juliana Mendes",
      location: "Galway",
      image: "/images/testimonial-3.png",
      rating: 5,
      text: "Cheguei na Irlanda com tudo resolvido graças à AcomodaFácil. Minha casa é exatamente como nas fotos e o suporte continua mesmo após a mudança. Quando tive um problema com o aquecedor, eles me ajudaram a resolver rapidamente.",
      course: "Curso de Inglês + Trabalho",
      duration: "8 meses",
      accommodationType: "Casa de Família",
    },
    {
      id: 4,
      name: "Lucas Oliveira",
      location: "Dublin",
      image: "/images/student-1.png",
      rating: 5,
      text: "Estava muito preocupado em encontrar um lugar para morar antes de chegar em Dublin, mas a AcomodaFácil tornou tudo simples. Recebi várias opções que se encaixavam no meu perfil e orçamento, e pude escolher a melhor para mim.",
      course: "Pós-graduação em Marketing Digital",
      duration: "10 meses",
      accommodationType: "Estúdio Individual",
    },
    {
      id: 5,
      name: "Fernanda Santos",
      location: "Limerick",
      image: "/images/student-2.png",
      rating: 4,
      text: "O processo foi muito tranquilo e a equipe sempre respondeu rapidamente às minhas dúvidas. A acomodação era exatamente como nas fotos. O único ponto que poderia melhorar foi o tempo de resposta do proprietário, mas a AcomodaFácil intermediou bem.",
      course: "Graduação em Engenharia",
      duration: "24 meses",
      accommodationType: "Apartamento Compartilhado",
    },
    {
      id: 6,
      name: "Pedro Almeida",
      location: "Cork",
      image: "/images/testimonial-2.png",
      rating: 5,
      text: "Excelente serviço! Consegui uma casa de família incrível em Cork, com pessoas muito acolhedoras que me ajudaram a melhorar meu inglês. A AcomodaFácil cuidou de todos os detalhes e até me ajudou com dicas sobre a cidade.",
      course: "Curso de Inglês Intensivo",
      duration: "4 meses",
      accommodationType: "Casa de Família",
    },
    {
      id: 7,
      name: "Camila Rodrigues",
      location: "Dublin",
      image: "/images/testimonial-1.png",
      rating: 5,
      text: "Minha experiência com a AcomodaFácil foi incrível! Eles encontraram um apartamento que atendia a todas as minhas necessidades, próximo à minha escola e com um ótimo preço. O processo foi rápido e sem complicações.",
      course: "MBA Internacional",
      duration: "18 meses",
      accommodationType: "Apartamento Compartilhado",
    },
    {
      id: 8,
      name: "Bruno Ferreira",
      location: "Galway",
      image: "/images/student-1.png",
      rating: 5,
      text: "A AcomodaFácil foi essencial para o sucesso do meu intercâmbio. Encontraram uma residência estudantil com ótima localização e preço justo. O suporte contínuo durante toda minha estadia foi um diferencial importante.",
      course: "Curso de Inglês + Estágio",
      duration: "9 meses",
      accommodationType: "Residência Estudantil",
    },
    {
      id: 9,
      name: "Amanda Lima",
      location: "Waterford",
      image: "/images/student-2.png",
      rating: 5,
      text: "Mesmo sendo uma cidade menor, a AcomodaFácil conseguiu me apresentar ótimas opções em Waterford. Fiquei em uma casa de família maravilhosa que me ajudou muito na adaptação à cultura irlandesa.",
      course: "Graduação em Turismo",
      duration: "12 meses",
      accommodationType: "Casa de Família",
    },
  ]

  const featuredTestimonials = testimonials.filter((t) => t.id <= 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/testimonials-hero.png"
            alt="Depoimentos de Estudantes"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Depoimentos de Estudantes
            </h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Conheça as experiências reais de brasileiros que encontraram sua acomodação ideal na Irlanda com a ajuda
              da AcomodaFácil.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Histórias em Destaque</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Depoimentos detalhados de estudantes que compartilharam suas experiências completas
            </p>
          </div>

          <div className="grid gap-12 md:gap-16">
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`grid gap-8 md:grid-cols-2 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "fill-current text-gold-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gold-200 opacity-50" />
                    <p className="text-graphite-300 text-lg italic leading-relaxed pl-6">"{testimonial.text}"</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-graphite-400">{testimonial.name}</h3>
                    <p className="text-graphite-300">{testimonial.location}, Irlanda</p>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-lg">
                    <p className="text-sm text-graphite-300">
                      <strong>Curso:</strong> {testimonial.course}
                    </p>
                    <p className="text-sm text-graphite-300">
                      <strong>Duração:</strong> {testimonial.duration}
                    </p>
                    <p className="text-sm text-graphite-300">
                      <strong>Tipo de Acomodação:</strong> {testimonial.accommodationType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Mais Depoimentos</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Veja o que outros estudantes têm a dizer sobre sua experiência com a AcomodaFácil
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => t.id > 3)
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  location={testimonial.location}
                  image={testimonial.image}
                  rating={testimonial.rating}
                  text={testimonial.text}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Coming Soon */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Depoimentos em Vídeo</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Em breve, disponibilizaremos depoimentos em vídeo de nossos estudantes compartilhando suas experiências na
              Irlanda.
            </p>
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-dashed border-teal-300 bg-white/50 flex items-center justify-center max-w-4xl mx-auto">
            <div className="text-center p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-300 mx-auto mb-4"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <p className="text-teal-500 font-medium">Depoimentos em vídeo em breve</p>
              <p className="text-graphite-300 text-sm mt-2">
                Fique atento às nossas redes sociais para os próximos lançamentos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Compartilhe sua história</h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Você é um estudante que encontrou sua acomodação com a AcomodaFácil? Adoraríamos ouvir sobre sua
            experiência!
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/contato" className="flex items-center gap-2">
              Enviar Depoimento <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
