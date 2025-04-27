"use client"

import { useEffect, useRef } from "react"

interface AccommodationMapProps {
  address: string
  city: string
}

export default function AccommodationMap({ address, city }: AccommodationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Esta é uma implementação simulada
    // Em um ambiente real, você usaria a API do Google Maps ou similar
    if (mapRef.current) {
      const iframe = document.createElement("iframe")
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.style.border = "0"
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
        `${address}, ${city}, Ireland`,
      )}`

      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(iframe)
    }
  }, [address, city])

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="h-[300px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">
          Mapa de localização para {address}, {city}
          <br />
          <span className="text-sm">(API do Google Maps seria integrada aqui)</span>
        </p>
      </div>
    </div>
  )
}
