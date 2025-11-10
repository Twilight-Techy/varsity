"use client"

import React from "react"
import ResourceCard from "@/components/resources/resource-card"
import type { Resource } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  const [view, setView] = React.useState<"grid" | "list">("grid")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resources Hub</h1>
          <p className="text-gray-500 dark:text-gray-400">Access study materials, textbooks, past questions and more</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Tabs
            defaultValue="grid"
            className="hidden sm:block"
            onValueChange={(value) => setView(value as "grid" | "list")}
          >
            <TabsList className="grid w-16 grid-cols-2">
              <TabsTrigger value="grid" className="p-2">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="p-2">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div
        className={
          view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"
        }
      >
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} view={view} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300"
        >
          Load More
        </Button>
      </div>
    </div>
  )
}
