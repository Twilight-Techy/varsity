"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function VerificationReminder() {
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const handleResendVerification = async () => {
    setIsResending(true)

    try {
      // In a real app, this would be an API call to resend the verification email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Verification Email Sent",
        description: "A new verification email has been sent to your inbox.",
      })

      // Set cooldown timer for 60 seconds
      setTimeLeft(60)
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="border-yellow-500/20 bg-yellow-500/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Verify Your Account</CardTitle>
        </div>
        <CardDescription>Complete verification to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 mb-4">
          We've sent a verification email to your registered email address. Please check your inbox and follow the
          instructions to verify your account.
        </p>
        <div className="flex items-center gap-2 text-sm bg-yellow-500/10 p-3 rounded-md">
          <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          <p>Some features like creating study groups and accessing certain communities require a verified account.</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleResendVerification}
          disabled={isResending || timeLeft > 0}
        >
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : timeLeft > 0 ? (
            `Resend Email (${timeLeft}s)`
          ) : (
            "Resend Verification Email"
          )}
        </Button>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700" asChild>
          <Link href="/verify">
            Verify Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
