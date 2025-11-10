"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Loader2, Moon, Sun, Monitor } from "lucide-react"

export function AppearanceSettings() {
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
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize how Varsity looks for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Theme</h3>

            <RadioGroup defaultValue="dark" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-50 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer"
                >
                  <Sun className="h-6 w-6 mb-3 text-orange-500" />
                  <div className="font-medium">Light</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 p-4 hover:bg-gray-900 hover:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-gray-900 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-gray-900 cursor-pointer"
                >
                  <Moon className="h-6 w-6 mb-3 text-blue-400" />
                  <div className="font-medium text-white">Dark</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-br from-white to-gray-950 p-4 hover:border-gray-400 peer-checked:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer"
                >
                  <Monitor className="h-6 w-6 mb-3 text-purple-500" />
                  <div className="font-medium">System</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Interface Density</h3>

            <RadioGroup defaultValue="comfortable" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="density-comfortable" />
                <Label htmlFor="density-comfortable">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="density-compact" />
                <Label htmlFor="density-compact">Compact</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Animations</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduce-animations">Reduce animations</Label>
                <p className="text-sm text-muted-foreground">Minimize motion effects throughout the interface</p>
              </div>
              <Switch id="reduce-animations" />
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium">Font Size</h3>

            <RadioGroup defaultValue="medium" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large">Large</Label>
              </div>
            </RadioGroup>
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
