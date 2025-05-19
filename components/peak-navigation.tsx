"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const navigationItems = [
  { name: "Artworks", href: "#gallery", description: "Explore the collection" },
  { name: "Projects", href: "#projects", description: "Collaborative ventures" },
  { name: "About", href: "#about", description: "The artist's journey" },
  { name: "Contact", href: "#contact", description: "Get in touch" },
]

export default function PeakNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className="py-16 bg-white">
      <div className="container px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={item.href} className="block">
                  <div className="peak-shape h-40 md:h-52 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 peak-pattern opacity-10" />

                    <span className="text-lg font-medium text-gray-900 relative z-10 mt-4">{item.name}</span>

                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-600 mt-2 relative z-10"
                      >
                        {item.description}
                      </motion.div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
