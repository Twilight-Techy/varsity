"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react"
import { registerForEvent } from "@/lib/actions/event-actions"
import type { Event } from "@/lib/data/events"

interface RegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function RegistrationModal({ event, isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await registerForEvent(event.id)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
          router.refresh()
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{success ? "Registration Confirmed!" : "Register for Event"}</DialogTitle>
          <DialogDescription>
            {success
              ? "You have successfully registered for this event."
              : "Please confirm your registration for this event."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-center">You're all set!</h3>
            <p className="text-center text-muted-foreground">
              We've added this event to your schedule. You'll receive a reminder before the event starts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">{event.title}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {event.price > 0 && (
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Registration Fee</h3>
                <p className="text-2xl font-bold">${event.price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Payment will be collected at the event</p>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex sm:justify-between">
          {!success && (
            <>
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleRegister} disabled={isSubmitting || success}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Registration"
                )}
              </Button>
            </>
          )}

          {success && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
