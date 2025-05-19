"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Sample artwork data
const artworks = [
  {
    id: 1,
    title: "Ascending Peaks",
    description: "Mixed media on canvas, 2023",
    image: "/placeholder.svg?height=800&width=600",
    category: "Painting",
  },
  {
    id: 2,
    title: "Vertical Rhythm",
    description: "Digital art, 2023",
    image: "/placeholder.svg?height=800&width=600",
    category: "Digital",
  },
  {
    id: 3,
    title: "White Cathedral",
    description: "Photography, 2022",
    image: "/placeholder.svg?height=800&width=600",
    category: "Photography",
  },
  {
    id: 4,
    title: "Angular Dreams",
    description: "Sculpture, 2023",
    image: "/placeholder.svg?height=800&width=600",
    category: "Sculpture",
  },
  {
    id: 5,
    title: "Luminous Passage",
    description: "Oil on canvas, 2022",
    image: "/placeholder.svg?height=800&width=600",
    category: "Painting",
  },
  {
    id: 6,
    title: "Geometric Harmony",
    description: "Digital art, 2023",
    image: "/placeholder.svg?height=800&width=600",
    category: "Digital",
  },
]

// Filter categories
const categories = ["All", "Painting", "Digital", "Photography", "Sculpture"]

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)

  const filteredArtworks =
    selectedCategory === "All" ? artworks : artworks.filter((artwork) => artwork.category === selectedCategory)

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Gallery</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore a collection of works inspired by architectural forms, light, and geometric precision.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gray-900 text-white" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredArtworks.map((artwork) => (
            <Dialog key={artwork.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="artwork-card group cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork.id)}
                >
                  <div className="relative aspect-[2/3] bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                      <div>
                        <h3 className="text-white font-medium">{artwork.title}</h3>
                        <p className="text-gray-200 text-sm">{artwork.description}</p>
                      </div>
                      <div className="ml-auto">
                        <Maximize className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{artwork.title}</h2>
                    <p className="text-gray-500 mb-4">{artwork.description}</p>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <h3 className="font-medium mb-2">About this piece</h3>
                      <p className="text-gray-600 text-sm">
                        This work explores the interplay between architectural forms and natural light. Inspired by
                        modernist structures, it captures the essence of space, form, and shadow.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800">Inquire About This Piece</Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
