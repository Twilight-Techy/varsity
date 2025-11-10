import type { Metadata } from "next"
import VerificationForm from "@/components/verification/verification-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Verify Account | Varsity",
  description: "Verify your Varsity account to access all features",
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/dashboard" className="flex items-center text-foreground/70 hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <h1 className="text-2xl font-bold">Varsity</h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Verify Your Account</h2>
          <p className="text-foreground/70">
            Please verify your account to access all features of Varsity. We've sent a verification code to your email.
          </p>
        </div>
        <VerificationForm />
      </div>
    </div>
  )
}
