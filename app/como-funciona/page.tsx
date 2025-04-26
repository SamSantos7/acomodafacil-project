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
    <div className="container py-12">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12">
        Como Funciona
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 flex-shrink-0 rounded-full bg-premium-beige flex items-center justify-center">
                <span className="text-4xl font-playfair font-bold text-premium-gold">
                  {index + 1}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-premium-beige rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Pronto para Encontrar sua Acomodação?
          </h2>
          <p className="text-center mb-6">
            Nossa equipe está pronta para ajudar você a encontrar o lugar perfeito para sua estadia
          </p>
          <div className="flex justify-center">
            <a
              href="/formulario"
              className="inline-flex items-center bg-premium-graphite text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-premium-graphite/90 transition-colors"
            >
              Solicitar Acomodação
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    title: 'Preencha o Formulário',
    description:
      'Comece nos contando sobre suas necessidades de acomodação. Quanto mais detalhes você fornecer, melhor poderemos ajudar a encontrar o lugar ideal para você.',
  },
  {
    title: 'Receba Opções Personalizadas',
    description:
      'Nossa equipe especializada analisará seu perfil e selecionará as melhores opções de acomodação que atendam às suas necessidades e preferências.',
  },
  {
    title: 'Escolha sua Acomodação',
    description:
      'Apresentaremos a você opções detalhadas de acomodação, com fotos, descrições e todas as informações necessárias para fazer sua escolha.',
  },
  {
    title: 'Confirmação e Suporte',
    description:
      'Após sua escolha, cuidamos de todo o processo de reserva e documentação. Nosso suporte estará disponível para ajudar em todas as etapas.',
  },
]
