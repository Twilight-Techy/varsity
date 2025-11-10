"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showRecent, setShowRecent] = useState(false)

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const handleSearch = () => {
    if (!query.trim()) return

    onSearch(query)

    // Save to recent searches
    const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    setShowRecent(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const selectRecentSearch = (search: string) => {
    setQuery(search)
    onSearch(search)
    setShowRecent(false)
  }

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search for people, communities, posts, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            className="pl-10 pr-4 py-2 h-12 text-base rounded-l-lg border-r-0 focus-visible:ring-blue-500"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        </div>
        <Button
          onClick={handleSearch}
          className="rounded-l-none h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Search
        </Button>
      </div>

      {showRecent && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
          <div className="p-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Recent Searches</h3>
            <ul>
              {recentSearches.map((search, index) => (
                <li key={index}>
                  <button
                    onClick={() => selectRecentSearch(search)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md flex items-center"
                  >
                    <Search className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    {search}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
