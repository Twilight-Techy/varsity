"use client"

import { useState } from "react"
import SearchLayout from "@/components/search/search-layout"
import SearchBar from "@/components/search/search-bar"
import SearchFilters from "@/components/search/search-filters"
import SearchResults from "@/components/search/search-results"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState({
    type: "all",
    faculty: "",
    department: "",
    level: "",
    date: undefined,
    dateRange: [0, 30],
    verified: false,
    hasAttachments: false,
    sortBy: "relevance",
  })

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <SearchLayout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Search</h1>
        <SearchBar initialQuery={query} onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="md:col-span-1">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
          <div className="md:col-span-3">
            <SearchResults query={query} filters={filters} />
          </div>
        </div>
      </div>
    </SearchLayout>
  )
}
