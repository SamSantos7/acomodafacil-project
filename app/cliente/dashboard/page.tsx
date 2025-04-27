
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Calendar, Upload, FileDown, Bell, UserCircle } from "lucide-react"

export default function ClienteDashboard() {
  const [user, setUser] = useState<any>(null)
  const [reservas, setReservas] = useState([])
  const [diasRestantes, setDiasRestantes] = useState(0)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      // Buscar reservas do usuário
      if (user) {
        const { data } = await supabase
          .from('reservas')
          .select('*')
          .eq('user_id', user.id)
        
        if (data) setReservas(data)
      }
    }

    getUser()
  }, [])

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">
          Bem-vindo de volta, {user?.user_metadata?.nome || 'Cliente'}!
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dias para a Viagem</CardTitle>
            <Calendar className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{diasRestantes} dias</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status da Reserva</CardTitle>
            <Bell className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Aguardando</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            {reservas.length === 0 ? (
              <p className="text-center text-graphite-300 py-8">
                Você ainda não possui reservas.
              </p>
            ) : (
              <div className="space-y-4">
                {/* Lista de reservas aqui */}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Upload de Documentos</h3>
                  <p className="text-sm text-graphite-300">
                    Envie documentos relacionados à sua acomodação
                  </p>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Documentos Disponíveis</h3>
                  <p className="text-sm text-graphite-300">
                    Documentos compartilhados pela administração
                  </p>
                </div>
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
