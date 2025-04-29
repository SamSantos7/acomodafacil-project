
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileDown, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function AdminDocumentosPage() {
  const [documentos, setDocumentos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const { data: docs, error: docsError } = await supabase
        .from('documentos')
        .select(`
          *,
          usuarios (
            id,
            nome,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (docsError) throw docsError
      setDocumentos(docs || [])

      const { data: users, error: usersError } = await supabase
        .from('usuarios')
        .select('id, nome, email')

      if (usersError) throw usersError
      setUsuarios(users || [])
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const uploadDocumento = async (event, userId) => {
    try {
      setLoading(true)
      const file = event.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${userId}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { error: dbError } = await supabase
        .from('documentos')
        .insert({
          user_id: userId,
          nome: file.name,
          tipo: file.type,
          caminho: filePath
        })

      if (dbError) throw dbError

      toast({
        title: "Sucesso!",
        description: "Documento enviado com sucesso"
      })

      carregarDados()
    } catch (error) {
      toast({
        title: "Erro ao enviar documento",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const baixarDocumento = async (caminho, nome) => {
    try {
      const { data, error } = await supabase.storage
        .from('documentos')
        .download(caminho)

      if (error) throw error

      const blob = new Blob([data], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = nome
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        title: "Erro ao baixar documento",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">
          Documentos dos Clientes
        </h1>
      </div>

      <div className="grid gap-8">
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {usuario.nome || usuario.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <Input
                  type="file"
                  onChange={(e) => uploadDocumento(e, usuario.id)}
                  disabled={loading}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button disabled={loading}>
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
              </div>

              <div className="grid gap-2">
                {documentos
                  .filter((doc) => doc.user_id === usuario.id)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div>
                        <p className="font-medium">{doc.nome}</p>
                        <p className="text-sm text-graphite-300">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => baixarDocumento(doc.caminho, doc.nome)}
                      >
                        <FileDown className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
