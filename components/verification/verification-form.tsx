"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function VerificationForm() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    if (value.match(/^[0-9]$/) || value === "") {
      const newVerificationCode = [...verificationCode]
      newVerificationCode[index] = value
      setVerificationCode(newVerificationCode)

      // Auto-focus next input if a digit was entered
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`verification-input-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      const prevInput = document.getElementById(`verification-input-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const pastedDigits = pastedData
      .replace(/[^0-9]/g, "")
      .slice(0, 6)
      .split("")

    const newVerificationCode = [...verificationCode]
    pastedDigits.forEach((digit, index) => {
      if (index < 6) {
        newVerificationCode[index] = digit
      }
    })

    setVerificationCode(newVerificationCode)

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newVerificationCode.findIndex((digit) => digit === "")
    const inputToFocus = document.getElementById(`verification-input-${nextEmptyIndex !== -1 ? nextEmptyIndex : 5}`)
    if (inputToFocus) {
      inputToFocus.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join("")

    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful verification
      router.push("/verify/success")
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The verification code you entered is invalid or has expired.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)

    try {
      // In a real app, this would be an API call to resend the verification code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
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
        title: "Failed to Resend Code",
        description: "There was an error resending the verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label htmlFor="verification-input-0" className="block mb-2">
            Verification Code
          </Label>
          <div className="flex gap-2">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                id={`verification-input-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-lg"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <p className="text-sm text-foreground/70 mt-2">Enter the 6-digit code sent to your email address.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleResendCode}
            disabled={isResending || timeLeft > 0}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : timeLeft > 0 ? (
              `Resend Code (${timeLeft}s)`
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
