"use client"

import { motion } from "framer-motion"
import { Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

// Sample trending topics
const trendingTopics = [
  {
    id: 1,
    title: "Final Year Project Ideas",
    community: "Computer Science",
    count: 45,
  },
  {
    id: 2,
    title: "Internship Opportunities",
    community: "Faculty of Engineering",
    count: 32,
  },
  {
    id: 3,
    title: "Exam Preparation Tips",
    community: "300 Level",
    count: 28,
  },
  {
    id: 4,
    title: "Campus Wi-Fi Issues",
    community: "University of Lagos",
    count: 24,
  },
]

// Sample AI suggestions
const aiSuggestions = [
  {
    id: 1,
    title: "Data Structures Study Group",
    description: "Join others preparing for the upcoming exam",
  },
  {
    id: 2,
    title: "Database Systems Resources",
    description: "Curated materials for your current course",
  },
  {
    id: 3,
    title: "Complete your profile",
    description: "Add your skills and interests for better recommendations",
  },
]

export default function RightSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-foreground/10 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <div className="p-4 space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="group">
              <Link href={`/topics/${topic.id}`} className="block">
                <h3 className="font-medium text-sm group-hover:text-blue-500 transition-colors">#{topic.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-foreground/70">{topic.community}</p>
                  <p className="text-xs text-foreground/70">{topic.count} posts</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-foreground/10">
          <button className="w-full text-sm text-blue-500 hover:text-blue-600 font-medium">View All Trends</button>
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-foreground/10 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h2 className="font-semibold">AI Suggestions</h2>
        </div>
        <div className="p-4 space-y-4">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer"
            >
              <h3 className="font-medium text-sm">{suggestion.title}</h3>
              <p className="text-xs text-foreground/70 mt-1">{suggestion.description}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-foreground/10">
          <button className="w-full text-sm text-purple-500 hover:text-purple-600 font-medium">
            Get More Suggestions
          </button>
        </div>
      </motion.div>
    </div>
  )
}
