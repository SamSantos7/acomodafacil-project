
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileDown, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    carregarDocumentos()
  }, [])

  const carregarDocumentos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocumentos(data || [])
    } catch (error) {
      toast({
        title: "Erro ao carregar documentos",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const uploadDocumento = async (event) => {
    try {
      setLoading(true)
      const file = event.target.files[0]
      if (!file) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { error: dbError } = await supabase
        .from('documentos')
        .insert({
          user_id: user.id,
          nome: file.name,
          tipo: file.type,
          caminho: filePath
        })

      if (dbError) throw dbError

      toast({
        title: "Sucesso!",
        description: "Documento enviado com sucesso"
      })

      carregarDocumentos()
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

  const excluirDocumento = async (id, caminho) => {
    try {
      setLoading(true)
      const { error: storageError } = await supabase.storage
        .from('documentos')
        .remove([caminho])

      if (storageError) throw storageError

      const { error: dbError } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError

      toast({
        title: "Sucesso!",
        description: "Documento excluído com sucesso"
      })

      carregarDocumentos()
    } catch (error) {
      toast({
        title: "Erro ao excluir documento",
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
        <h1 className="text-3xl font-bold text-graphite-400">Meus Documentos</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload de Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              onChange={uploadDocumento}
              disabled={loading}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <Button disabled={loading}>
              <Upload className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {documentos.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-graphite-300">
                Você ainda não possui documentos.
              </p>
            </CardContent>
          </Card>
        ) : (
          documentos.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileDown className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.nome}</p>
                    <p className="text-sm text-graphite-300">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="hover:bg-blue-50 hover:text-blue-500 transition-colors"
                    onClick={() => baixarDocumento(doc.caminho, doc.nome)}
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-red-50 hover:text-red-500 transition-colors"
                    onClick={() => excluirDocumento(doc.id, doc.caminho)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
