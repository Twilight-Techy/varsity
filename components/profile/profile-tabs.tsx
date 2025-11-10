"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AboutTab from "./tabs/about-tab"
import ActivityTab from "./tabs/activity-tab"
import ConnectionsTab from "./tabs/connections-tab"
import AcademicTab from "./tabs/academic-tab"
import { Button } from "@/components/ui/button"
import { Edit, Save, X } from "lucide-react"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("about")
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const user = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatar: null,
    coverImage: null,
    bio: "Computer Science student at Stanford University. Passionate about AI, machine learning, and software development.",
    university: "Stanford University",
    faculty: "School of Engineering",
    department: "Computer Science",
    level: "Junior",
    joinedDate: "September 2021",
    location: "Palo Alto, CA",
    email: "john.doe@stanford.edu",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    isCurrentUser: true,
    skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
    interests: ["Artificial Intelligence", "Web Development", "Data Science", "Open Source"],
    education: [
      {
        institution: "Stanford University",
        degree: "Bachelor of Science in Computer Science",
        startYear: 2021,
        endYear: 2025,
        current: true,
      },
    ],
    achievements: [
      {
        title: "Dean's List",
        year: 2022,
        description: "Recognized for academic excellence",
      },
      {
        title: "Hackathon Winner",
        year: 2023,
        description: "First place at Stanford AI Hackathon",
      },
    ],
  }

  const handleSaveChanges = () => {
    // In a real app, this would save changes to the backend
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
    >
      <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-foreground/10">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger
              value="about"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="connections"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
            >
              Connections
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
            >
              Academic
            </TabsTrigger>
          </TabsList>

          {user.isCurrentUser && (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleSaveChanges}
                  >
                    <Save className="h-4 w-4" /> Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" /> Edit
                </Button>
              )}
            </div>
          )}
        </div>

        <TabsContent value="about" className="p-6">
          <AboutTab user={user} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="activity" className="p-6">
          <ActivityTab user={user} />
        </TabsContent>

        <TabsContent value="connections" className="p-6">
          <ConnectionsTab user={user} />
        </TabsContent>

        <TabsContent value="academic" className="p-6">
          <AcademicTab user={user} isEditing={isEditing} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
