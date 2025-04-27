import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  required?: boolean
  defaultImage?: string
}

export function ImageUpload({ onImageChange, required = false, defaultImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultImage || '/placeholder.jpg')
  const [error, setError] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError('')

    if (!file) {
      if (required) {
        setError('Imagem é obrigatória')
      }
      setPreview('/placeholder.jpg')
      onImageChange(null)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    onImageChange(file)
  }

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
        <Image
          src={preview}
          alt="Preview"
          fill
          className="object-cover"
        />
        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 cursor-pointer group">
          <div className="p-4 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-gray-500" />
            <p className="text-sm text-gray-500">Clique para fazer upload</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            required={required}
          />
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}