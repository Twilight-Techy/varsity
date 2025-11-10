"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent as deleteEventData,
  getEventsByUser,
} from "@/lib/data/events"
import type { Event } from "@/lib/data/events"

// In a real app, this would be stored in a database
// For demo purposes, we'll use cookies to persist registrations
export async function registerForEvent(eventId: string) {
  try {
    const event = getEventById(eventId)
    if (!event) {
      return { success: false, message: "Event not found" }
    }

    // Check if event is at capacity
    if (event.capacity && event.attendees >= event.capacity) {
      return { success: false, message: "This event is at full capacity" }
    }

    // Get current registrations from cookies
    const registrationsCookie = cookies().get("event_registrations")
    let registrations: string[] = []

    if (registrationsCookie?.value) {
      try {
        registrations = JSON.parse(registrationsCookie.value)
      } catch (e) {
        // Invalid JSON, start with empty array
        registrations = []
      }
    }

    // Check if already registered
    if (registrations.includes(eventId)) {
      return { success: false, message: "You are already registered for this event" }
    }

    // Add to registrations
    registrations.push(eventId)

    // Save to cookies
    cookies().set("event_registrations", JSON.stringify(registrations), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Update the event attendees count
    updateEvent(eventId, { attendees: event.attendees + 1 })

    // Revalidate paths
    revalidatePath(`/events/${eventId}`)
    revalidatePath("/events")
    revalidatePath("/events/my-events")

    return {
      success: true,
      message: "Successfully registered for event",
      registrations,
    }
  } catch (error) {
    console.error("Error registering for event:", error)
    return { success: false, message: "An error occurred while registering for the event" }
  }
}

export async function cancelRegistration(eventId: string) {
  try {
    // Get current registrations from cookies
    const registrationsCookie = cookies().get("event_registrations")
    let registrations: string[] = []

    if (registrationsCookie?.value) {
      try {
        registrations = JSON.parse(registrationsCookie.value)
      } catch (e) {
        // Invalid JSON, start with empty array
        registrations = []
      }
    }

    // Check if registered
    if (!registrations.includes(eventId)) {
      return { success: false, message: "You are not registered for this event" }
    }

    // Remove from registrations
    registrations = registrations.filter((id) => id !== eventId)

    // Save to cookies
    cookies().set("event_registrations", JSON.stringify(registrations), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Update the event attendees count
    const event = getEventById(eventId)
    if (event) {
      updateEvent(eventId, { attendees: Math.max(0, event.attendees - 1) })
    }

    // Revalidate paths
    revalidatePath(`/events/${eventId}`)
    revalidatePath("/events")
    revalidatePath("/events/my-events")

    return {
      success: true,
      message: "Successfully canceled registration",
      registrations,
    }
  } catch (error) {
    console.error("Error canceling registration:", error)
    return { success: false, message: "An error occurred while canceling the registration" }
  }
}

export async function getUserRegistrations() {
  // Get current registrations from cookies
  const registrationsCookie = cookies().get("event_registrations")
  let registrationIds: string[] = []

  if (registrationsCookie?.value) {
    try {
      registrationIds = JSON.parse(registrationsCookie.value)
    } catch (e) {
      // Invalid JSON, return empty array
      return []
    }
  }

  // Get all events
  const allEvents = getAllEvents()

  // Filter events by registration IDs
  const registeredEvents = allEvents.filter((event) => registrationIds.includes(event.id))

  return registeredEvents
}

export async function isRegisteredForEvent(eventId: string) {
  // Get current registrations from cookies
  const registrationsCookie = cookies().get("event_registrations")
  let registrations: string[] = []

  if (registrationsCookie?.value) {
    try {
      registrations = JSON.parse(registrationsCookie.value)
    } catch (e) {
      // Invalid JSON, return false
      return false
    }
  }

  return registrations.includes(eventId)
}

// Create a new event
export async function createNewEvent(eventData: Omit<Event, "id" | "attendees" | "createdAt">) {
  try {
    // In a real app, we would validate the user is authenticated here
    const userId = "user1" // Mock user ID, in a real app this would come from the session

    const newEvent = createEvent({
      ...eventData,
      createdBy: userId,
    })

    revalidatePath("/events")
    revalidatePath("/events/my-events")

    return { success: true, event: newEvent }
  } catch (error) {
    console.error("Error creating event:", error)
    return { success: false, message: "An error occurred while creating the event" }
  }
}

// Update an existing event
export async function updateExistingEvent(id: string, eventData: Partial<Event>) {
  try {
    // In a real app, we would validate the user is authenticated and owns the event
    const updatedEvent = updateEvent(id, eventData)

    if (!updatedEvent) {
      return { success: false, message: "Event not found" }
    }

    revalidatePath(`/events/${id}`)
    revalidatePath("/events")
    revalidatePath("/events/my-events")

    return { success: true, event: updatedEvent }
  } catch (error) {
    console.error("Error updating event:", error)
    return { success: false, message: "An error occurred while updating the event" }
  }
}

// Delete an event
export async function deleteEvent(id: string) {
  try {
    // In a real app, we would validate the user is authenticated and owns the event
    const success = deleteEventData(id)

    if (!success) {
      return { success: false, message: "Event not found" }
    }

    revalidatePath("/events")
    revalidatePath("/events/my-events")

    return { success: true, message: "Event deleted successfully" }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { success: false, message: "An error occurred while deleting the event" }
  }
}

// Get events created by the current user
export async function getCurrentUserEvents() {
  try {
    // In a real app, we would get the user ID from the session
    const userId = "user1" // Mock user ID

    const userEvents = getEventsByUser(userId)
    return userEvents
  } catch (error) {
    console.error("Error fetching user events:", error)
    return []
  }
}
