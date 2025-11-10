"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
  className?: string
}

export default function SearchFilters({ onFilterChange, className }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    faculty: "",
    department: "",
    level: "",
    date: undefined as Date | undefined,
    dateRange: [0, 30] as [number, number],
    verified: false,
    hasAttachments: false,
    sortBy: "relevance",
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = {
      type: "all",
      faculty: "",
      department: "",
      level: "",
      date: undefined,
      dateRange: [0, 30] as [number, number],
      verified: false,
      hasAttachments: false,
      sortBy: "relevance",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
        {isOpen && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
            Reset
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="bg-card rounded-lg border shadow-sm p-4 space-y-4 animate-in fade-in-0 zoom-in-95">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Advanced Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="posts">Posts</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="communities">Communities</SelectItem>
                  <SelectItem value="courses">Courses</SelectItem>
                  <SelectItem value="study-groups">Study Groups</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="academic">
              <AccordionTrigger>Academic Filters</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select value={filters.faculty} onValueChange={(value) => handleFilterChange("faculty", value)}>
                      <SelectTrigger id="faculty">
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="social-sciences">Social Sciences</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="law">Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={filters.department}
                      onValueChange={(value) => handleFilterChange("department", value)}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 Level</SelectItem>
                        <SelectItem value="200">200 Level</SelectItem>
                        <SelectItem value="300">300 Level</SelectItem>
                        <SelectItem value="400">400 Level</SelectItem>
                        <SelectItem value="500">500 Level</SelectItem>
                        <SelectItem value="postgrad">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="date">
              <AccordionTrigger>Date Filters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col space-y-2">
                    <Label>Specific Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.date ? format(filters.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.date}
                          onSelect={(date) => handleFilterChange("date", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Date Range (Last {filters.dateRange[1]} days)</Label>
                    </div>
                    <Slider
                      value={[filters.dateRange[1]]}
                      min={1}
                      max={90}
                      step={1}
                      onValueChange={(value) => handleFilterChange("dateRange", [0, value[0]])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 day</span>
                      <span>30 days</span>
                      <span>90 days</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="additional">
              <AccordionTrigger>Additional Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={filters.verified}
                      onCheckedChange={(checked) => handleFilterChange("verified", checked === true)}
                    />
                    <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
                      Only show verified content
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="attachments"
                      checked={filters.hasAttachments}
                      onCheckedChange={(checked) => handleFilterChange("hasAttachments", checked === true)}
                    />
                    <Label htmlFor="attachments" className="text-sm font-normal cursor-pointer">
                      Has attachments or files
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => {
                onFilterChange(filters)
                setIsOpen(false)
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
