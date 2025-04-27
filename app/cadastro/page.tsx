
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"; // Verifique se este caminho está correto.

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    instituicaoEnsino: "",
    dataViagem: "",
    cidade: "",
    estado: "",
    numeroContato: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
      options: {
        data: {
          nome: formData.nome,
          dataNascimento: formData.dataNascimento,
          instituicaoEnsino: formData.instituicaoEnsino,
          dataViagem: formData.dataViagem,
          cidade: formData.cidade,
          estado: formData.estado,
          numeroContato: formData.numeroContato,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess("Cadastro realizado com sucesso! Verifique seu e-mail.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Cadastrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome">Nome Completo</label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <Input
                id="senha"
                type="password"
                value={formData.senha}
                onChange={handleInputChange}
                required
                minLength={8}
                pattern="(?=.*\d).{8,}"
                title="Mínimo de 8 caracteres com pelo menos um número"
              />
            </div>
            <div>
              <label htmlFor="instituicaoEnsino">Instituição de Ensino</label>
              <Input
                id="instituicaoEnsino"
                type="text"
                value={formData.instituicaoEnsino}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dataViagem">Data da Viagem</label>
              <Input
                id="dataViagem"
                type="date"
                value={formData.dataViagem}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cidade">Cidade</label>
              <Input
                id="cidade"
                type="text"
                value={formData.cidade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="estado">Estado</label>
              <Input
                id="estado"
                type="text"
                value={formData.estado}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="numeroContato">Número de Contato (WhatsApp)</label>
              <Input
                id="numeroContato"
                type="text"
                value={formData.numeroContato}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
