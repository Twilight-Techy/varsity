"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, ExternalLink, Heart, MapPin, Share2, Users, Ticket, CheckCircle2 } from "lucide-react"
import { isRegisteredForEvent, cancelRegistration } from "@/lib/actions/event-actions"
import RegistrationModal from "@/components/events/registration-modal"
import type { Event } from "@/lib/data/events"

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  // Check if user is registered for this event
  useEffect(() => {
    const checkRegistration = async () => {
      const registered = await isRegisteredForEvent(event.id)
      setIsRegistered(registered)
    }

    checkRegistration()
  }, [event.id])

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleRegistrationClick = () => {
    setShowRegistrationModal(true)
  }

  const handleCancelRegistration = async () => {
    setIsLoading(true)
    setCancelError(null)

    try {
      const result = await cancelRegistration(event.id)

      if (result.success) {
        setIsRegistered(false)
      } else {
        setCancelError(result.message)
      }
    } catch (err) {
      setCancelError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegistrationSuccess = () => {
    setShowRegistrationModal(false)
    setIsRegistered(true)
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{event.category}</Badge>
                <Badge variant={event.isVirtual ? "outline" : "default"} className="bg-blue-600 hover:bg-blue-700">
                  {event.isVirtual ? "Virtual" : "In Person"}
                </Badge>
                {isRegistered && (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Registered
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
              <p className="text-muted-foreground mt-1">Hosted by {event.organizer}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={isSaved ? "text-red-500" : ""} onClick={handleSave}>
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg?height=600&width=1200"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Date & Time</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm mt-2">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Location</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                {event.isVirtual && (
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                    <Link href="#">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Join Virtual Event
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Attendees</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.attendees} attending</span>
                </div>
                <div className="flex -space-x-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={`/placeholder.svg?text=${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees > 5 && (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                      +{event.attendees - 5}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">About this event</h3>
                <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">What you'll learn</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Understanding the fundamentals of the topic</li>
                  <li>Practical applications and case studies</li>
                  <li>Networking with industry professionals</li>
                  <li>Hands-on experience with the latest tools</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>No prior knowledge required</li>
                  <li>Bring your laptop if attending in person</li>
                  <li>A stable internet connection for virtual attendees</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="agenda" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Schedule</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-600 pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                    <h4 className="font-medium">Registration & Welcome Coffee</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check in and enjoy refreshments while networking with other attendees.
                    </p>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">9:30 AM - 10:30 AM</p>
                    <h4 className="font-medium">Opening Keynote</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Introduction to the main themes and objectives of the event.
                    </p>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">10:45 AM - 12:00 PM</p>
                    <h4 className="font-medium">Workshop Session</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hands-on activities and collaborative exercises.
                    </p>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-4">
                    <p className="text-sm text-muted-foreground">12:00 PM - 1:00 PM</p>
                    <h4 className="font-medium">Networking Lunch</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enjoy lunch while connecting with speakers and fellow attendees.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="speakers" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Speakers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?text=JS" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">Dr. Jane Smith</CardTitle>
                        <CardDescription>Professor of Computer Science</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Leading researcher in artificial intelligence with over 15 years of experience in the field.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?text=JD" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">John Davis</CardTitle>
                        <CardDescription>Industry Expert</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Technology consultant with extensive experience implementing solutions for Fortune 500
                        companies.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="discussion" className="pt-4">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Join the conversation</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  {isRegistered
                    ? "The discussion board is now available. Start a conversation with other attendees."
                    : "The discussion board will be available once you register for the event."}
                </p>
                {!isRegistered ? (
                  <Button onClick={handleRegistrationClick}>Register to participate</Button>
                ) : (
                  <Button variant="outline">View Discussion Board</Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>Secure your spot for this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.capacity ? `${event.capacity - event.attendees} spots left` : "Unlimited spots"}
                  </p>
                </div>

                {isRegistered ? (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-400">You're registered!</p>
                        <p className="text-sm text-green-700 dark:text-green-500">
                          Your spot for this event is confirmed.
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                      onClick={handleCancelRegistration}
                      disabled={isLoading}
                    >
                      {isLoading ? "Canceling..." : "Cancel Registration"}
                    </Button>

                    {cancelError && <p className="text-sm text-red-600 dark:text-red-400">{cancelError}</p>}
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleRegistrationClick}>
                    <Ticket className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to our terms and conditions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?text=CS" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.organizer}</p>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="#">View Profile</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${i}`}
                      alt="Event thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-1">
                      <Link href="#" className="hover:underline">
                        Related Event {i}
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">May {10 + i}, 2023</p>
                    <p className="text-xs text-muted-foreground">{20 + i * 5} attending</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  )
}
