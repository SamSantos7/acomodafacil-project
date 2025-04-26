import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  location: string
  image: string
  rating: number
  text: string
}

export default function TestimonialCard({ name, location, image, rating, text }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-xl card-hover">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-sand-200">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-graphite-400">{name}</h3>
            <p className="text-sm text-graphite-300">{location}, Irlanda</p>
          </div>
        </div>

        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-current text-gold-500" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="text-graphite-300 italic leading-relaxed">"{text}"</p>
      </CardContent>
    </Card>
  )
}
