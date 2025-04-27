"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-4 text-left font-medium"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            {item.question}
            <ChevronDown
              className={`h-5 w-5 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
            />
          </button>

          {openIndex === index && (
            <div className="p-4 pt-0 border-t border-gray-200">
              <p className="text-gray-700">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
