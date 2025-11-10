"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileTabs from "@/components/profile/profile-tabs"
import { Button } from "@/components/ui/button"
import { Cog, Share2 } from "lucide-react"
import Link from "next/link"

// Mock user data - in a real app, this would come from an API or database
const userData = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatar: null,
  coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
  bio: "Computer Science student at University of Lagos. Passionate about web development, AI, and solving real-world problems through technology.",
  university: "University of Lagos",
  faculty: "Faculty of Engineering",
  department: "Computer Science",
  level: "300 Level",
  joinedDate: "September 2022",
  location: "Lagos, Nigeria",
  email: "john.doe@example.com",
  phone: "+234 800 123 4567",
  website: "https://johndoe.dev",
  connections: 156,
  posts: 24,
  isCurrentUser: true,
  skills: ["JavaScript", "React", "Node.js", "Python", "Data Structures", "Algorithms", "Database Systems"],
  interests: [
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Open Source",
    "Competitive Programming",
  ],
  education: [
    {
      institution: "University of Lagos",
      degree: "B.Sc. Computer Science",
      startYear: 2021,
      endYear: 2025,
      current: true,
    },
    {
      institution: "Lagos State Model College",
      degree: "Secondary School Certificate",
      startYear: 2015,
      endYear: 2021,
      current: false,
    },
  ],
  achievements: [
    {
      title: "Dean's List",
      year: 2022,
      description: "Recognized for outstanding academic performance",
    },
    {
      title: "Hackathon Winner",
      year: 2023,
      description: "First place in the University Tech Innovation Challenge",
    },
  ],
}

export default function ProfileLayout() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      <div className="flex-1 pt-16">
        <ProfileHeader user={userData} isEditing={isEditing} setIsEditing={setIsEditing} />

        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div></div> {/* Spacer for flex alignment */}
            {userData.isCurrentUser && !isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="/settings">
                    <Cog className="h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share Profile</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>

          <ProfileTabs user={userData} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
      </div>
    </div>
  )
}
