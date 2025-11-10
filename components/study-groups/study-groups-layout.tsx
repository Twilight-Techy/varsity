"use client"

import type React from "react"

import { useState } from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { PanelLeftIcon, PanelLeftCloseIcon, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { courses } from "@/lib/data/courses"
import VerificationBanner from "@/components/verification/verification-banner"

interface StudyGroupsLayoutProps {
  children: React.ReactNode
}

export default function StudyGroupsLayout({ children }: StudyGroupsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const isVerified = false // In a real app, this would come from auth state

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      {!isVerified && <VerificationBanner />}
      <div className="flex flex-1 pt-16">
        {/* Mobile sidebar toggle */}
        <div className="fixed bottom-4 left-4 z-20 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg border-foreground/10 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftCloseIcon className="h-5 w-5" /> : <PanelLeftIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-10 w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-72 md:flex-shrink-0 pt-16 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full bg-background border-r border-foreground/10 flex flex-col">
            <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Study Groups</h2>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
                <PanelLeftCloseIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                asChild
              >
                <Link href="/study-groups/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Study Group
                </Link>
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="course-filter">Filter by Course</Label>
                  <Select>
                    <SelectTrigger id="course-filter">
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.code}: {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting-type">Meeting Type</Label>
                  <Select>
                    <SelectTrigger id="meeting-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Group Status</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="open-groups" defaultChecked />
                      <label
                        htmlFor="open-groups"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Open Groups
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="my-groups" defaultChecked />
                      <label
                        htmlFor="my-groups"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        My Groups
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="full-groups" />
                      <label
                        htmlFor="full-groups"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Full Groups
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Popular Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">
                      #finals
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #programming
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #algorithms
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #database
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #calculus
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 md:p-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Study Groups</h1>
                <p className="text-foreground/70">Connect and study with your peers</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                  <Input
                    placeholder="Search study groups..."
                    className="pl-9 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {filtersOpen && (
              <div className="md:hidden mb-6 p-4 border border-foreground/10 rounded-lg bg-foreground/5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-course-filter">Course</Label>
                    <Select>
                      <SelectTrigger id="mobile-course-filter">
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.code}: {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile-meeting-type">Meeting Type</Label>
                    <Select>
                      <SelectTrigger id="mobile-meeting-type">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">
                      My Groups
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Open Groups
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #finals
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      #programming
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All Groups</TabsTrigger>
                <TabsTrigger value="my-groups">My Groups</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {children}
              </TabsContent>

              <TabsContent value="my-groups" className="mt-0">
                {children}
              </TabsContent>

              <TabsContent value="recommended" className="mt-0">
                {children}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
