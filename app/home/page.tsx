
import Image from 'next/image'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar, Home, Building2, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-premium-beige">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-home.png"
            alt="Apartamento premium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white mb-8">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Seu Lar no Intercâmbio
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Encontre a acomodação ideal para sua experiência na Irlanda
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg max-w-4xl mx-auto">
            <form 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const params = new URLSearchParams(formData as any)
                window.location.href = `/acomodacoes?${params.toString()}`
              }}
            >
              <Select name="destino" required>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dublin">Dublin</SelectItem>
                  <SelectItem value="cork">Cork</SelectItem>
                  <SelectItem value="galway">Galway</SelectItem>
                  <SelectItem value="limerick">Limerick</SelectItem>
                </SelectContent>
              </Select>

              <Select name="tipo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de acomodação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencia">Residência Estudantil</SelectItem>
                  <SelectItem value="apartamento">Apartamento Compartilhado</SelectItem>
                  <SelectItem value="homestay">Casa de Família</SelectItem>
                  <SelectItem value="studio">Estúdio Individual</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Semanas" name="semanas" min="1" required />
                <Input type="number" placeholder="Pessoas" name="pessoas" min="1" required />
              </div>

              <div className="md:col-span-2 lg:col-span-2">
                <Input type="date" placeholder="Data de início" name="data_inicio" required />
              </div>

              <Button type="submit" className="w-full bg-premium-gold hover:bg-premium-gold/90">
                Buscar Acomodações
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Accommodations */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
            Acomodações Populares
          </h2>
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-premium-beige">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
            Com a gente, você chega com endereço certo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <Home className="w-12 h-12 mx-auto mb-4 text-premium-gold" />
              <h3 className="text-xl font-bold mb-2">Acomodações Verificadas</h3>
              <p className="text-gray-600">Todas as opções são cuidadosamente selecionadas e verificadas.</p>
            </div>
            <div className="text-center p-6">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-premium-gold" />
              <h3 className="text-xl font-bold mb-2">Localização Estratégica</h3>
              <p className="text-gray-600">Próximo a escolas, transporte e facilidades.</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-premium-gold" />
              <h3 className="text-xl font-bold mb-2">Suporte Dedicado</h3>
              <p className="text-gray-600">Acompanhamento durante toda sua estadia.</p>
            </div>
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-premium-gold hover:bg-premium-gold/90">
              <Link href="/acomodacoes">
                Encontre a acomodação ideal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const popularAccommodations = [
  {
    title: "Residência Estudantil Premium",
    location: "Dublin",
    price: "€250",
    image: "/images/student-residence.png",
    slug: "residencia-premium-dublin"
  },
  {
    title: "Apartamento Compartilhado",
    location: "Cork",
    price: "€200",
    image: "/images/shared-apartment.png",
    slug: "apartamento-compartilhado-cork"
  },
  {
    title: "Casa de Família",
    location: "Galway",
    price: "€180",
    image: "/images/homestay.png",
    slug: "casa-familia-galway"
  }
]
