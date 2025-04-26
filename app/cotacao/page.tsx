"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Cotacao() {
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
            src="/placeholder.svg?height=800&width=1600"
            alt="Formulário de Cotação"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Receba nossa curadoria personalizada
            </h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Preencha o formulário abaixo e receba opções personalizadas de acomodação com base no seu perfil. A gente
              cuida da busca e te envia sugestões que fazem sentido pra sua jornada.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl">
                <CardHeader className="p-8">
                  <CardTitle className="text-3xl text-graphite-400">Formulário de Cotação</CardTitle>
                  <CardDescription className="text-graphite-300 text-lg mt-2">
                    Quanto mais informações você fornecer, mais precisas serão nossas recomendações
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-graphite-400">Informações Pessoais</h3>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="nome" className="text-sm font-medium text-graphite-400">
                            Nome Completo
                          </label>
                          <Input
                            id="nome"
                            placeholder="Seu nome completo"
                            className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-graphite-400">
                            E-mail
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="telefone" className="text-sm font-medium text-graphite-400">
                            WhatsApp
                          </label>
                          <Input
                            id="telefone"
                            placeholder="+55 (00) 00000-0000"
                            className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="idade" className="text-sm font-medium text-graphite-400">
                            Idade
                          </label>
                          <Input
                            id="idade"
                            type="number"
                            placeholder="Sua idade"
                            className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-graphite-400">Detalhes da Estadia</h3>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="cidade" className="text-sm font-medium text-graphite-400">
                            Cidade de Interesse
                          </label>
                          <Select>
                            <SelectTrigger id="cidade" className="border-sand-200 focus:ring-teal-500">
                              <SelectValue placeholder="Selecione a cidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dublin">Dublin</SelectItem>
                              <SelectItem value="cork">Cork</SelectItem>
                              <SelectItem value="galway">Galway</SelectItem>
                              <SelectItem value="limerick">Limerick</SelectItem>
                              <SelectItem value="waterford">Waterford</SelectItem>
                              <SelectItem value="outro">Outra cidade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="tipo" className="text-sm font-medium text-graphite-400">
                            Tipo de Acomodação
                          </label>
                          <Select>
                            <SelectTrigger id="tipo" className="border-sand-200 focus:ring-teal-500">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="compartilhado">Apartamento Compartilhado</SelectItem>
                              <SelectItem value="individual">Apartamento Individual</SelectItem>
                              <SelectItem value="residencia">Residência Estudantil</SelectItem>
                              <SelectItem value="homestay">Casa de Família (Homestay)</SelectItem>
                              <SelectItem value="qualquer">Qualquer tipo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="chegada" className="text-sm font-medium text-graphite-400">
                            Data de Chegada
                          </label>
                          <Input
                            id="chegada"
                            type="date"
                            className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="duracao" className="text-sm font-medium text-graphite-400">
                            Duração da Estadia
                          </label>
                          <Select>
                            <SelectTrigger id="duracao" className="border-sand-200 focus:ring-teal-500">
                              <SelectValue placeholder="Selecione a duração" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-3">1-3 meses</SelectItem>
                              <SelectItem value="3-6">3-6 meses</SelectItem>
                              <SelectItem value="6-12">6-12 meses</SelectItem>
                              <SelectItem value="12+">Mais de 12 meses</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="orcamento" className="text-sm font-medium text-graphite-400">
                            Orçamento Mensal (EUR)
                          </label>
                          <Select>
                            <SelectTrigger id="orcamento" className="border-sand-200 focus:ring-teal-500">
                              <SelectValue placeholder="Selecione o orçamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ate-500">Até €500</SelectItem>
                              <SelectItem value="500-700">€500 - €700</SelectItem>
                              <SelectItem value="700-900">€700 - €900</SelectItem>
                              <SelectItem value="900-1200">€900 - €1200</SelectItem>
                              <SelectItem value="1200+">Acima de €1200</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="pessoas" className="text-sm font-medium text-graphite-400">
                            Número de Pessoas
                          </label>
                          <Select>
                            <SelectTrigger id="pessoas" className="border-sand-200 focus:ring-teal-500">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 pessoa</SelectItem>
                              <SelectItem value="2">2 pessoas</SelectItem>
                              <SelectItem value="3+">3 ou mais pessoas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="preferencias" className="text-sm font-medium text-graphite-400">
                          Preferências Adicionais
                        </label>
                        <Textarea
                          id="preferencias"
                          placeholder="Conte-nos sobre suas preferências (localização, comodidades, etc.)"
                          rows={4}
                          className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-6">
                        Enviar Solicitação
                      </Button>
                      <p className="text-xs text-graphite-300 mt-3 text-center">
                        Ao enviar, você concorda com nossa Política de Privacidade e Termos de Uso
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="sticky top-24 space-y-8">
                <Card className="border-none shadow-xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl text-graphite-400">Por que escolher a AcomodaFácil?</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-6">
                      {[
                        "Atendimento 100% em português",
                        "Mais de 500 acomodações disponíveis",
                        "Contratos seguros e verificados",
                        "Suporte durante toda sua estadia",
                        "Sem taxas adicionais escondidas",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span className="text-graphite-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-sand-50">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl text-graphite-400">Precisa de ajuda?</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="mb-6 text-graphite-300 leading-relaxed">
                      Tem dúvidas sobre o formulário ou processo? Entre em contato com nossa equipe:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-500"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span className="text-graphite-300">+353 (0) 1 234 5678</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-500"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span className="text-graphite-300">contato@acomodafacil.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-500"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="text-graphite-300">WhatsApp: +55 (11) 98765-4321</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
