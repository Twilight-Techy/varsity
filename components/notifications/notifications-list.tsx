"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import NotificationItem from "./notification-item"
import type { Notification } from "@/lib/types"

interface NotificationsListProps {
  notifications: Notification[]
}

export default function NotificationsList({ notifications }: NotificationsListProps) {
  const [visibleCount, setVisibleCount] = useState(10)

  const visibleNotifications = notifications.slice(0, visibleCount)
  const hasMore = visibleCount < notifications.length

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {visibleNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={loadMore} className="w-full sm:w-auto">
            Load more notifications
          </Button>
        </div>
      )}
    </div>
  )
}
