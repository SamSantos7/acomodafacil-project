"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react"

export default function Contato() {
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
            src="/images/contact-hero.png"
            alt="Entre em Contato"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Entre em Contato</h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Estamos aqui para ajudar com qualquer dúvida sobre acomodações na Irlanda. Nossa equipe está pronta para
              oferecer suporte personalizado em português.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl">
                <CardHeader className="p-8">
                  <CardTitle className="text-3xl text-graphite-400">Envie sua mensagem</CardTitle>
                  <CardDescription className="text-graphite-300 text-lg mt-2">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form className="space-y-8">
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
                        <label htmlFor="assunto" className="text-sm font-medium text-graphite-400">
                          Assunto
                        </label>
                        <Select>
                          <SelectTrigger id="assunto" className="border-sand-200 focus:ring-teal-500">
                            <SelectValue placeholder="Selecione o assunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="acomodacao">Dúvidas sobre acomodação</SelectItem>
                            <SelectItem value="cotacao">Solicitar cotação</SelectItem>
                            <SelectItem value="parceria">Proposta de parceria</SelectItem>
                            <SelectItem value="depoimento">Enviar depoimento</SelectItem>
                            <SelectItem value="outro">Outro assunto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mensagem" className="text-sm font-medium text-graphite-400">
                        Mensagem
                      </label>
                      <Textarea
                        id="mensagem"
                        placeholder="Digite sua mensagem aqui..."
                        rows={6}
                        className="border-sand-200 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-6">
                        <Send className="mr-2 h-5 w-5" /> Enviar Mensagem
                      </Button>
                      <p className="text-xs text-graphite-300 mt-3 text-center">
                        Ao enviar, você concorda com nossa <Link href="/politica-de-privacidade" className="text-teal-500 hover:underline">Política de Privacidade</Link> e <Link href="/termos-de-uso" className="text-teal-500 hover:underline">Termos de Uso</Link>
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
                    <CardTitle className="text-2xl text-graphite-400">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-graphite-400">E-mail</h3>
                          <p className="text-graphite-300">booking@acomodafacil.com.br</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-graphite-400">WhatsApp</h3>
                          <p className="text-graphite-300">+55 21 97025-6372</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-graphite-400">Horário de Atendimento</h3>
                          <p className="text-graphite-300">Segunda a Sexta: 9h às 18h (horário de Brasilia)</p>
                          <p className="text-graphite-300">Sábado: 10h às 14h (horário de Brasilia)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-sand-50">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl text-graphite-400">Atendimento Rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-4">
                      <p className="text-graphite-300 leading-relaxed">
                        Precisa de uma resposta rápida? Entre em contato pelo WhatsApp ou agende uma chamada de vídeo
                        com um de nossos consultores.
                      </p>
                      <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                        <Link
                          href="https://wa.me/5521970256372"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="h-5 w-5" /> Conversar no WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                question: "Quanto tempo leva para receber uma resposta?",
                answer:
                  "Respondemos a todas as mensagens em até 24 horas úteis. Para assuntos urgentes, recomendamos o contato via WhatsApp.",
              },
              {
                question: "Vocês atendem estudantes de qualquer nacionalidade?",
                answer:
                  "Nosso foco principal são estudantes brasileiros, mas também atendemos estudantes de outros países de língua portuguesa.",
              },
              {
                question: "Qual é o período mínimo de estadia?",
                answer:
                  "O período mínimo de estadia varia de acordo com o tipo de acomodação, mas geralmente é de 4 semanas para estadias curtas e 16 semanas para contratos mais longos.",
              },
              {
                question: "Vocês cobram alguma taxa pelo serviço?",
                answer:
                  "Não cobramos nenhuma taxa dos estudantes. Nossa remuneração vem dos parceiros que oferecem as acomodações.",
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
        </div>
      </section>
    </div>
  )
}