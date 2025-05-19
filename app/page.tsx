import Image from "next/image"
import { ChevronRight, Headphones, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import MusicPlayer from "@/components/music-player"
import FeaturedAlbum from "@/components/featured-album"
import MusicCatalog from "@/components/music-catalog"
import UpcomingEvents from "@/components/upcoming-events"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/polish-building.png"
            alt="Angular white architecture"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/50 to-gray-900/70" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Sonic Peaks</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">Where Architecture Meets Sound</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md text-lg">
              <Headphones className="mr-2 h-5 w-5" /> Listen Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-md text-lg"
            >
              <Calendar className="mr-2 h-5 w-5" /> Upcoming Shows
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <ChevronRight className="h-8 w-8 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Featured Album Section */}
      <FeaturedAlbum />

      {/* Music Player Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Latest Releases</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Experience the fusion of architectural inspiration and sonic landscapes.
            </p>

            <MusicPlayer />
          </div>
        </div>
      </section>

      {/* Music Catalog */}
      <MusicCatalog />

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
