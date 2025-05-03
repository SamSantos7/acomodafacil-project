
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function PoliticaPrivacidade() {
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
            alt="Política de Privacidade"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Política de Privacidade</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container px-4 max-w-4xl">
          <div className="prose prose-lg">
            <p>A sua privacidade é importante para nós. É política da AcomodaFácil respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar em nosso site.</p>
            
            <h2>1. Informações que coletamos</h2>
            <p>Coletamos informações pessoais que você nos fornece diretamente, incluindo nome, e-mail, telefone e outras informações necessárias para o processo de acomodação.</p>

            <h2>2. Como usamos suas informações</h2>
            <p>Utilizamos as informações coletadas para:</p>
            <ul>
              <li>Processar suas solicitações de acomodação</li>
              <li>Enviar atualizações sobre seu processo</li>
              <li>Melhorar nossos serviços</li>
              <li>Entrar em contato quando necessário</li>
            </ul>

            <h2>3. Proteção de dados</h2>
            <p>Mantemos suas informações seguras usando protocolos e tecnologias atualizadas de proteção de dados.</p>

            <h2>4. Seus direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>

            <h2>5. Contato</h2>
            <p>Para questões sobre esta política, entre em contato pelo e-mail: booking@acomodafacil.com.br</p>
          </div>
        </div>
      </section>
    </div>
  )
}
