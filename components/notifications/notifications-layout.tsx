"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationsList from "./notifications-list"
import NotificationsHeader from "./notifications-header"
import NotificationsEmpty from "./notifications-empty"
import { getAllNotifications } from "@/lib/data/notifications"

export default function NotificationsLayout() {
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const allNotifications = getAllNotifications()

  // Filter notifications based on type and search query
  const filteredNotifications = allNotifications.filter((notification) => {
    const matchesFilter = filter === "all" || notification.type === filter
    const matchesSearch =
      searchQuery === "" ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.source.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const hasNotifications = filteredNotifications.length > 0

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6">
      <NotificationsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Tabs defaultValue="all" className="mt-6" onValueChange={setFilter}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mention">Mentions</TabsTrigger>
            <TabsTrigger value="comment">Comments</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          {hasNotifications ? (
            <NotificationsList notifications={filteredNotifications} />
          ) : (
            <NotificationsEmpty type="all" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="mention" className="mt-0">
          {hasNotifications ? (
            <NotificationsList notifications={filteredNotifications} />
          ) : (
            <NotificationsEmpty type="mention" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="comment" className="mt-0">
          {hasNotifications ? (
            <NotificationsList notifications={filteredNotifications} />
          ) : (
            <NotificationsEmpty type="comment" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="academic" className="mt-0">
          {hasNotifications ? (
            <NotificationsList notifications={filteredNotifications} />
          ) : (
            <NotificationsEmpty type="academic" query={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="system" className="mt-0">
          {hasNotifications ? (
            <NotificationsList notifications={filteredNotifications} />
          ) : (
            <NotificationsEmpty type="system" query={searchQuery} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
