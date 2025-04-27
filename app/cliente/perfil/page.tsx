"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { UserCircle, Mail, Phone, MapPin, Save } from "lucide-react"

export default function PerfilCliente() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  })

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setProfile({
          nome: user.user_metadata?.nome || "",
          telefone: user.user_metadata?.telefone || "",
          endereco: user.user_metadata?.endereco || "",
        })
      }
    }

    getProfile()
  }, [])

  const handleUpdate = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: profile
      })

      if (error) throw error
      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      alert("Erro ao atualizar perfil")
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">Meu Perfil</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <div className="flex gap-2">
              <UserCircle className="w-5 h-5 text-graphite-300" />
              <Input
                id="nome"
                value={profile.nome}
                onChange={(e) => setProfile({ ...profile, nome: e.target.value })}
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-graphite-300" />
              <Input
                id="email"
                value={user?.email}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <div className="flex gap-2">
              <Phone className="w-5 h-5 text-graphite-300" />
              <Input
                id="telefone"
                value={profile.telefone}
                onChange={(e) => setProfile({ ...profile, telefone: e.target.value })}
                placeholder="Seu telefone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <div className="flex gap-2">
              <MapPin className="w-5 h-5 text-graphite-300" />
              <Input
                id="endereco"
                value={profile.endereco}
                onChange={(e) => setProfile({ ...profile, endereco: e.target.value })}
                placeholder="Seu endereço"
              />
            </div>
          </div>

          <Button onClick={handleUpdate} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}