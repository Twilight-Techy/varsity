import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Verification Successful | Varsity",
  description: "Your Varsity account has been successfully verified",
}

export default function VerificationSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Verification Successful!</h1>
        <p className="text-foreground/70 mb-8">
          Your account has been successfully verified. You now have full access to all features of Varsity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">Complete Your Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
