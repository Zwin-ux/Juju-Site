"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample album data
const albumData = {
  title: "Angular Harmonies",
  releaseDate: "2023",
  description:
    "A sonic exploration inspired by modernist architecture and geometric forms. Each track represents a different structural element, creating a musical journey through space and form.",
  coverImage: "/placeholder.svg?height=600&width=600",
  tracks: [
    { id: 1, title: "White Peaks", duration: "3:45", featured: true },
    { id: 2, title: "Vertical Rhythm", duration: "4:12", featured: false },
    { id: 3, title: "Cathedral of Sound", duration: "5:30", featured: true },
    { id: 4, title: "Geometric Harmony", duration: "3:58", featured: false },
    { id: 5, title: "Ribbed Facade", duration: "4:22", featured: false },
  ],
}

export default function FeaturedAlbum() {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto md:ml-0">
                <div className="absolute inset-0 peak-pattern opacity-10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/10 to-transparent z-10" />
                <Image
                  src={albumData.coverImage || "/placeholder.svg"}
                  alt={albumData.title}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />

                {/* Decorative peaks */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white shadow-lg rounded-tr-lg z-0 peak-shape transform rotate-45"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-100 shadow-lg rounded-tr-lg z-0 peak-shape transform -rotate-45"></div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{albumData.title}</h2>
                <p className="text-gray-500">Released: {albumData.releaseDate}</p>

                <div className="mt-4 flex space-x-4">
                  <Button className="bg-gray-900 hover:bg-gray-800">
                    <Play className="mr-2 h-4 w-4" /> Play All
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download Album
                  </Button>
                </div>

                <p className="mt-6 text-gray-600">{albumData.description}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 pb-2 border-b">
                  <div className="w-8">#</div>
                  <div className="flex-1">Title</div>
                  <div className="w-16 text-right">
                    <Clock className="h-4 w-4 ml-auto" />
                  </div>
                </div>

                {albumData.tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`flex items-center py-3 px-2 rounded-md ${
                      hoveredTrack === track.id ? "bg-gray-100" : ""
                    }`}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-8 text-gray-500">{index + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{track.title}</span>
                        {track.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-16 text-right text-gray-500">{track.duration}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
