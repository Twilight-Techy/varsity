"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ChevronDown, ChevronRight, Building, BookOpen, GraduationCap, Users, Plus } from "lucide-react"
import { communities } from "@/lib/data/communities"

interface CommunitySidebarProps {
  onClose: () => void
}

export default function CommunitySidebar({ onClose }: CommunitySidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    universities: true,
    faculties: true,
    departments: true,
    levels: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Group communities by type
  const universities = communities.filter((c) => c.type === "university")
  const faculties = communities.filter((c) => c.type === "faculty")
  const departments = communities.filter((c) => c.type === "department")
  const levels = communities.filter((c) => c.type === "level")

  return (
    <div className="h-full bg-background border-r border-foreground/10 flex flex-col">
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Communities</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          asChild
        >
          <Link href="/communities/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Link>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Universities */}
          <div className="mb-2">
            <button
              className="flex items-center justify-between w-full p-2 text-sm font-medium hover:bg-foreground/5 rounded-lg transition-colors"
              onClick={() => toggleSection("universities")}
            >
              <div className="flex items-center">
                <Building className="h-4 w-4 text-blue-500 mr-2" />
                <span>Universities</span>
              </div>
              {expandedSections.universities ? (
                <ChevronDown className="h-4 w-4 text-foreground/60" />
              ) : (
                <ChevronRight className="h-4 w-4 text-foreground/60" />
              )}
            </button>
            {expandedSections.universities && (
              <div className="ml-6 mt-1 space-y-1">
                {universities.map((university) => (
                  <Link
                    key={university.id}
                    href={`/communities/${university.id}`}
                    className="flex items-center p-2 text-sm hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    <span className="truncate">{university.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Faculties */}
          <div className="mb-2">
            <button
              className="flex items-center justify-between w-full p-2 text-sm font-medium hover:bg-foreground/5 rounded-lg transition-colors"
              onClick={() => toggleSection("faculties")}
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-purple-500 mr-2" />
                <span>Faculties</span>
              </div>
              {expandedSections.faculties ? (
                <ChevronDown className="h-4 w-4 text-foreground/60" />
              ) : (
                <ChevronRight className="h-4 w-4 text-foreground/60" />
              )}
            </button>
            {expandedSections.faculties && (
              <div className="ml-6 mt-1 space-y-1">
                {faculties.map((faculty) => (
                  <Link
                    key={faculty.id}
                    href={`/communities/${faculty.id}`}
                    className="flex items-center p-2 text-sm hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    <span className="truncate">{faculty.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Departments */}
          <div className="mb-2">
            <button
              className="flex items-center justify-between w-full p-2 text-sm font-medium hover:bg-foreground/5 rounded-lg transition-colors"
              onClick={() => toggleSection("departments")}
            >
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-green-500 mr-2" />
                <span>Departments</span>
              </div>
              {expandedSections.departments ? (
                <ChevronDown className="h-4 w-4 text-foreground/60" />
              ) : (
                <ChevronRight className="h-4 w-4 text-foreground/60" />
              )}
            </button>
            {expandedSections.departments && (
              <div className="ml-6 mt-1 space-y-1">
                {departments.map((department) => (
                  <Link
                    key={department.id}
                    href={`/communities/${department.id}`}
                    className="flex items-center p-2 text-sm hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    <span className="truncate">{department.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Levels */}
          <div className="mb-2">
            <button
              className="flex items-center justify-between w-full p-2 text-sm font-medium hover:bg-foreground/5 rounded-lg transition-colors"
              onClick={() => toggleSection("levels")}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 text-yellow-500 mr-2" />
                <span>Levels</span>
              </div>
              {expandedSections.levels ? (
                <ChevronDown className="h-4 w-4 text-foreground/60" />
              ) : (
                <ChevronRight className="h-4 w-4 text-foreground/60" />
              )}
            </button>
            {expandedSections.levels && (
              <div className="ml-6 mt-1 space-y-1">
                {levels.map((level) => (
                  <Link
                    key={level.id}
                    href={`/communities/${level.id}`}
                    className="flex items-center p-2 text-sm hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    <span className="truncate">{level.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-foreground/10">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/communities/browse">Browse All Communities</Link>
        </Button>
      </div>
    </div>
  )
}
