"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [busca, setBusca] = useState({
    destino: "",
    tipo: "",
    semanas: "",
    dataInicio: "",
    pessoas: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/acomodacoes?${new URLSearchParams(busca).toString()}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Encontre sua Acomodação Ideal</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Destino</label>
            <Input 
              type="text"
              placeholder="Digite a cidade"
              value={busca.destino}
              onChange={(e) => setBusca({...busca, destino: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Acomodação</label>
            <select 
              className="w-full rounded-md border border-gray-300 p-2"
              value={busca.tipo}
              onChange={(e) => setBusca({...busca, tipo: e.target.value})}
            >
              <option value="">Selecione</option>
              <option value="apartamento">Apartamento</option>
              <option value="residencia">Residência Estudantil</option>
              <option value="homestay">Homestay</option>
              <option value="studio">Estúdio Individual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Semanas</label>
            <Input 
              type="number"
              placeholder="Número de semanas"
              value={busca.semanas}
              onChange={(e) => setBusca({...busca, semanas: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data de Início</label>
            <Input 
              type="date"
              value={busca.dataInicio}
              onChange={(e) => setBusca({...busca, dataInicio: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Número de Pessoas</label>
            <Input 
              type="number"
              placeholder="Quantidade de pessoas"
              value={busca.pessoas}
              onChange={(e) => setBusca({...busca, pessoas: e.target.value})}
            />
          </div>

          <div className="flex items-end">
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              Buscar
            </Button>
          </div>
        </form>
      </Card>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Acomodações Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularAccommodations.map((acc, index) => (
              <Link 
                key={index} 
                href={`/acomodacoes/${acc.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={acc.image}
                    alt={acc.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{acc.title}</h3>
                  <p className="text-gray-600 mb-4">{acc.location}</p>
                  <div className="flex items-center text-premium-gold">
                    <span className="text-lg font-semibold">{acc.price}</span>
                    <span className="text-sm text-gray-500 ml-2">por semana</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}

const popularAccommodations = [
  {
    title: "Apartamento Teste",
    location: "Galway",
    price: "€150",
    image: "/images/shared-apartment.png",
    slug: "apartamento-teste"
  },
  {
    title: "Residência Estudantil Central",
    location: "Dublin",
    price: "€195",
    image: "/images/student-residence.png",
    slug: "residencia-estudantil-central"
  },
  {
    title: "Casa de Família em Galway",
    location: "Galway",
    price: "€210",
    image: "/images/homestay.png",
    slug: "casa-de-familia-em-galway"
  }
]