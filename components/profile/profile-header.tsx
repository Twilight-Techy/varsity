"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Check, Edit, MapPin, School, User, X } from "lucide-react"

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [name, setName] = useState("John Doe")
  const [username, setUsername] = useState("johndoe")
  const [bio, setBio] = useState(
    "Computer Science student at Stanford University. Passionate about AI, machine learning, and software development.",
  )
  const [university, setUniversity] = useState("Stanford University")
  const [faculty, setFaculty] = useState("School of Engineering")
  const [department, setDepartment] = useState("Computer Science")
  const [level, setLevel] = useState("Junior")
  const [location, setLocation] = useState("Palo Alto, CA")

  const handleSaveChanges = () => {
    // In a real app, this would save changes to the backend
    setIsEditing(false)
  }

  const handleCancelChanges = () => {
    // Reset any unsaved changes
    setIsEditing(false)
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-foreground/10 shadow-lg">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 overflow-hidden">
        {coverImage ? (
          <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40">
            <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          </div>
        )}

        {isEditing && (
          <label className="absolute bottom-4 right-4 cursor-pointer">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg border border-foreground/10 shadow-lg hover:bg-background/90 transition-colors">
              <Camera className="h-4 w-4" />
              <span className="text-sm font-medium">Change Cover</span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverImageChange} />
          </label>
        )}
      </div>

      <div className="px-4 md:px-8 pb-6 pt-16 relative">
        {/* Profile Image */}
        <div className="absolute -top-16 left-6 md:left-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              {profileImage ? (
                <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
              ) : (
                <>
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl">
                    {name.charAt(0)}
                  </AvatarFallback>
                </>
              )}
            </Avatar>

            {isEditing && (
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <div className="flex items-center justify-center w-8 h-8 bg-background rounded-full border border-foreground/10 shadow-lg hover:bg-foreground/5 transition-colors">
                  <Camera className="h-4 w-4" />
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
              </label>
            )}
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleCancelChanges}>
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button
                size="sm"
                className="gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleSaveChanges}
              >
                <Check className="h-4 w-4" /> Save
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-4 space-y-4">
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl font-bold"
                  placeholder="Your name"
                />
                <div className="flex items-center">
                  <span className="text-foreground/50 mr-1">@</span>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-sm"
                    placeholder="username"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-foreground/70">@{username}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio about yourself"
                className="min-h-[80px]"
              />
            ) : (
              <p className="text-sm">{bio}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-blue-500" />
                  <Input
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-500" />
                  <Input
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Faculty"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-green-500" />
                  <Input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Department"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-yellow-500" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="text-sm"
                  />
                </div>
              </div>
            ) : (
              <>
                <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
                  {university}
                </Badge>
                <Badge variant="outline" className="bg-purple-600/10 text-purple-500 border-purple-500/20">
                  {faculty}
                </Badge>
                <Badge variant="outline" className="bg-green-600/10 text-green-500 border-green-500/20">
                  {department}
                </Badge>
                <Badge variant="outline" className="bg-yellow-600/10 text-yellow-500 border-yellow-500/20">
                  {level}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-red-600/10 text-red-500 border-red-500/20 flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" /> {location}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
