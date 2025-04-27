
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { CalendarDays, MapPin, Home, Clock } from "lucide-react"

interface Reserva {
  id: string
  acomodacao: string
  cidade: string
  tipo: string
  data_inicio: string
  data_fim: string
  status: string
  valor: number
}

export default function ReservasCliente() {
  const [reservas, setReservas] = useState<Reserva[]>([])

  useEffect(() => {
    carregarReservas()
  }, [])

  const carregarReservas = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('reservas')
        .select('*')
        .eq('user_id', user.id)
        .order('data_inicio', { ascending: false })
      
      if (data) setReservas(data)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: { class: "bg-yellow-500", text: "Pendente" },
      confirmada: { class: "bg-green-500", text: "Confirmada" },
      cancelada: { class: "bg-red-500", text: "Cancelada" },
      concluida: { class: "bg-blue-500", text: "Concluída" }
    }
    
    const config = statusConfig[status.toLowerCase()] || statusConfig.pendente
    return (
      <Badge className={`${config.class} text-white`}>
        {config.text}
      </Badge>
    )
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">Minhas Reservas</h1>
      </div>

      <div className="grid gap-6">
        {reservas.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-graphite-300">
                Você ainda não possui nenhuma reserva.
              </p>
            </CardContent>
          </Card>
        ) : (
          reservas.map((reserva) => (
            <Card key={reserva.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{reserva.acomodacao}</CardTitle>
                  {getStatusBadge(reserva.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-graphite-300" />
                    <span>{reserva.cidade}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-graphite-300" />
                    <span>{reserva.tipo}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-graphite-300" />
                    <span>
                      {formatarData(reserva.data_inicio)} até {formatarData(reserva.data_fim)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-graphite-300" />
                    <span>Valor: {formatarValor(reserva.valor)}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full">
                      Ver Detalhes
                    </Button>
                    {reserva.status === 'pendente' && (
                      <Button variant="destructive" className="w-full">
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
