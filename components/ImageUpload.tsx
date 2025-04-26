'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  bucket?: string
  maxSize?: number // em MB
}

export function ImageUpload({
  onUploadComplete,
  bucket = 'images',
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem para fazer upload')
      }

      const file = e.target.files[0]
      const fileSizeInMB = file.size / (1024 * 1024)

      if (fileSizeInMB > maxSize) {
        throw new Error(`O arquivo deve ter no máximo ${maxSize}MB`)
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('O arquivo deve ser uma imagem')
      }

      setUploading(true)

      // Criar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (error) throw error

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onUploadComplete(publicUrl)
      toast.success('Imagem enviada com sucesso!')
    } catch (error: any) {
      toast.error('Erro ao fazer upload: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Clique para fazer upload</span> ou
            arraste e solte
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG ou GIF (max. {maxSize}MB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  )
} 