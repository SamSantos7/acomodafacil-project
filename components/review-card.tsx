import { Star } from "lucide-react"
import Image from "next/image"

interface ReviewCardProps {
  name: string
  date: string
  rating: number
  comment: string
  avatar?: string
}

export default function ReviewCard({ name, date, rating, comment, avatar }: ReviewCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
          {avatar ? (
            <Image src={avatar || "/placeholder.svg"} alt={`Foto de ${name}`} fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <div className="flex mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>

      <p className="text-gray-700">{comment}</p>
    </div>
  )
}
