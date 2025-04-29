"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Bed, Search, Filter, CheckCircle, Calendar, ArrowRight, Home, Building, Users, Star, } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Acomodacao {
  id: string
  titulo: string
  tipo: string
  cidade: string
  preco: number
  imagens: string[]
}

export default function AcomodacoesPage() {
  const searchParams = useSearchParams()
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([])
  const [loading, setLoading] = useState(true)
  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  // Filtros
  const [activeCity, setActiveCity] = useState("all")
  const [activeType, setActiveType] = useState("all")
  const [priceRange, setPriceRange] = useState([150, 300])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popular"); // Add sort state

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const buscarAcomodacoes = async () => {
      let query = supabase.from("acomodacoes").select("*")

      // Aplicar filtros da busca
      if (searchParams.get("destino")) {
        query = query.ilike("cidade", `%${searchParams.get("destino")}%`)
      }
      if (searchParams.get("tipo")) {
        query = query.eq("tipo", searchParams.get("tipo"))
      }

      const { data, error } = await query

      if (data) {
        setAcomodacoes(data)
      }
      setLoading(false)
    }

    buscarAcomodacoes()
  }, [searchParams])

  const getAccommodationTypeIcon = (type: string) => {
    switch (type) {
      case "Residência Estudantil":
        return <Building className="h-5 w-5" />
      case "Apartamento Compartilhado":
        return <Users className="h-5 w-5" />
      case "Casa de Família":
        return <Home className="h-5 w-5" />
      case "Estúdio Individual":
        return <Bed className="h-5 w-5" />
      default:
        return <Bed className="h-5 w-5" />
    }
  }


  const updateSearchParams = () => {
    let params = new URLSearchParams();
    if (activeCity !== 'all') params.set('destino', activeCity);
    if (activeType !== 'all') params.set('tipo', activeType);
    params.set('sortBy', sortBy); // Add sortBy to params
    window.location.href = `/acomodacoes?${params.toString()}`

  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/accommodations-hero.png"
            alt="Acomodações na Irlanda"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Encontre a acomodação ideal
            </h1>
            <p className="text-graphite-300 md:text-xl leading-relaxed">
              Explore nossa seleção de acomodações para estudantes em toda a Irlanda. Filtre por cidade, tipo e
              orçamento para encontrar a opção perfeita para sua estadia.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Resultados */}
      <section className="bg-white py-16 md:py-20">
        <div className="container px-4">
          {/* Barra de pesquisa */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nome, descrição ou localização..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2"> {/* Added div for better spacing */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="md:w-auto" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-5 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="bg-sand-50 p-6 rounded-lg mb-8 animate-fadeIn">
              <h3 className="text-lg font-bold text-graphite-400 mb-4">Filtrar Acomodações</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label>Cidade</label>
                  <Select value={activeCity} onValueChange={(value) => {setActiveCity(value); updateSearchParams();}}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as cidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cidades</SelectItem>
                      <SelectItem value="dublin">Dublin</SelectItem>
                      <SelectItem value="cork">Cork</SelectItem>
                      <SelectItem value="galway">Galway</SelectItem>
                      <SelectItem value="limerick">Limerick</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label>Tipo de Acomodação</label>
                  <Select value={activeType} onValueChange={(value) => {setActiveType(value); updateSearchParams();}}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="Residência Estudantil">Residência Estudantil</SelectItem>
                      <SelectItem value="Apartamento Compartilhado">Apartamento Compartilhado</SelectItem>
                      <SelectItem value="Casa de Família">Casa de Família</SelectItem>
                      <SelectItem value="Estúdio Individual">Estúdio Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label>Faixa de Preço (semanal)</label>
                    <span className="text-sm text-graphite-300">
                      €{priceRange[0]} - €{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[150, 300]}
                    min={150}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Filtro rápido por cidade */}
          <div className="mb-8">
            <Tabs defaultValue="all" value={activeCity} onValueChange={(value) => {setActiveCity(value); updateSearchParams();}}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">Todas as cidades</TabsTrigger>
                <TabsTrigger value="dublin">Dublin</TabsTrigger>
                <TabsTrigger value="cork">Cork</TabsTrigger>
                <TabsTrigger value="galway">Galway</TabsTrigger>
                <TabsTrigger value="limerick">Limerick</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Resultados */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-graphite-400 mb-6">
              {acomodacoes.length} acomodações encontradas
            </h2>

            {acomodacoes.length === 0 ? (
              <div className="text-center py-12 bg-sand-50 rounded-lg">
                <Bed className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-graphite-400">Nenhuma acomodação encontrada</h3>
                <p className="mt-2 text-graphite-300">Tente ajustar seus filtros para ver mais opções.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {acomodacoes.map((acomodacao) => (
                  <Card key={acomodacao.id} className="overflow-hidden border-none shadow-xl card-hover flex flex-col">
                    <Link href={`/acomodacoes/${acomodacao.id}`}> {/* Assuming ID is used for slug */}
                      <div className="relative h-[200px]">
                        <img
                          src={acomodacao.imagens.length > 0 ? acomodacao.imagens[0] : "/placeholder.svg"}
                          alt={acomodacao.titulo}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-white text-graphite-400">{acomodacao.tipo}</Badge>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-graphite-400">{acomodacao.titulo}</h3>
                          <span className="text-lg font-bold text-teal-500">€{acomodacao.preco}/semana</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-graphite-300 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{acomodacao.cidade}</span> {/* Using city instead of address */}
                        </div>
                        <p className="text-graphite-300 text-sm mb-4 line-clamp-2">
                          {/* Removed description as it's not in the Supabase schema */}
                        </p>
                        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Ver Detalhes</Button>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-sand-50 py-16 md:py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite-400 mb-4">Como funciona a reserva</h2>
            <p className="max-w-[700px] mx-auto text-graphite-300">
              Entenda o processo de solicitação e confirmação de reserva de acomodações
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-500">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-graphite-400">1. Encontre a acomodação</h3>
              <p className="text-graphite-300">
                Explore nossas opções e encontre a acomodação que melhor atende às suas necessidades.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-500">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-graphite-400">2. Solicite a reserva</h3>
              <p className="text-graphite-300">
                Preencha o formulário com suas datas e informações para solicitar a reserva.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-500">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-graphite-400">3. Confirme sua reserva</h3>
              <p className="text-graphite-300">
                Após a verificação de disponibilidade, você receberá a confirmação da sua reserva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 text-white py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Não encontrou o que procura?</h2>
          <p className="max-w-[700px] mx-auto text-white/90 mb-8">
            Entre em contato conosco e nossa equipe encontrará a acomodação ideal para você com base nas suas
            preferências.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-500 hover:bg-sand-100 transition-colors">
            <Link href="/contato" className="flex items-center gap-2">
              Fale com um Especialista <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}