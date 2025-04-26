import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Dados mockados - em produção viriam do Supabase
const destinos = {
  dublin: {
    nome: 'Dublin',
    descricao:
      'Capital da Irlanda, Dublin é uma cidade vibrante e acolhedora, perfeita para estudantes internacionais.',
    imagem: '/images/dublin.jpg',
    destaques: [
      'Centro tecnológico europeu',
      'Rica vida cultural e histórica',
      'Excelentes universidades',
      'Transporte público eficiente',
    ],
    bairros: [
      {
        nome: 'City Centre',
        descricao: 'Centro histórico com fácil acesso a tudo',
      },
      {
        nome: 'Rathmines',
        descricao: 'Bairro estudantil com ótima infraestrutura',
      },
      {
        nome: 'Ballsbridge',
        descricao: 'Área residencial premium próxima ao centro',
      },
    ],
  },
  // Adicione mais cidades conforme necessário
}

export default function DestinoPage({ params }: { params: { cidade: string } }) {
  const destino = destinos[params.cidade as keyof typeof destinos]

  if (!destino) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={destino.imagem}
            alt={destino.nome}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {destino.nome}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {destino.descricao}
          </p>
        </div>
      </section>

      {/* Destaques Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
            Por que estudar em {destino.nome}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destino.destaques.map((destaque) => (
              <div
                key={destaque}
                className="p-6 bg-premium-beige rounded-lg text-center"
              >
                <p className="text-lg font-medium">{destaque}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bairros Section */}
      <section className="py-20 bg-premium-beige">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
            Principais Bairros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destino.bairros.map((bairro) => (
              <div
                key={bairro.nome}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">{bairro.nome}</h3>
                <p className="text-gray-600">{bairro.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Pronto para Morar em {destino.nome}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a encontrar a acomodação
            perfeita em {destino.nome}
          </p>
          <Link
            href="/formulario"
            className="inline-flex items-center bg-premium-graphite text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-premium-graphite/90 transition-colors"
          >
            Solicitar Acomodação
          </Link>
        </div>
      </section>
    </div>
  )
} 