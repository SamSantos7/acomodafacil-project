"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AccommodationGallery from "@/components/accommodation-gallery"
import AccommodationMap from "@/components/accommodation-map"
import ReviewCard from "@/components/review-card"
import FAQAccordion from "@/components/faq-accordion"
import ReservationForm from "@/components/reservation-form"

export default function AccommodationDetail({ params }: { params: { slug: string } }) {
  const [accommodation, setAccommodation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de busca de dados
    const fetchAccommodation = () => {
      setLoading(true)

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
          description:
            "Residência moderna no centro de Dublin, próxima às principais escolas de inglês e universidades. Oferece quartos individuais com banheiro privativo, cozinha compartilhada e áreas comuns para estudo e lazer. A localização privilegiada permite fácil acesso a transporte público, restaurantes, cafés e atrações turísticas.",
          longDescription:
            "Nossa Residência Estudantil Central é a escolha perfeita para estudantes que buscam conforto e praticidade no coração de Dublin. Localizada a poucos minutos a pé das principais escolas de inglês e universidades, esta acomodação moderna oferece tudo o que você precisa para uma experiência acadêmica completa.\n\nOs quartos individuais são espaçosos e bem iluminados, todos equipados com cama confortável, escrivaninha para estudos, armário amplo e banheiro privativo. A internet de alta velocidade está disponível em todo o edifício, garantindo que você possa estudar e se comunicar sem problemas.\n\nAs áreas comuns incluem uma cozinha totalmente equipada, sala de estar com TV, lavanderia e sala de estudos. A equipe de segurança está presente 24 horas por dia, garantindo um ambiente seguro para todos os residentes.\n\nA localização central permite que você explore facilmente tudo o que Dublin tem a oferecer, com fácil acesso a transporte público, restaurantes, cafés, lojas e atrações turísticas.",
          images: [
            "/images/student-residence.png",
            "/images/apartment-living.png",
            "/images/shared-apartment.png",
            "/images/homestay.png",
          ],
          rating: 4.8,
          reviews: [
            {
              name: "João Silva",
              date: "Outubro 2023",
              rating: 5,
              comment: "Excelente localização e instalações modernas. Recomendo!",
            },
            {
              name: "Maria Oliveira",
              date: "Setembro 2023",
              rating: 4,
              comment: "Quarto confortável e equipe muito atenciosa.",
            },
            {
              name: "Pedro Santos",
              date: "Agosto 2023",
              rating: 5,
              comment: "Ótima experiência! Ambiente limpo e bem localizado.",
            },
          ],
          faq: [
            {
              question: "Qual é a política de cancelamento?",
              answer:
                "Cancelamentos com 30 dias de antecedência recebem reembolso total. Entre 15-29 dias, reembolso de 50%. Menos de 15 dias não há reembolso.",
            },
            {
              question: "É possível receber visitas?",
              answer:
                "Sim, visitas são permitidas até as 22h. Visitas que pernoitam precisam ser registradas com antecedência.",
            },
            {
              question: "Como funciona a internet?",
              answer: "Oferecemos Wi-Fi de alta velocidade em todo o edifício, incluído no preço do aluguel.",
            },
          ],
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
          longDescription:
            "Este apartamento compartilhado está localizado na vibrante área de Temple Bar, o coração cultural de Dublin. Você compartilhará o espaço com outros estudantes internacionais, criando uma experiência multicultural enriquecedora.\n\nO apartamento oferece quartos individuais mobiliados, com cama confortável, escrivaninha, cadeira e armário. As áreas comuns incluem uma sala de estar espaçosa com TV, cozinha totalmente equipada e banheiros compartilhados mantidos em excelente estado.\n\nA localização privilegiada coloca você a poucos passos de restaurantes, pubs tradicionais irlandeses, galerias de arte, teatros e lojas. As principais escolas de inglês e universidades estão a uma curta caminhada ou facilmente acessíveis por transporte público.\n\nEste é o lugar ideal para estudantes que desejam mergulhar na cultura irlandesa enquanto fazem amizades internacionais.",
          images: ["/images/shared-apartment.png", "/images/apartment-living.png"],
          rating: 4.5,
          reviews: [
            {
              name: "Ana Costa",
              date: "Novembro 2023",
              rating: 5,
              comment: "Localização incrível! Fiz amigos do mundo todo.",
            },
            {
              name: "Carlos Mendes",
              date: "Outubro 2023",
              rating: 4,
              comment: "Apartamento confortável e bem equipado.",
            },
          ],
          faq: [
            {
              question: "Como são divididas as contas?",
              answer:
                "As contas de luz, gás e água são divididas igualmente entre os moradores e cobradas mensalmente.",
            },
            {
              question: "Há regras de convivência?",
              answer: "Sim, pedimos respeito ao silêncio após as 23h e limpeza das áreas comuns após o uso.",
            },
          ],
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
          longDescription:
            "Viver com uma família irlandesa é uma das melhores maneiras de experimentar a cultura local e praticar inglês diariamente. Esta família acolhedora em Galway tem anos de experiência recebendo estudantes internacionais e oferece um ambiente caloroso e acolhedor.\n\nVocê terá um quarto privativo confortável, com cama, escrivaninha para estudos e armário. O café da manhã e o jantar estão incluídos, permitindo que você experimente a culinária irlandesa caseira. A família também oferece serviço de lavanderia semanal e limpeza do quarto.\n\nA casa está localizada no bairro residencial de Salthill, a uma curta distância da praia e a apenas 20 minutos de caminhada do centro de Galway. O transporte público para o centro da cidade e escolas está facilmente disponível.\n\nEsta opção é ideal para estudantes que desejam uma experiência cultural autêntica e um ambiente familiar durante seus estudos.",
          images: ["/images/homestay.png", "/images/shared-apartment.png"],
          rating: 4.9,
          reviews: [
            {
              name: "Juliana Alves",
              date: "Dezembro 2023",
              rating: 5,
              comment: "A família é maravilhosa! Me senti em casa desde o primeiro dia.",
            },
            {
              name: "Rafael Nunes",
              date: "Novembro 2023",
              rating: 5,
              comment: "Excelente experiência cultural e ótimas refeições!",
            },
            {
              name: "Fernanda Lima",
              date: "Outubro 2023",
              rating: 4,
              comment: "Ambiente acolhedor e ótimo para praticar inglês.",
            },
          ],
          faq: [
            {
              question: "Posso convidar amigos para visitar?",
              answer: "Visitas são permitidas até as 21h, mediante aviso prévio à família.",
            },
            {
              question: "Como funciona o café da manhã e jantar?",
              answer:
                "O café da manhã é servido entre 7h e 9h, e o jantar às 19h. A família acomoda preferências alimentares com aviso prévio.",
            },
            {
              question: "Há horário para chegar em casa?",
              answer:
                "Para menores de 18 anos, o horário de chegada é até 22h. Para adultos, pedimos apenas que se evite barulho após as 23h.",
            },
          ],
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
          longDescription:
            "Este estúdio individual oferece privacidade e independência no coração de Cork. Totalmente mobiliado e equipado, é perfeito para estudantes que preferem seu próprio espaço.\n\nO estúdio inclui uma área de dormir confortável, cozinha compacta totalmente equipada, área de estar e banheiro privativo. A internet de alta velocidade está incluída, permitindo que você estude e se comunique sem problemas.\n\nLocalizado na movimentada Washington Street, você estará a poucos passos de restaurantes, cafés, lojas e vida noturna. As principais escolas de inglês e a University College Cork estão a uma curta distância a pé.\n\nEsta opção é ideal para estudantes independentes que valorizam privacidade e conveniência.",
          images: ["/images/apartment-living.png", "/images/shared-apartment.png"],
          rating: 4.6,
          reviews: [
            {
              name: "Bruno Martins",
              date: "Setembro 2023",
              rating: 5,
              comment: "Estúdio perfeito! Privacidade e localização excelentes.",
            },
            { name: "Camila Rocha", date: "Agosto 2023", rating: 4, comment: "Muito bem equipado e confortável." },
          ],
          faq: [
            {
              question: "Como funciona o pagamento das contas?",
              answer: "As contas de luz, água e gás são pagas separadamente, com leituras mensais dos medidores.",
            },
            {
              question: "Há serviço de limpeza disponível?",
              answer: "Oferecemos serviço de limpeza opcional por um custo adicional de €40 por semana.",
            },
          ],
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
          description:
            "Residência dentro do campus da Universidade de Limerick, com todas as facilidades universitárias.",
          longDescription:
            "A Residência Universitária de Limerick oferece uma experiência autêntica de campus, localizada dentro da Universidade de Limerick. Esta opção é ideal para estudantes que desejam imergir completamente na vida universitária irlandesa.\n\nA residência oferece quartos individuais confortáveis com áreas de estudo, organizados em apartamentos compartilhados com cozinha e sala de estar comuns. Os banheiros são compartilhados entre 2-3 estudantes, mantidos em excelente estado de limpeza.\n\nComo residente, você terá acesso a todas as instalações do campus, incluindo biblioteca, centro esportivo com piscina e academia, restaurantes, cafés e áreas verdes extensas. A segurança 24 horas garante um ambiente seguro para todos os estudantes.\n\nO campus está bem conectado ao centro de Limerick por transporte público regular, permitindo fácil acesso à cidade para explorar a cultura local.",
          images: ["/images/student-residence.png", "/images/shared-apartment.png"],
          rating: 4.7,
          reviews: [
            {
              name: "Lucas Ferreira",
              date: "Novembro 2023",
              rating: 5,
              comment: "Excelentes instalações e ambiente universitário incrível!",
            },
            {
              name: "Mariana Costa",
              date: "Outubro 2023",
              rating: 4,
              comment: "Quarto confortável e ótimas áreas comuns.",
            },
            {
              name: "Thiago Almeida",
              date: "Setembro 2023",
              rating: 5,
              comment: "A academia e as instalações esportivas são fantásticas!",
            },
          ],
          faq: [
            {
              question: "Posso ficar durante as férias universitárias?",
              answer:
                "Sim, oferecemos contratos que cobrem os períodos de férias para estudantes que desejam permanecer.",
            },
            {
              question: "Como funciona o acesso à internet?",
              answer:
                "A internet de alta velocidade está disponível em toda a residência, com acesso via login pessoal fornecido na chegada.",
            },
            {
              question: "Há opções de refeição no campus?",
              answer:
                "Sim, o campus possui vários restaurantes, cafés e uma cantina principal com preços especiais para estudantes.",
            },
          ],
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
          longDescription:
            "Este apartamento compartilhado está localizado em Eyre Square, o coração de Galway, oferecendo acesso imediato a tudo o que esta cidade vibrante tem a oferecer. Você compartilhará o espaço com outros estudantes internacionais, criando uma experiência multicultural enriquecedora.\n\nO apartamento oferece quartos individuais mobiliados, com cama confortável, escrivaninha e armário. As áreas comuns incluem uma sala de estar aconchegante, cozinha totalmente equipada e banheiros compartilhados mantidos em excelente estado. A máquina de lavar está disponível para todos os residentes.\n\nA localização privilegiada coloca você a poucos passos de restaurantes, pubs tradicionais irlandeses, lojas e atrações culturais. As principais escolas de inglês estão a uma curta caminhada.\n\nEsta é a opção perfeita para estudantes que desejam estar no centro da ação em Galway, enquanto compartilham a experiência com outros estudantes internacionais.",
          images: ["/images/shared-apartment.png", "/images/apartment-living.png"],
          rating: 4.4,
          reviews: [
            {
              name: "Daniela Sousa",
              date: "Dezembro 2023",
              rating: 4,
              comment: "Localização perfeita! Perto de tudo em Galway.",
            },
            {
              name: "Gustavo Lima",
              date: "Novembro 2023",
              rating: 5,
              comment: "Apartamento confortável e colegas de casa incríveis!",
            },
          ],
          faq: [
            {
              question: "Como são divididas as contas?",
              answer: "As contas de luz e gás são divididas igualmente entre os moradores e cobradas mensalmente.",
            },
            {
              question: "Há regras sobre visitas?",
              answer:
                "Visitas são permitidas, mas pedimos que pernoites sejam comunicados aos outros moradores com antecedência.",
            },
          ],
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
          longDescription:
            "Viver com esta família irlandesa tradicional oferece uma imersão completa na cultura local e uma oportunidade inigualável de praticar inglês diariamente. Localizada em uma área residencial tranquila de Dublin, a casa oferece um refúgio pacífico após um dia de estudos.\n\nVocê terá um quarto privativo confortável, com todas as comodidades necessárias para estudar e relaxar. Três refeições diárias estão incluídas, permitindo que você experimente a autêntica culinária irlandesa caseira. A família também oferece serviço de lavanderia e limpeza regular do quarto.\n\nA casa está a apenas 20 minutos do centro de Dublin por transporte público, com paradas de ônibus próximas. A família tem anos de experiência recebendo estudantes internacionais e está sempre disposta a ajudar com dicas sobre a cidade e a cultura irlandesa.\n\nEsta opção é ideal para estudantes que desejam uma experiência cultural autêntica e um ambiente familiar acolhedor durante seus estudos em Dublin.",
          images: ["/images/homestay.png", "/images/shared-apartment.png"],
          rating: 4.9,
          reviews: [
            {
              name: "Isabela Santos",
              date: "Dezembro 2023",
              rating: 5,
              comment: "A família é incrível! Me senti parte dela desde o primeiro dia.",
            },
            {
              name: "Ricardo Oliveira",
              date: "Novembro 2023",
              rating: 5,
              comment: "Comida deliciosa e ambiente muito acolhedor.",
            },
            {
              name: "Amanda Pereira",
              date: "Outubro 2023",
              rating: 4,
              comment: "Ótima experiência para praticar inglês e conhecer a cultura irlandesa.",
            },
          ],
          faq: [
            {
              question: "A família fala português?",
              answer: "Não, a família fala apenas inglês, o que proporciona uma imersão completa no idioma.",
            },
            {
              question: "Como são as refeições?",
              answer:
                "O café da manhã é continental, o almoço geralmente é leve (sanduíches ou saladas) e o jantar é uma refeição completa tradicional irlandesa.",
            },
            {
              question: "Posso usar a cozinha para preparar minhas próprias refeições?",
              answer:
                "A família prefere preparar as refeições, mas você pode usar a cozinha para lanches leves mediante acordo prévio.",
            },
          ],
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
          longDescription:
            "Este estúdio moderno recém-reformado oferece um espaço contemporâneo e confortável no coração de Limerick. Ideal para estudantes que valorizam independência e privacidade, o estúdio é totalmente mobiliado com móveis de alta qualidade.\n\nO espaço inclui uma área de dormir confortável, área de estar com Smart TV, cozinha totalmente equipada e banheiro privativo. A internet de alta velocidade e TV a cabo estão incluídas no aluguel.\n\nLocalizado na principal rua de Limerick, O'Connell Street, você estará a poucos passos de restaurantes, cafés, lojas e atrações culturais. As principais escolas de inglês e a Universidade de Limerick são facilmente acessíveis por transporte público.\n\nEsta opção é perfeita para estudantes independentes que desejam um espaço próprio com todo o conforto e conveniência no centro da cidade.",
          images: ["/images/apartment-living.png", "/images/shared-apartment.png"],
          rating: 4.8,
          reviews: [
            {
              name: "Felipe Cardoso",
              date: "Novembro 2023",
              rating: 5,
              comment: "Estúdio impecável! Moderno, limpo e super bem localizado.",
            },
            {
              name: "Beatriz Gomes",
              date: "Outubro 2023",
              rating: 4,
              comment: "Adorei a privacidade e as comodidades do estúdio.",
            },
          ],
          faq: [
            {
              question: "Como funciona o pagamento das contas?",
              answer: "As contas de luz e gás são pagas separadamente, com leituras mensais dos medidores.",
            },
            {
              question: "Há estacionamento disponível?",
              answer: "Não há estacionamento privativo, mas existem opções de estacionamento público nas proximidades.",
            },
          ],
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
          longDescription:
            "A Residência Premium de Cork oferece acomodação de alto padrão para estudantes exigentes, localizada a poucos minutos da University College Cork. Esta opção combina conforto, modernidade e conveniência para uma experiência estudantil superior.\n\nA residência oferece suítes privativas com banheiro próprio, organizadas em apartamentos compartilhados com cozinha moderna e sala de estar espaçosa. Cada quarto é equipado com cama confortável, ampla área de estudo e armários espaçosos.\n\nAs instalações comuns incluem academia bem equipada, salas de estudo silenciosas, lavanderia e áreas de convivência. A segurança 24 horas e o sistema de acesso por cartão garantem um ambiente seguro para todos os residentes.\n\nA localização privilegiada coloca você a uma curta caminhada da universidade e do centro de Cork, com fácil acesso a restaurantes, cafés, lojas e vida noturna.\n\nEsta opção é ideal para estudantes que buscam uma experiência premium durante seus estudos em Cork.",
          images: ["/images/student-residence.png", "/images/apartment-living.png"],
          rating: 4.7,
          reviews: [
            {
              name: "Gabriel Moreira",
              date: "Dezembro 2023",
              rating: 5,
              comment: "Instalações de primeira qualidade! Vale cada centavo.",
            },
            {
              name: "Carolina Duarte",
              date: "Novembro 2023",
              rating: 4,
              comment: "Quarto espaçoso e áreas comuns excelentes.",
            },
            {
              name: "Vinícius Campos",
              date: "Outubro 2023",
              rating: 5,
              comment: "A localização próxima à universidade é perfeita!",
            },
          ],
          faq: [
            {
              question: "Há limite de idade para residir?",
              answer:
                "A residência é destinada a estudantes universitários de todas as idades, mas a maioria dos residentes tem entre 18 e 30 anos.",
            },
            {
              question: "Como funciona o acesso de visitantes?",
              answer:
                "Visitantes são permitidos até as 23h e devem ser registrados na recepção. Pernoites ocasionais são permitidos mediante aviso prévio.",
            },
            {
              question: "Há estacionamento disponível?",
              answer: "Sim, oferecemos estacionamento limitado por uma taxa adicional de €30 por semana.",
            },
          ],
          slug: "residencia-premium-cork",
        },
      ]

      // Encontrar a acomodação pelo slug
      const found = accommodations.find((acc) => acc.slug === params.slug)

      setTimeout(() => {
        setAccommodation(found || null)
        setLoading(false)
      }, 1000)
    }

    fetchAccommodation()
  }, [params.slug])

  if (loading) {
    return (
      <div className="container px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-graphite-300">Carregando informações da acomodação...</p>
        </div>
      </div>
    )
  }

  if (!accommodation) {
    return (
      <div className="container px-4 py-16">
        <div className="text-center py-16 bg-sand-50 rounded-lg">
          <X className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-graphite-400">Acomodação não encontrada</h2>
          <p className="mt-2 text-graphite-300 mb-8">
            A acomodação que você está procurando não está disponível ou não existe.
          </p>
          <Button asChild>
            <Link href="/acomodacoes">Voltar para lista de acomodações</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb e Voltar */}
      <div className="bg-sand-50 py-4 border-b border-gray-200">
        <div className="container px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-graphite-300 flex items-center gap-2">
              <Link href="/" className="hover:text-teal-500">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/acomodacoes" className="hover:text-teal-500">
                Acomodações
              </Link>{" "}
              / <span className="text-graphite-400">{accommodation.name}</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/acomodacoes" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar para acomodações</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - 2/3 */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-graphite-400 mb-4">{accommodation.name}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-teal-100 text-teal-600 hover:bg-teal-100">{accommodation.type}</Badge>
              <div className="flex items-center gap-1 text-sm text-graphite-300">
                <MapPin className="h-4 w-4" />
                <span>{accommodation.address}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gold-500">
                <Star className="h-4 w-4 fill-current" />
                <span>{accommodation.rating}</span>
                <span className="text-graphite-300">({accommodation.reviews.length} avaliações)</span>
              </div>
            </div>

            {/* Galeria de Fotos */}
            <AccommodationGallery images={accommodation.images} title={accommodation.name} />

            {/* Abas de Conteúdo */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="w-full justify-start overflow-x-auto mb-6">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="location">Localização</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Sobre esta acomodação</h3>
                  <p className="whitespace-pre-line text-graphite-300">{accommodation.longDescription}</p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Características</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {accommodation.features.map((feature, index) => {
                        const getFeatureIcon = (feature: string) => {
                          if (feature.toLowerCase().includes('quarto')) return <Bed className="h-5 w-5" />
                          if (feature.toLowerCase().includes('banheiro')) return <Bath className="h-5 w-5" />
                          if (feature.toLowerCase().includes('cozinha')) return <Utensils className="h-5 w-5" />
                          if (feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('internet')) return <Wifi className="h-5 w-5" />
                          return <CheckCircle className="h-5 w-5" />
                        }
                        return (
                          <div key={index} className="flex items-start gap-2">
                            <div className="text-teal-500 flex-shrink-0 mt-0.5">
                              {getFeatureIcon(feature)}
                            </div>
                            <span>{feature}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">O que está incluso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {accommodation.included.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">O que não está incluso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {accommodation.notIncluded.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">Localização</h3>
                <AccommodationMap address={accommodation.address} city={accommodation.location} />
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Endereço</h4>
                  <p className="text-graphite-300">
                    {accommodation.address}, {accommodation.location}, Ireland
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">Avaliações</h3>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${i < Math.floor(accommodation.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{accommodation.rating}</span>
                    <span className="text-graphite-300">({accommodation.reviews.length} avaliações)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {accommodation.reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      name={review.name}
                      date={review.date}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>
                <FAQAccordion items={accommodation.faq} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Coluna Lateral - 1/3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-graphite-400">Preço</h3>
                  <span className="text-2xl font-bold text-teal-500">€{accommodation.price}</span>
                </div>
                <p className="text-sm text-graphite-300 mb-6">por semana, por pessoa</p>

                <div className="space-y-3 mb-6">
                  {accommodation.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white mb-3">Solicitar Reserva</Button>

                <p className="text-xs text-center text-graphite-300">Sem compromisso - Cancele a qualquer momento</p>
              </div>

              <ReservationForm accommodationName={accommodation.name} weeklyPrice={accommodation.price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
