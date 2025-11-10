"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { MarketplaceCategory } from "@/lib/types"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface MarketplaceSidebarProps {
  categories: MarketplaceCategory[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  onFilterChange: ({
    min,
    max,
    cond,
    loc,
  }: {
    min?: number
    max?: number
    cond?: string
    loc?: string
  }) => void
  minPrice?: number
  maxPrice?: number
  condition?: string
  location?: string
  onClearFilters: () => void
}

export default function MarketplaceSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  onFilterChange,
  minPrice = 0,
  maxPrice = 2000,
  condition,
  location,
  onClearFilters,
}: MarketplaceSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice || 0, maxPrice || 2000])

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value as [number, number]
    setPriceRange([min, max])
    onFilterChange({ min, max })
  }

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.Circle
    return Icon
  }

  return (
    <div className="w-full md:w-64 space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <Button
            variant={activeCategory === "all" ? "default" : "ghost"}
            className={`w-full justify-start ${activeCategory === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
            onClick={() => onCategoryChange("all")}
          >
            All Categories
          </Button>

          {categories.map((category) => {
            const Icon = getIcon(category.icon as keyof typeof LucideIcons)
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
                <span className="ml-auto text-xs text-muted-foreground">{category.count}</span>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <Accordion type="multiple" defaultValue={["price", "condition", "location"]}>
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 2000]}
                    value={priceRange}
                    min={0}
                    max={2000}
                    step={10}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>$</span>
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (!isNaN(value)) {
                            setPriceRange([value, priceRange[1]])
                            onFilterChange({ min: value })
                          }
                        }}
                        className="w-20 h-8"
                      />
                    </div>
                    <span>to</span>
                    <div className="flex items-center space-x-2">
                      <span>$</span>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (!isNaN(value)) {
                            setPriceRange([priceRange[0], value])
                            onFilterChange({ max: value })
                          }
                        }}
                        className="w-20 h-8"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="condition">
              <AccordionTrigger>Condition</AccordionTrigger>
              <AccordionContent>
                <Select value={condition} onValueChange={(value) => onFilterChange({ cond: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <Select value={location} onValueChange={(value) => onFilterChange({ loc: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On Campus">On Campus</SelectItem>
                    <SelectItem value="Off Campus">Off Campus</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button variant="outline" className="w-full" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
