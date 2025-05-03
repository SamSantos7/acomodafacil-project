
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function TermosUso() {
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col">
      <section className="relative bg-sand-50 text-graphite-400 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <Image
            src="/images/contact-hero.png"
            alt="Termos de Uso"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Termos de Uso</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container px-4 max-w-4xl">
          <div className="prose prose-lg">
            <p>Ao utilizar os serviços da AcomodaFácil, você concorda com estes termos. Por favor, leia-os atentamente.</p>

            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar este site, você aceita e concorda em cumprir estes Termos e Condições de Uso.</p>

            <h2>2. Serviços</h2>
            <p>A AcomodaFácil oferece serviços de intermediação para acomodação estudantil, conectando estudantes a opções de moradia adequadas.</p>

            <h2>3. Responsabilidades do Usuário</h2>
            <ul>
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Manter suas informações de contato atualizadas</li>
              <li>Não usar o serviço para fins ilegais</li>
              <li>Respeitar as políticas de cada acomodação</li>
            </ul>

            <h2>4. Limitação de Responsabilidade</h2>
            <p>A AcomodaFácil atua como intermediadora e não se responsabiliza por problemas diretos entre inquilinos e proprietários.</p>

            <h2>5. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento, notificando os usuários sobre mudanças significativas.</p>

            <h2>6. Contato</h2>
            <p>Para dúvidas sobre estes termos, entre em contato: booking@acomodafacil.com.br</p>
          </div>
        </div>
      </section>
    </div>
  )
}
