"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { FileText, Upload, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { Document } from "@/lib/types"

export default function DocumentosCliente() {
  const [documentos, setDocumentos] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    carregarDocumentos()
  }, [])

  const carregarDocumentos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      if (data) setDocumentos(data)
    } catch (error: any) {
      toast.error('Erro ao carregar documentos: ' + error.message)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

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
          url: publicUrl,
          data_upload: new Date().toISOString()
        })

      if (dbError) throw dbError

      toast.success('Documento enviado com sucesso!')
      carregarDocumentos()
    } catch (error: any) {
      toast.error('Erro ao enviar documento: ' + error.message)
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
      toast.success('Documento excluído com sucesso!')
      carregarDocumentos()
    } catch (error: any) {
      toast.error('Erro ao excluir documento: ' + error.message)
    }
  }

  return (
    <div className="container px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Meus Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={() => document.getElementById('fileInput')?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? 'Enviando...' : 'Enviar Documento'}
            </Button>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />

            <div className="grid gap-4">
              {documentos.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{doc.nome}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => doc.id && handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}