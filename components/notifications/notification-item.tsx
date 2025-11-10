"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  FileText,
  MessageSquare,
  MoreVertical,
  Star,
  Trash2,
  User,
  Users,
} from "lucide-react"
import type { Notification } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: Notification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.read)

  const markAsRead = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRead(true)
  }

  const getIcon = () => {
    switch (notification.type) {
      case "mention":
        return <User className="h-5 w-5 text-purple-500" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "academic":
        switch (notification.subtype) {
          case "assignment":
            return <FileText className="h-5 w-5 text-orange-500" />
          case "class":
            return <Calendar className="h-5 w-5 text-blue-500" />
          case "grade":
            return <Star className="h-5 w-5 text-yellow-500" />
          default:
            return <BookOpen className="h-5 w-5 text-blue-500" />
        }
      case "community":
        return <Users className="h-5 w-5 text-indigo-500" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const formattedTime = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
  })

  return (
    <Link href={notification.link}>
      <Card
        className={cn("transition-colors hover:bg-muted/50 cursor-pointer", !isRead && "border-l-4 border-l-blue-500")}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              {notification.source.avatar ? (
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={notification.source.avatar || "/placeholder.svg"}
                      alt={notification.source.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">{getIcon()}</div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold">
                    {notification.source.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">{getIcon()}</div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{notification.source.name}</span>
                    {notification.source.role && (
                      <span className="text-muted-foreground ml-1">({notification.source.role})</span>
                    )}
                  </p>
                  <p className="text-sm mt-1">{notification.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formattedTime}</p>
                </div>

                <div className="flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!isRead && (
                        <DropdownMenuItem onClick={markAsRead}>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Mark as read</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Remove</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
