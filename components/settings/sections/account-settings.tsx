"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false) // In a real app, this would come from auth state

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Settings Saved",
      description: "Your account settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-foreground/70">Manage your account details, email, and verification status.</p>
      </div>
      <Separator />

      <div className="space-y-8">
        {/* Email Verification Status */}
        <div className="p-4 rounded-lg border border-foreground/10 bg-foreground/5">
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isVerified
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500"
                  : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500"
              }`}
            >
              {isVerified ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-medium mb-1">{isVerified ? "Account Verified" : "Account Not Verified"}</h4>
              <p className="text-sm text-foreground/70 mb-3">
                {isVerified
                  ? "Your account is verified. You have full access to all features."
                  : "Your account is not verified. Some features may be limited."}
              </p>
              {!isVerified && (
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700" asChild>
                  <Link href="/verify">Verify Account</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-base font-medium">Basic Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
            <p className="text-xs text-foreground/70">
              This is the email address used for account verification and notifications.
            </p>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="space-y-4">
          <h4 className="text-base font-medium">Account Preferences</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-xs text-foreground/70">Receive emails about new features and updates.</p>
              </div>
              <Switch id="marketing" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <p className="text-xs text-foreground/70">Add an extra layer of security to your account.</p>
              </div>
              <Switch id="twoFactor" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-red-500">Danger Zone</h4>
          <div className="p-4 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
            <h5 className="text-sm font-medium text-red-800 dark:text-red-500 mb-2">Delete Account</h5>
            <p className="text-xs text-red-700 dark:text-red-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  )
}
