"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function ComoFunciona() {
  // Efeito parallax
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
            src="/images/como-funciona-hero.png"
            alt="Processo AcomodaFácil"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Como funciona nosso processo
              </h1>
              <p className="max-w-[600px] text-graphite-300 md:text-xl leading-relaxed">
                Entenda como a AcomodaFácil ajuda estudantes brasileiros a encontrar a acomodação ideal na Irlanda de
                forma simples, segura e eficiente.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/images/student-group.png" alt="Processo AcomodaFácil" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">
              Nosso Processo em 3 Passos
            </h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Encontrar sua acomodação ideal na Irlanda é simples e rápido com a AcomodaFácil
            </p>
          </div>

          <div className="grid gap-12 md:gap-0 md:grid-cols-3 relative">
            {/* Linha conectora (apenas em desktop) */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-sand-200 z-0"></div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">
                  Você preenche o formulário com suas preferências
                </h3>
                <p className="text-graphite-300 max-w-xs leading-relaxed">
                  Informe suas preferências, orçamento e período de estadia no nosso formulário de cotação.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">
                  Nós buscamos as melhores opções com nossos parceiros
                </h3>
                <p className="text-graphite-300 max-w-xs leading-relaxed">
                  Nossa equipe selecionará as melhores opções de acordo com suas necessidades e enviará para você.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                  <span className="text-3xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-graphite-400">
                  Você escolhe, confirma e recebe o suporte até a chegada
                </h3>
                <p className="text-graphite-300 max-w-xs leading-relaxed">
                  Escolha a opção ideal e finalize a reserva com segurança. Nós cuidamos de toda a documentação e
                  garantimos que você chegue na Irlanda com tudo resolvido!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link href="/cotacao">Receba uma Cotação</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Detalhes Section */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                  <Image src="/images/student-1.png" alt="Estudante em Dublin" fill className="object-cover" />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl mt-8">
                  <Image src="/images/apartment-living.png" alt="Apartamento em Dublin" fill className="object-cover" />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/student-residence.png"
                    alt="Residência estudantil"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl mt-8">
                  <Image src="/images/student-2.png" alt="Estudantes brasileiros" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-8">O que oferecemos</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Diversas opções de acomodação",
                    description:
                      "Apartamentos compartilhados, estúdios individuais, residências estudantis e casas de família (homestay).",
                  },
                  {
                    title: "Contratos seguros",
                    description:
                      "Todos os contratos são verificados por nossa equipe jurídica para garantir sua segurança.",
                  },
                  {
                    title: "Suporte na chegada",
                    description:
                      "Oferecemos assistência para check-in e orientações iniciais quando você chegar na Irlanda.",
                  },
                  {
                    title: "Acompanhamento contínuo",
                    description:
                      "Estamos disponíveis durante toda sua estadia para resolver qualquer problema com a acomodação.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-graphite-400">{item.title}</h3>
                      <p className="text-graphite-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite-400 mb-4">Perguntas Frequentes</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300 md:text-lg">
              Tire suas dúvidas sobre o processo de busca e reserva de acomodações na Irlanda
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                question: "Quanto tempo antes devo procurar acomodação?",
                answer:
                  "Recomendamos iniciar a busca pelo menos 2-3 meses antes da sua viagem. Em períodos de alta demanda (agosto-setembro e janeiro), o ideal é começar com 4 meses de antecedência.",
              },
              {
                question: "Preciso pagar alguma taxa para receber cotações?",
                answer:
                  "Não! O serviço de cotação é totalmente gratuito. Você só paga quando decidir reservar uma acomodação.",
              },
              {
                question: "Como funciona o pagamento da acomodação?",
                answer:
                  "Geralmente é necessário um depósito inicial para garantir a reserva (equivalente a 1 mês de aluguel) e o restante pode ser pago ao chegar na Irlanda ou conforme acordado com o proprietário.",
              },
              {
                question: "Vocês oferecem acomodação temporária?",
                answer:
                  "Sim, temos opções para estadias curtas (1-4 semanas) que são ideais para quem está chegando e ainda vai procurar um lugar definitivo.",
              },
              {
                question: "É possível visitar a acomodação antes de fechar contrato?",
                answer:
                  "Para quem já está na Irlanda, organizamos visitas. Para quem está no Brasil, oferecemos tours virtuais detalhados e fotos adicionais.",
              },
              {
                question: "O que acontece se eu tiver problemas com a acomodação?",
                answer:
                  "Nossa equipe de suporte está disponível para mediar qualquer problema entre você e o proprietário, garantindo que seus direitos sejam respeitados.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-xl card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-graphite-400">{item.question}</h3>
                  <p className="text-graphite-300 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-graphite-300 mb-4">Ainda tem dúvidas? Entre em contato conosco</p>
            <Button asChild variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
              <Link href="/contato">Fale com um especialista</Link>
            </Button>
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
            <Link href="/cotacao" className="flex items-center gap-2">
              Receba uma Cotação <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
