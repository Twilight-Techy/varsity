"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotificationsEmptyProps {
  type: string
  query: string
}

export default function NotificationsEmpty({ type, query }: NotificationsEmptyProps) {
  // If there's a search query, show search-specific empty state
  if (query) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/30 p-4 rounded-full mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No matching notifications</h3>
        <p className="text-muted-foreground mt-1 mb-6 max-w-md">
          We couldn't find any notifications matching "{query}". Try a different search term.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Clear search
        </Button>
      </div>
    )
  }

  // Otherwise, show type-specific empty state
  let title = "No notifications yet"
  let description = "When you receive notifications, they'll appear here."

  switch (type) {
    case "mention":
      title = "No mentions yet"
      description = "When someone mentions you in a post or comment, you'll see it here."
      break
    case "comment":
      title = "No comment notifications"
      description = "When someone comments on your posts, you'll see it here."
      break
    case "academic":
      title = "No academic notifications"
      description = "Updates about assignments, classes, and grades will appear here."
      break
    case "system":
      title = "No system notifications"
      description = "Important updates about your account and Varsity will appear here."
      break
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/30 p-4 rounded-full mb-4">
        <Bell className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1 mb-6 max-w-md">{description}</p>
      <Button asChild>
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  )
}
