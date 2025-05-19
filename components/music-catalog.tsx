"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample music catalog data
const musicData = {
  albums: [
    {
      id: 1,
      title: "Angular Harmonies",
      year: "2023",
      cover: "/placeholder.svg?height=400&width=400",
      trackCount: 5,
    },
    {
      id: 2,
      title: "Vertical Rhythms",
      year: "2022",
      cover: "/placeholder.svg?height=400&width=400",
      trackCount: 8,
    },
    {
      id: 3,
      title: "White Cathedral",
      year: "2021",
      cover: "/placeholder.svg?height=400&width=400",
      trackCount: 6,
    },
  ],
  singles: [
    {
      id: 1,
      title: "Geometric Pulse",
      year: "2023",
      cover: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      title: "Ribbed Facade",
      year: "2022",
      cover: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      title: "Morning Light",
      year: "2022",
      cover: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      title: "Structural Beats",
      year: "2021",
      cover: "/placeholder.svg?height=400&width=400",
    },
  ],
  tracks: [
    { id: 1, title: "White Peaks", album: "Angular Harmonies", duration: "3:45", year: "2023" },
    { id: 2, title: "Vertical Rhythm", album: "Angular Harmonies", duration: "4:12", year: "2023" },
    { id: 3, title: "Cathedral of Sound", album: "Angular Harmonies", duration: "5:30", year: "2023" },
    { id: 4, title: "Geometric Harmony", album: "Angular Harmonies", duration: "3:58", year: "2023" },
    { id: 5, title: "Ribbed Facade", album: "Angular Harmonies", duration: "4:22", year: "2023" },
    { id: 6, title: "Structural Beats", album: "Vertical Rhythms", duration: "3:15", year: "2022" },
    { id: 7, title: "Concrete Dreams", album: "Vertical Rhythms", duration: "4:05", year: "2022" },
    { id: 8, title: "Modernist Groove", album: "Vertical Rhythms", duration: "3:50", year: "2022" },
    { id: 9, title: "Architectural Flow", album: "Vertical Rhythms", duration: "5:10", year: "2022" },
    { id: 10, title: "Spatial Awareness", album: "Vertical Rhythms", duration: "4:30", year: "2022" },
    { id: 11, title: "Angular Perspective", album: "White Cathedral", duration: "3:40", year: "2021" },
    { id: 12, title: "Geometric Pulse", album: "Single", duration: "3:22", year: "2023" },
    { id: 13, title: "Ribbed Facade (Single)", album: "Single", duration: "4:15", year: "2022" },
    { id: 14, title: "Morning Light", album: "Single", duration: "3:30", year: "2022" },
    { id: 15, title: "Structural Beats (Single)", album: "Single", duration: "3:15", year: "2021" },
    // Additional tracks would be added here
  ],
}

export default function MusicCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState<string[]>([])

  // Get unique years for filtering
  const years = Array.from(new Set(musicData.tracks.map((track) => track.year)))

  // Filter tracks based on search and year filter
  const filteredTracks = musicData.tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = yearFilter.length === 0 || yearFilter.includes(track.year)
    return matchesSearch && matchesYear
  })

  return (
    <section id="music" className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Music Catalog</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Explore the complete collection of tracks, albums, and singles inspired by architectural forms and geometric
            precision.
          </p>

          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="tracks">All Tracks</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="singles">Singles</TabsTrigger>
            </TabsList>

            <TabsContent value="tracks" className="mt-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tracks..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" /> Filter by Year
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {years.map((year) => (
                      <DropdownMenuCheckboxItem
                        key={year}
                        checked={yearFilter.includes(year)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setYearFilter([...yearFilter, year])
                          } else {
                            setYearFilter(yearFilter.filter((y) => y !== year))
                          }
                        }}
                      >
                        {year}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 py-3 px-4 bg-gray-100 text-sm font-medium text-gray-500">
                  <div className="col-span-6 md:col-span-5">Title</div>
                  <div className="col-span-4 md:col-span-3 hidden md:block">Album</div>
                  <div className="col-span-3 md:col-span-2 text-right">Duration</div>
                  <div className="col-span-3 md:col-span-2 text-right">Year</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map((track) => (
                      <div
                        key={track.id}
                        className="grid grid-cols-12 py-3 px-4 hover:bg-gray-100 transition-colors items-center"
                      >
                        <div className="col-span-6 md:col-span-5 flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 mr-3 text-gray-700 hover:text-gray-900 hover:bg-white"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <span className="font-medium truncate">{track.title}</span>
                        </div>
                        <div className="col-span-4 md:col-span-3 text-gray-500 truncate hidden md:block">
                          {track.album}
                        </div>
                        <div className="col-span-3 md:col-span-2 text-gray-500 text-right">{track.duration}</div>
                        <div className="col-span-3 md:col-span-2 text-gray-500 text-right">{track.year}</div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">No tracks found matching your search.</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {musicData.albums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <Image src={album.cover || "/placeholder.svg"} alt={album.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold text-xl">{album.title}</h3>
                          <p className="text-gray-300">
                            {album.year} • {album.trackCount} tracks
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gray-900/30">
                        <Button className="bg-white hover:bg-gray-100 text-gray-900">
                          <Play className="mr-2 h-4 w-4" /> Play Album
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="singles" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {musicData.singles.map((single) => (
                  <div
                    key={single.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={single.cover || "/placeholder.svg"}
                        alt={single.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold">{single.title}</h3>
                          <p className="text-gray-300">{single.year}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gray-900/30">
                        <Button
                          size="sm"
                          className="bg-white hover:bg-gray-100 text-gray-900 rounded-full h-12 w-12 p-0"
                        >
                          <Play className="h-5 w-5 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
