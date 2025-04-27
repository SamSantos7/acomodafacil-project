'use client'

import { useState } from 'react'
import { Upload, FileText, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState([
    { id: 1, nome: 'Passaporte.pdf', data: '2024-02-20', tipo: 'upload' },
    { id: 2, nome: 'Contrato.pdf', data: '2024-02-19', tipo: 'download' }
  ])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setDocumentos([...documentos, {
        id: Date.now(),
        nome: file.name,
        data: new Date().toISOString().split('T')[0],
        tipo: 'upload'
      }])
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meus Documentos</h1>
        <div className="relative">
          <Input
            type="file"
            className="hidden"
            id="fileUpload"
            onChange={handleUpload}
            accept=".pdf,.jpg,.png"
          />
          <Button onClick={() => document.getElementById('fileUpload')?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Enviar Documento
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {documentos.map((doc) => (
          <Card key={doc.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <p className="font-medium">{doc.nome}</p>
                <p className="text-sm text-gray-500">{doc.data}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {doc.tipo === 'download' ? (
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="outline" size="icon" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}