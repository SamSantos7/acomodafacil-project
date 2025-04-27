
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Upload, Download, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DocumentosPage() {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setDocuments(data)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return

    const file = e.target.files[0]
    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: file.name,
          path: filePath,
          type: file.type
        })

      if (dbError) throw dbError

      toast({
        title: "Upload realizado",
        description: "Documento enviado com sucesso!"
      })

      loadDocuments()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: "Não foi possível enviar o documento."
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (path: string, name: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(path)

      if (error) throw error

      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no download",
        description: "Não foi possível baixar o documento."
      })
    }
  }

  const handleDelete = async (id: string, path: string) => {
    try {
      await supabase.storage.from('documents').remove([path])
      await supabase.from('documents').delete().eq('id', id)
      
      toast({
        title: "Documento excluído",
        description: "O documento foi removido com sucesso."
      })
      
      loadDocuments()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível remover o documento."
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Documentos</h1>
          <div>
            <Input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={handleUpload}
              accept=".pdf,.jpg,.png,.doc,.docx"
            />
            <Button 
              onClick={() => document.getElementById('fileUpload')?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Enviando..." : "Enviar Documento"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(doc.path, doc.name)}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(doc.id, doc.path)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}

          {documents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>Você ainda não possui documentos enviados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
