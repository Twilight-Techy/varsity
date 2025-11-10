"use client"

import { useState } from "react"
import { SearchFilters } from "./search-filters"
import { SearchResults } from "./search-results"
import { SearchBar } from "./search-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchLayout() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    university: "",
    department: "",
    year: "",
    sortBy: "relevance",
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Search Varsity</h1>

        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

        <div className="mt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="communities">Communities</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
              </div>

              <div className="md:w-3/4">
                <TabsContent value="all">
                  <SearchResults type="all" query={searchQuery} filters={filters} />
                </TabsContent>
                <TabsContent value="people">
                  <SearchResults type="people" query={searchQuery} filters={filters} />
                </TabsContent>
                <TabsContent value="communities">
                  <SearchResults type="communities" query={searchQuery} filters={filters} />
                </TabsContent>
                <TabsContent value="posts">
                  <SearchResults type="posts" query={searchQuery} filters={filters} />
                </TabsContent>
                <TabsContent value="courses">
                  <SearchResults type="courses" query={searchQuery} filters={filters} />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
