
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    nome_completo: "",
    data_nascimento: "",
    email: "",
    instituicao_ensino: "",
    data_viagem: "",
    cidade: "",
    estado: "",
    numero_contato: ""
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (data) setProfile(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile
        })

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: "Não foi possível atualizar seu perfil."
        })
      } else {
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram salvas com sucesso."
        })
      }
    }
    setLoading(false)
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome_completo">Nome Completo</Label>
              <Input
                id="nome_completo"
                value={profile.nome_completo}
                onChange={(e) => setProfile({...profile, nome_completo: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                value={profile.data_nascimento}
                onChange={(e) => setProfile({...profile, data_nascimento: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instituicao_ensino">Instituição de Ensino</Label>
              <Input
                id="instituicao_ensino"
                value={profile.instituicao_ensino}
                onChange={(e) => setProfile({...profile, instituicao_ensino: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_viagem">Data da Viagem</Label>
              <Input
                id="data_viagem"
                type="date"
                value={profile.data_viagem}
                onChange={(e) => setProfile({...profile, data_viagem: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={profile.cidade}
                onChange={(e) => setProfile({...profile, cidade: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                value={profile.estado}
                onChange={(e) => setProfile({...profile, estado: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero_contato">Número de Contato</Label>
              <Input
                id="numero_contato"
                value={profile.numero_contato}
                onChange={(e) => setProfile({...profile, numero_contato: e.target.value})}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
