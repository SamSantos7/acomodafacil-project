"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  MapPin,
  Bed,
  Search,
  Filter,
  CheckCircle,
  Calendar,
  ArrowRight,
  Home,
  Building,
  Users,
  Star,
} from "lucide-react"

export default function Acomodacoes() {
  // Parallax effect
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  // Filtros
  const [activeCity, setActiveCity] = useState("all")
  const [activeType, setActiveType] = useState("all")
  const [priceRange, setPriceRange] = useState([150, 300])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dados de exemplo para acomodações
  const accommodations = [
    {
      id: 1,
      name: "Residência Estudantil Central",
      type: "Residência Estudantil",
      location: "Dublin",
      address: "123 O'Connell Street, Dublin 1",
      price: 195,
      active: true,
      features: ["Quarto individual", "Banheiro privativo", "Wi-Fi", "Cozinha compartilhada"],
      included: ["Internet de alta velocidade", "Limpeza semanal", "Utensílios de cozinha", "Contas inclusas"],
      notIncluded: ["Refeições", "Serviço de lavanderia", "Toalhas e roupas de cama"],
      description: "Residência moderna no centro de Dublin, próxima às principais escolas de inglês e universidades.",
      images: ["/images/student-residence.png", "/images/apartment-living.png"],
      rating: 4.8,
      reviews: 24,
      slug: "residencia-estudantil-central",
    },
    {
      id: 2,
      name: "Apartamento Compartilhado - Temple Bar",
      type: "Apartamento Compartilhado",
      location: "Dublin",
      address: "45 Temple Bar, Dublin 2",
      price: 175,
      active: true,
      features: ["Quarto mobiliado", "Cozinha equipada", "Sala comum", "Internet fibra"],
      included: ["Internet", "TV a cabo", "Mobília completa", "Utensílios domésticos"],
      notIncluded: ["Contas de luz e gás", "Limpeza", "Alimentação"],
      description: "Apartamento no coração de Dublin, compartilhado com outros estudantes internacionais.",
      images: ["/images/shared-apartment.png"],
      rating: 4.5,
      reviews: 18,
      slug: "apartamento-compartilhado-temple-bar",
    },
    {
      id: 3,
      name: "Casa de Família em Galway",
      type: "Casa de Família",
      location: "Galway",
      address: "78 Salthill Road, Galway",
      price: 210,
      active: true,
      features: ["Quarto privativo", "Café da manhã e jantar", "Ambiente familiar", "Wi-Fi"],
      included: ["Duas refeições diárias", "Lavanderia semanal", "Internet", "Limpeza do quarto"],
      notIncluded: ["Almoço", "Transporte", "Material de estudo"],
      description: "Família acolhedora em Galway, com experiência em receber estudantes internacionais.",
      images: ["/images/homestay.png"],
      rating: 4.9,
      reviews: 32,
      slug: "casa-de-familia-em-galway",
    },
    {
      id: 4,
      name: "Estúdio Individual - Cork",
      type: "Estúdio Individual",
      location: "Cork",
      address: "22 Washington Street, Cork",
      price: 250,
      active: false,
      features: ["Totalmente mobiliado", "Cozinha própria", "Banheiro privativo", "Internet"],
      included: ["Mobília completa", "Internet", "TV", "Utensílios de cozinha"],
      notIncluded: ["Contas de luz, água e gás", "Limpeza", "Alimentação"],
      description: "Estúdio moderno e independente no centro de Cork, ideal para quem busca privacidade.",
      images: ["/images/apartment-living.png"],
      rating: 4.6,
      reviews: 15,
      slug: "estudio-individual-cork",
    },
    {
      id: 5,
      name: "Residência Universitária - Limerick",
      type: "Residência Estudantil",
      location: "Limerick",
      address: "University of Limerick, Castletroy",
      price: 185,
      active: true,
      features: ["Quarto individual", "Banheiro compartilhado", "Áreas comuns", "Academia"],
      included: ["Internet", "Água, luz e gás", "Acesso à academia", "Segurança 24h"],
      notIncluded: ["Alimentação", "Limpeza do quarto", "Lavanderia"],
      description: "Residência dentro do campus da Universidade de Limerick, com todas as facilidades universitárias.",
      images: ["/images/student-residence.png"],
      rating: 4.7,
      reviews: 21,
      slug: "residencia-universitaria-limerick",
    },
    {
      id: 6,
      name: "Apartamento Compartilhado - Galway",
      type: "Apartamento Compartilhado",
      location: "Galway",
      address: "15 Eyre Square, Galway",
      price: 165,
      active: true,
      features: ["Quarto mobiliado", "Cozinha compartilhada", "Sala de estar", "Lavanderia"],
      included: ["Internet", "Mobília", "Utensílios de cozinha", "Máquina de lavar"],
      notIncluded: ["Contas de luz e gás", "Alimentação", "Produtos de limpeza"],
      description: "Apartamento bem localizado no centro de Galway, compartilhado com outros estudantes.",
      images: ["/images/shared-apartment.png"],
      rating: 4.4,
      reviews: 12,
      slug: "apartamento-compartilhado-galway",
    },
    {
      id: 7,
      name: "Casa de Família - Dublin",
      type: "Casa de Família",
      location: "Dublin",
      address: "87 Griffith Avenue, Dublin 9",
      price: 225,
      active: true,
      features: ["Quarto privativo", "Todas as refeições", "Ambiente familiar", "Jardim"],
      included: ["Três refeições diárias", "Lavanderia", "Internet", "Limpeza do quarto"],
      notIncluded: ["Transporte", "Material de estudo", "Passeios"],
      description: "Família irlandesa acolhedora em área residencial tranquila, a 20 minutos do centro de Dublin.",
      images: ["/images/homestay.png"],
      rating: 4.9,
      reviews: 28,
      slug: "casa-de-familia-dublin",
    },
    {
      id: 8,
      name: "Estúdio Moderno - Limerick",
      type: "Estúdio Individual",
      location: "Limerick",
      address: "34 O'Connell Street, Limerick",
      price: 230,
      active: true,
      features: ["Totalmente mobiliado", "Cozinha equipada", "Banheiro privativo", "Smart TV"],
      included: ["Internet", "TV a cabo", "Mobília", "Utensílios de cozinha"],
      notIncluded: ["Contas de luz e gás", "Limpeza", "Alimentação"],
      description: "Estúdio recém-reformado no centro de Limerick, com móveis modernos e ótima localização.",
      images: ["/images/apartment-living.png"],
      rating: 4.8,
      reviews: 9,
      slug: "estudio-moderno-limerick",
    },
    {
      id: 9,
      name: "Residência Premium - Cork",
      type: "Residência Estudantil",
      location: "Cork",
      address: "University College Cork, College Road",
      price: 240,
      active: true,
      features: ["Suíte privativa", "Cozinha compartilhada", "Academia", "Sala de estudos"],
      included: ["Internet de alta velocidade", "Água, luz e gás", "Limpeza das áreas comuns", "Segurança 24h"],
      notIncluded: ["Alimentação", "Limpeza do quarto", "Lavanderia"],
      description: "Residência de alto padrão próxima à University College Cork, com instalações modernas.",
      images: ["/images/student-residence.png"],
      rating: 4.7,
      reviews: 17,
      slug: "residencia-premium-cork",
    },
  ]

  // Filtrar acomodações
  const filteredAccommodations = accommodations.filter((accommodation) => {
    // Filtrar apenas acomodações ativas
    if (!accommodation.active) {
      return false
    }

    // Filtro por cidade
    if (activeCity !== "all" && accommodation.location.toLowerCase() !== activeCity) {
      return false
    }

    // Filtro por tipo
    if (activeType !== "all" && accommodation.type !== activeType) {
      return false
    }

    // Filtro por preço
    if (accommodation.price < priceRange[0] || accommodation.price > priceRange[1]) {
      return false
    }

    // Filtro por termo de busca
    if (
      searchTerm &&
      !accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !accommodation.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

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
            <Button variant="outline" className="md:w-auto" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-5 w-5" />
              Filtros
            </Button>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="bg-sand-50 p-6 rounded-lg mb-8 animate-fadeIn">
              <h3 className="text-lg font-bold text-graphite-400 mb-4">Filtrar Acomodações</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label>Cidade</label>
                  <Select value={activeCity} onValueChange={setActiveCity}>
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
                  <Select value={activeType} onValueChange={setActiveType}>
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
            <Tabs defaultValue="all" value={activeCity} onValueChange={setActiveCity}>
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
              {filteredAccommodations.length} acomodações encontradas
            </h2>

            {filteredAccommodations.length === 0 ? (
              <div className="text-center py-12 bg-sand-50 rounded-lg">
                <Bed className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-graphite-400">Nenhuma acomodação encontrada</h3>
                <p className="mt-2 text-graphite-300">Tente ajustar seus filtros para ver mais opções.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredAccommodations.map((accommodation) => (
                  <Card key={accommodation.id} className="overflow-hidden border-none shadow-xl card-hover">
                    <Link href={`/acomodacoes/${accommodation.slug}`}>
                      <div className="relative h-[200px]">
                        <Image
                          src={accommodation.images[0] || "/placeholder.svg"}
                          alt={accommodation.name}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-white text-graphite-400">{accommodation.type}</Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-graphite-400">{accommodation.name}</h3>
                          <span className="text-lg font-bold text-teal-500">€{accommodation.price}/semana</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-graphite-300 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{accommodation.address}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gold-500 mb-4">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{accommodation.rating}</span>
                          <span className="text-graphite-300">({accommodation.reviews} avaliações)</span>
                        </div>
                        <p className="text-graphite-300 text-sm mb-4 line-clamp-2">{accommodation.description}</p>
                        <div className="space-y-2 mb-4">
                          {accommodation.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-graphite-300">
                              <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
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
