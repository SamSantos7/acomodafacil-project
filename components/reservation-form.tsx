"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Info } from "lucide-react"

interface ReservationFormProps {
  accommodationName: string
  weeklyPrice: number
}

export default function ReservationForm({ accommodationName, weeklyPrice }: ReservationFormProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitResult({
      success: true,
      message: "Sua solicitação de reserva foi enviada com sucesso! Entraremos em contato em breve.",
    })

    setIsSubmitting(false)
  }

  // Calcular número de semanas
  const calculateWeeks = () => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.ceil(diffDays / 7)
  }

  const weeks = calculateWeeks()
  const totalPrice = weeks * weeklyPrice

  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Solicitar Reserva</h3>

      {submitResult ? (
        <div
          className={`p-4 rounded-lg mb-6 ${
            submitResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <p>{submitResult.message}</p>
          {submitResult.success && (
            <button className="mt-4 text-sm font-medium underline" onClick={() => setSubmitResult(null)}>
              Fazer nova solicitação
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              <h4 className="font-medium">Período da Estadia</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm mb-1">
                  Data de Chegada
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm mb-1">
                  Data de Saída
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {weeks > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Duração:</span> {weeks} semana{weeks !== 1 ? "s" : ""}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Preço total estimado:</span> €{totalPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Info className="h-5 w-5 mr-2 text-green-600" />
              <h4 className="font-medium">Suas Informações</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-1">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : "Solicitar Reserva"}
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Ao solicitar uma reserva, nossa equipe entrará em contato para confirmar disponibilidade e finalizar o
            processo.
          </p>
        </form>
      )}
    </div>
  )
}
