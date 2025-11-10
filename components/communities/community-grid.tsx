"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CommunityCard from "./community-card"
import { communities } from "@/lib/data/communities"

interface CommunityGridProps {
  filter: "my" | "all" | "suggested"
  searchQuery: string
}

export default function CommunityGrid({ filter, searchQuery }: CommunityGridProps) {
  const [filteredCommunities, setFilteredCommunities] = useState(communities)

  useEffect(() => {
    let result = [...communities]

    // Apply filter
    if (filter === "my") {
      // In a real app, this would filter based on user's joined communities
      result = result.filter((c) => c.joined)
    } else if (filter === "suggested") {
      // In a real app, this would show personalized suggestions
      result = result.filter((c) => !c.joined).slice(0, 6)
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query))
    }

    setFilteredCommunities(result)
  }, [filter, searchQuery])

  if (filteredCommunities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No communities found</h3>
        <p className="text-foreground/70">
          {filter === "my" ? "You haven't joined any communities yet." : `No communities match "${searchQuery}".`}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCommunities.map((community, index) => (
        <motion.div
          key={community.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <CommunityCard community={community} />
        </motion.div>
      ))}
    </div>
  )
}
