
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { Bell, X } from "lucide-react"

interface Notificacao {
  id: string
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}

export default function NotificacoesCliente() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])

  useEffect(() => {
    carregarNotificacoes()
  }, [])

  const carregarNotificacoes = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('notificacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('data', { ascending: false })
      
      if (data) setNotificacoes(data)
    }
  }

  const marcarComoLida = async (id: string) => {
    const { error } = await supabase
      .from('notificacoes')
      .update({ lida: true })
      .eq('id', id)

    if (!error) {
      setNotificacoes(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, lida: true } : notif
        )
      )
    }
  }

  const excluirNotificacao = async (id: string) => {
    const { error } = await supabase
      .from('notificacoes')
      .delete()
      .eq('id', id)

    if (!error) {
      setNotificacoes(prev => prev.filter(notif => notif.id !== id))
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">Notificações</h1>
      </div>

      <div className="grid gap-4">
        {notificacoes.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-graphite-300">
                Você não possui nenhuma notificação.
              </p>
            </CardContent>
          </Card>
        ) : (
          notificacoes.map((notificacao) => (
            <Card key={notificacao.id} className={!notificacao.lida ? "border-blue-500" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <CardTitle className="text-lg">{notificacao.titulo}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => excluirNotificacao(notificacao.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{notificacao.mensagem}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(notificacao.data).toLocaleDateString('pt-BR')}
                  </span>
                  {!notificacao.lida && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => marcarComoLida(notificacao.id)}
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
