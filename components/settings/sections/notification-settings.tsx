"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function NotificationSettings() {
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
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control what notifications you receive and how you receive them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Email Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-posts">Posts and Comments</Label>
                  <p className="text-sm text-muted-foreground">Receive emails when someone comments on your posts</p>
                </div>
                <Switch id="email-posts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-messages">Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">Receive emails for new direct messages</p>
                </div>
                <Switch id="email-messages" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-communities">Community Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about activity in your communities</p>
                </div>
                <Switch id="email-communities" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-schedule">Schedule Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about upcoming classes and deadlines</p>
                </div>
                <Switch id="email-schedule" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-marketing">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about Varsity features and updates</p>
                </div>
                <Switch id="email-marketing" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Push Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-posts">Posts and Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when someone comments on your posts
                  </p>
                </div>
                <Switch id="push-posts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-messages">Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new direct messages</p>
                </div>
                <Switch id="push-messages" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-communities">Community Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about activity in your communities
                  </p>
                </div>
                <Switch id="push-communities" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-schedule">Schedule Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about upcoming classes and deadlines
                  </p>
                </div>
                <Switch id="push-schedule" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Default</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
