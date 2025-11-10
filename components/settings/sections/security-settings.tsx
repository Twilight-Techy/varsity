"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>Manage your password and account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Change Password</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
                <p className="text-sm text-muted-foreground">
                  Password must be at least 8 characters and include a number and a special character
                </p>
              </div>

              <Button size="sm">Update Password</Button>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Two-Factor Authentication</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="2fa" />
              </div>

              <Alert variant="default" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Not Enabled</AlertTitle>
                <AlertDescription>
                  Two-factor authentication is not enabled for your account. We strongly recommend enabling this feature
                  for additional security.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Login Sessions</h3>

            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground mt-1">Chrome on macOS • San Francisco, CA, USA</p>
                    <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago • IP: 192.168.1.1</p>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500 font-medium">
                    Active
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Mobile App</p>
                    <p className="text-sm text-muted-foreground mt-1">Varsity App on iPhone • San Francisco, CA, USA</p>
                    <p className="text-xs text-muted-foreground mt-1">Started 3 days ago • IP: 192.168.1.2</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Log Out
                  </Button>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-2">
                Log Out of All Other Sessions
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
