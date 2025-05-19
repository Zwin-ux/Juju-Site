"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const timelineItems = [
  {
    year: "2018",
    title: "First Exhibition",
    description: "Launching my first exhibition felt like standing atop a peak—excited, terrified, ready.",
    highlight: "The beginning of a journey into architectural inspirations.",
  },
  {
    year: "2020",
    title: "Studio Expansion",
    description: "Moving into a larger space allowed me to experiment with scale and dimension.",
    highlight: "Created the 'Vertical Ascent' series that defined my signature style.",
  },
  {
    year: "2021",
    title: "International Recognition",
    description: "My work was featured in galleries across Europe, bringing new perspectives.",
    highlight: "Collaboration with architects influenced my approach to form and space.",
  },
  {
    year: "2023",
    title: "New Directions",
    description: "Exploring digital mediums while maintaining my commitment to geometric precision.",
    highlight: "The fusion of traditional techniques with computational design.",
  },
]

export default function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Behind the Peaks</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          The journey that shaped my artistic vision and creative process.
        </p>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-[-0.5px]" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24 relative">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`relative ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:mr-0" : "md:pl-12 md:ml-0 md:mr-auto"} ml-8 md:ml-0 md:w-1/2`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-[-20px] md:left-auto ${index % 2 === 0 ? "md:right-[-10px]" : "md:left-[-10px]"} top-0 w-5 h-5 rounded-full border-4 border-white bg-gray-200 z-10 ${activeIndex === index ? "bg-gray-900" : ""}`}
                  onClick={() => setActiveIndex(index)}
                />

                {/* Year Marker */}
                <div
                  className={`absolute left-[-60px] md:left-auto ${index % 2 === 0 ? "md:right-[-60px]" : "md:left-[-60px]"} top-[-5px] font-bold text-gray-400`}
                >
                  {item.year}
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm peak-card"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="bg-white p-3 rounded border-l-4 border-gray-900">
                    <p className="text-sm italic">{item.highlight}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
