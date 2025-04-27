"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface AccommodationGalleryProps {
  images: string[]
  title: string
}

export default function AccommodationGallery({ images, title }: AccommodationGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setShowLightbox(true)
  }

  const closeLightbox = () => {
    setShowLightbox(false)
  }

  return (
    <div className="mb-8">
      <div className="relative h-[400px] md:h-[500px] mb-4 rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${title} - Imagem principal`}
          fill
          className="object-cover cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
              index === currentIndex ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50"
            aria-label="Fechar galeria"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${title} - Visualização ampliada`}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  )
}
