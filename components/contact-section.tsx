"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Twitter, Youtube, Mail, MapPin, Music } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
    // Reset form
    setFormState({
      name: "",
      email: "",
      message: "",
    })
    // Show success message
    alert("Thank you for your message. I'll get back to you soon!")
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Get in Touch</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            For bookings, collaborations, or just to say hello - I'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex flex-col">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-6 flex-1">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">contact@sonicpeaks.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium">Studio Location</h4>
                      <p className="text-gray-600">
                        123 Music Avenue, Arts District
                        <br />
                        Warsaw, Poland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Music className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium">Booking</h4>
                      <p className="text-gray-600">booking@sonicpeaks.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Youtube className="h-5 w-5 text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Music Licensing</h3>
                <p className="mb-4">
                  Interested in using my music for your project? Get in touch for licensing information.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Licensing Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
