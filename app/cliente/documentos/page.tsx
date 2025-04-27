
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { FileText, Upload, FileDown, Trash2 } from "lucide-react"

interface Documento {
  id: string
  nome: string
  tipo: string
  data_upload: string
  url: string
}

export default function DocumentosCliente() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    carregarDocumentos()
  }, [])

  const carregarDocumentos = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('documentos')
        .select('*')
        .eq('user_id', user.id)
      
      if (data) setDocumentos(data)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      setUploading(true)
      const file = e.target.files[0]
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('documentos')
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase
        .from('documentos')
        .insert({
          user_id: user.id,
          nome: file.name,
          tipo: file.type,
          url: publicUrl
        })

      if (dbError) throw dbError

      alert('Documento enviado com sucesso!')
      carregarDocumentos()
    } catch (error) {
      alert('Erro ao enviar documento')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id)

      if (error) throw error

      alert('Documento excluído com sucesso!')
      carregarDocumentos()
    } catch (error) {
      alert('Erro ao excluir documento')
      console.error(error)
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite-400">Meus Documentos</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload de Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
              <Button
                asChild
                variant="outline"
                className="w-full"
                disabled={uploading}
              >
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Enviando..." : "Escolher Arquivo"}
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos Enviados</CardTitle>
          </CardHeader>
          <CardContent>
            {documentos.length === 0 ? (
              <p className="text-center text-graphite-300 py-8">
                Nenhum documento enviado ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {documentos.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-graphite-300" />
                      <div>
                        <p className="font-medium">{doc.nome}</p>
                        <p className="text-sm text-graphite-300">
                          Enviado em {new Date(doc.data_upload).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <FileDown className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
