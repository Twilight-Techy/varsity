"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerificationBanner() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Your account is not verified. Some features may be limited.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700"
            asChild
          >
            <Link href="/verify">Verify Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
