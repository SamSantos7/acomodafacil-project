"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ArrowRight, Building, Users, BarChart } from "lucide-react"

export default function FuturoDesenvolvimento() {
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
            src="/images/future-development.png"
            alt="Desenvolvimento Futuro"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Desenvolvimento Futuro</h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Conheça os recursos e funcionalidades que estamos desenvolvendo para melhorar ainda mais a experiência dos
              estudantes e parceiros na plataforma AcomodaFácil.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <Tabs defaultValue="mapa" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mapa">Mapa Interativo</TabsTrigger>
              <TabsTrigger value="parceiros">Painel do Parceiro</TabsTrigger>
              <TabsTrigger value="app">Aplicativo Mobile</TabsTrigger>
            </TabsList>
            <TabsContent value="mapa" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Mapa Interativo de Acomodações</CardTitle>
                  <CardDescription>
                    Visualize todas as opções de acomodação em um mapa interativo da Irlanda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-dashed border-teal-300 bg-white/50 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Image
                        src="/images/map-preview.png"
                        alt="Prévia do Mapa Interativo"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-graphite-400">Recursos Planejados</h3>
                      <ul className="space-y-2">
                        {[
                          "Visualização de todas as acomodações no mapa",
                          "Filtros por tipo, preço e localização",
                          "Informações detalhadas ao clicar em cada ponto",
                          "Cálculo de distância até escolas e pontos de interesse",
                          "Visualização de transporte público próximo",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-graphite-300">
                            <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-graphite-400">Benefícios</h3>
                      <p className="text-graphite-300 leading-relaxed">
                        O mapa interativo permitirá que os estudantes visualizem geograficamente todas as opções
                        disponíveis, facilitando a escolha com base na localização e proximidade de pontos importantes
                        como escolas, transporte público e áreas de interesse.
                      </p>
                      <p className="text-graphite-300 leading-relaxed">
                        Esta funcionalidade está em desenvolvimento e será lançada nos próximos meses.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parceiros" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Painel do Parceiro</CardTitle>
                  <CardDescription>
                    Uma plataforma dedicada para nossos parceiros gerenciarem suas acomodações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-xl card-hover bg-white">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                          <Building className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-graphite-400">Gerenciamento de Acomodações</h3>
                        <p className="text-graphite-300 leading-relaxed">
                          Cadastro e edição de acomodações, com upload de fotos, descrições e detalhes.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl card-hover bg-white">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                          <Users className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-graphite-400">Gestão de Reservas</h3>
                        <p className="text-graphite-300 leading-relaxed">
                          Acompanhamento de solicitações, confirmações e histórico de reservas.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl card-hover bg-white">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-teal-500">
                          <BarChart className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-graphite-400">Análise de Performance</h3>
                        <p className="text-graphite-300 leading-relaxed">
                          Estatísticas e relatórios sobre visualizações, conversões e avaliações.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 p-6 bg-sand-50 rounded-lg">
                    <h3 className="text-xl font-bold text-graphite-400 mb-4">Benefícios para Parceiros</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-2">
                        {[
                          "Maior visibilidade para suas acomodações",
                          "Gestão centralizada de todas as propriedades",
                          "Comunicação direta com estudantes interessados",
                          "Relatórios detalhados de performance",
                          "Suporte dedicado da equipe AcomodaFácil",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-graphite-300">
                            <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <p className="text-graphite-300 leading-relaxed mb-4">
                          O Painel do Parceiro está em desenvolvimento e será lançado em fases, começando com o
                          gerenciamento básico de acomodações e expandindo para recursos mais avançados.
                        </p>
                        <p className="text-graphite-300 leading-relaxed">
                          Se você é um provedor de acomodações na Irlanda e tem interesse em se tornar um parceiro,
                          entre em contato conosco.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="app" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Aplicativo Mobile</CardTitle>
                  <CardDescription>Acesse a AcomodaFácil diretamente do seu smartphone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="relative h-[500px] w-[250px] mx-auto">
                        <Image
                          src="/images/app-preview.png"
                          alt="Prévia do Aplicativo Mobile"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      <h3 className="text-xl font-bold text-graphite-400">Recursos Planejados</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ul className="space-y-2">
                          {[
                            "Busca e filtro de acomodações",
                            "Chat direto com a equipe de suporte",
                            "Notificações sobre novas opções",
                            "Favoritos e comparação de acomodações",
                            "Agendamento de visitas virtuais",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-graphite-300">
                              <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <ul className="space-y-2">
                          {[
                            "Mapa interativo integrado",
                            "Avaliações e depoimentos",
                            "Guias de bairros e regiões",
                            "Dicas para estudantes",
                            "Documentos e contratos digitais",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-graphite-300">
                              <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-sand-50 p-4 rounded-lg">
                        <p className="text-graphite-300 leading-relaxed">
                          O aplicativo mobile da AcomodaFácil está em fase de planejamento e será desenvolvido para iOS
                          e Android. Nosso objetivo é proporcionar uma experiência ainda mais conveniente para
                          estudantes que estão planejando sua mudança para a Irlanda.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Quer sugerir uma nova funcionalidade?</h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8 md:text-xl">
            Estamos sempre buscando melhorar nossa plataforma. Se você tem uma sugestão ou ideia para tornar a
            AcomodaFácil ainda melhor, adoraríamos ouvir!
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/contato" className="flex items-center gap-2">
              Enviar Sugestão <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
