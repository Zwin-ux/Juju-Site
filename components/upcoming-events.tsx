"use client"

import { useState } from "react"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample events data
const events = [
  {
    id: 1,
    title: "Architectural Sounds Tour",
    venue: "Modern Art Museum",
    location: "Warsaw, Poland",
    date: "June 15, 2025",
    time: "8:00 PM",
    description: "A unique audio-visual experience combining architectural projections with live music performance.",
    ticketLink: "#",
    category: "tour",
  },
  {
    id: 2,
    title: "White Peaks Album Release",
    venue: "Geometric Hall",
    location: "Berlin, Germany",
    date: "July 22, 2025",
    time: "7:30 PM",
    description: "Celebrating the release of the new album with a special performance featuring visual installations.",
    ticketLink: "#",
    category: "release",
  },
  {
    id: 3,
    title: "Sound & Structure Festival",
    venue: "City Park Amphitheater",
    location: "Krakow, Poland",
    date: "August 5-7, 2025",
    time: "Various Times",
    description: "A three-day festival exploring the intersection of architecture and sound with multiple artists.",
    ticketLink: "#",
    category: "festival",
  },
  {
    id: 4,
    title: "Acoustic Session: Vertical Rhythms",
    venue: "The Loft",
    location: "Prague, Czech Republic",
    date: "September 12, 2025",
    time: "9:00 PM",
    description:
      "An intimate acoustic performance featuring reinterpretations of tracks from the Vertical Rhythms album.",
    ticketLink: "#",
    category: "tour",
  },
]

export default function UpcomingEvents() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredEvents = activeCategory === "all" ? events : events.filter((event) => event.category === activeCategory)

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Upcoming Events</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Experience the music live with performances that combine architectural visuals and immersive sound.
          </p>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="tour">Tour Dates</TabsTrigger>
                <TabsTrigger value="release">Album Releases</TabsTrigger>
                <TabsTrigger value="festival">Festivals</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-900 text-white pb-4 relative">
                      <div className="absolute inset-0 peak-pattern opacity-20" />
                      <CardTitle className="relative z-10">{event.title}</CardTitle>
                      <CardDescription className="text-gray-300 relative z-10">
                        <div className="flex items-center mt-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex items-start mb-4">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{event.venue}</div>
                          <div className="text-gray-500">{event.location}</div>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{event.time}</span>
                      </div>
                      <Button asChild>
                        <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                          Get Tickets <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No events found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
