"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Sample featured tracks
const featuredTracks = [
  {
    id: 1,
    title: "Angular Rhythms",
    duration: "3:45",
    src: "/placeholder-audio.mp3", // This would be replaced with actual audio files
  },
  {
    id: 2,
    title: "White Peaks",
    duration: "4:12",
    src: "/placeholder-audio.mp3",
  },
  {
    id: 3,
    title: "Cathedral of Sound",
    duration: "5:30",
    src: "/placeholder-audio.mp3",
  },
]

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(featuredTracks[currentTrack].src)
    audioRef.current.volume = volume

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    const handleEnded = () => {
      handleNext()
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("ended", handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current.pause()
      }
    }
  }, [currentTrack])

  // Audio visualization
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawVisualization = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set up visualization
      const barWidth = 3
      const barGap = 2
      const barCount = Math.floor(canvas.width / (barWidth + barGap))
      const centerY = canvas.height / 2

      // Draw visualization bars
      ctx.fillStyle = "#1f2937"

      for (let i = 0; i < barCount; i++) {
        // Create a pattern that resembles the peaks in the image
        // This is a simplified visualization without actual audio analysis
        const x = i * (barWidth + barGap)

        // Create a pattern that resembles the peaks
        const heightMultiplier = isPlaying ? 0.5 + 0.5 * Math.sin(i / 5 + currentTime * 2) : 0.2 + 0.1 * Math.sin(i / 5)

        const barHeight = canvas.height * 0.4 * heightMultiplier

        // Draw the bar
        ctx.beginPath()
        ctx.moveTo(x, centerY - barHeight / 2)
        ctx.lineTo(x + barWidth, centerY - barHeight / 2)
        ctx.lineTo(x + barWidth, centerY + barHeight / 2)
        ctx.lineTo(x, centerY + barHeight / 2)
        ctx.closePath()
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(drawVisualization)
    }

    drawVisualization()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, currentTime])

  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle previous track
  const handlePrevious = () => {
    const newIndex = (currentTrack - 1 + featuredTracks.length) % featuredTracks.length
    setCurrentTrack(newIndex)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Handle next track
  const handleNext = () => {
    const newIndex = (currentTrack + 1) % featuredTracks.length
    setCurrentTrack(newIndex)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <div className="mb-6">
        <canvas ref={canvasRef} width={800} height={120} className="w-full h-[120px] bg-white rounded-lg" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{featuredTracks[currentTrack].title}</h3>
          <p className="text-gray-500">Featured Track</p>
        </div>
        <div className="text-gray-500">
          {formatTime(currentTime)} / {featuredTracks[currentTrack].duration}
        </div>
      </div>

      <div className="mb-6">
        <Slider
          value={[currentTime]}
          max={
            duration ||
            Number.parseFloat(featuredTracks[currentTrack].duration.split(":")[0]) * 60 +
              Number.parseFloat(featuredTracks[currentTrack].duration.split(":")[1])
          }
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={toggleMute} className="rounded-full">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div className="w-24">
            <Slider value={[isMuted ? 0 : volume]} max={1} step={0.01} onValueChange={handleVolumeChange} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrevious} className="rounded-full h-10 w-10">
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            onClick={togglePlayPause}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-full h-14 w-14 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full h-10 w-10">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-[100px]">{/* Placeholder for balance */}</div>
      </div>
    </div>
  )
}
