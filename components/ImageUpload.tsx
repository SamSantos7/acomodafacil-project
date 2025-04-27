
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  required?: boolean;
}

export function ImageUpload({ onImageUpload, currentImage, required = true }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [error, setError] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const removeImage = () => {
    setPreview('');
    if (required) {
      setError('Uma imagem é obrigatória');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              type="button"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <Image
              src="/placeholder.jpg"
              alt="Imagem não disponível"
              width={200}
              height={150}
              className="opacity-50"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('imageInput')?.click()}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {preview ? 'Trocar imagem' : 'Enviar imagem'}
        </Button>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          required={required}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
