"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import MarketplaceSidebar from "@/components/marketplace/marketplace-sidebar"
import ItemGrid from "@/components/marketplace/item-grid"
import { filterItems, marketplaceCategories } from "@/lib/data/marketplace-items"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

export default function MarketplaceLayout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all")
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [condition, setCondition] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)

  const items = filterItems({
    category: activeCategory,
    minPrice,
    maxPrice,
    condition,
    location,
    query: searchQuery,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The items are already filtered by the searchQuery state
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    router.push(`/marketplace${category !== "all" ? `?category=${category}` : ""}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleFilterChange = ({
    min,
    max,
    cond,
    loc,
  }: {
    min?: number
    max?: number
    cond?: string
    loc?: string
  }) => {
    if (min !== undefined) setMinPrice(min)
    if (max !== undefined) setMaxPrice(max)
    if (cond !== undefined) setCondition(cond)
    if (loc !== undefined) setLocation(loc)
  }

  const clearFilters = () => {
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setCondition(undefined)
    setLocation(undefined)
    setSearchQuery("")
  }

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setActiveCategory(category)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <MarketplaceSidebar
            categories={marketplaceCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onFilterChange={handleFilterChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            condition={condition}
            location={location}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold">Marketplace</h1>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <form onSubmit={handleSearch} className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search items..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/marketplace/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Listing
                  </Link>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                <TabsTrigger value="my-listings">My Listings</TabsTrigger>
              </TabsList>
            </Tabs>

            <ItemGrid items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}
