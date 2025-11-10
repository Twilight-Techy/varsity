"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone, Globe, Plus, X } from "lucide-react"

interface User {
  id: string
  name: string
  username: string
  avatar: string | null
  coverImage: string | null
  bio: string
  university: string
  faculty: string
  department: string
  level: string
  joinedDate: string
  location: string
  email: string
  phone: string
  website: string
  isCurrentUser: boolean
  skills: string[]
  interests: string[]
  [key: string]: any
}

interface AboutTabProps {
  user: User
  isEditing: boolean
}

export default function AboutTab({ user, isEditing }: AboutTabProps) {
  const [skills, setSkills] = useState<string[]>(user.skills || [])
  const [interests, setInterests] = useState<string[]>(user.interests || [])
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [contactInfo, setContactInfo] = useState({
    email: user.email || "",
    phone: user.phone || "",
    website: user.website || "",
    location: user.location || "",
  })

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleContactChange = (field: string, value: string) => {
    setContactInfo({
      ...contactInfo,
      [field]: value,
    })
  }

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Email</label>
                <Input
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  placeholder="Email address"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-foreground/70">{user.email}</p>
                </div>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Phone</label>
                <Input
                  value={contactInfo.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  placeholder="Phone number"
                />
              </div>
            ) : (
              user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-foreground/70">{user.phone}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Website</label>
                <Input
                  value={contactInfo.website}
                  onChange={(e) => handleContactChange("website", e.target.value)}
                  placeholder="Personal website"
                />
              </div>
            ) : (
              user.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )
            )}

            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Location</label>
                <Input
                  value={contactInfo.location}
                  onChange={(e) => handleContactChange("location", e.target.value)}
                  placeholder="Your location"
                />
              </div>
            ) : (
              user.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-foreground/70">{user.location}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-3 mt-3">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Joined</p>
              <p className="text-sm text-foreground/70">{user.joinedDate}</p>
            </div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20 gap-1">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button
                onClick={handleAddSkill}
                className="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Interests</h3>
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="bg-purple-600/10 text-purple-500 border-purple-500/20 gap-1"
                >
                  {interest}
                  <button onClick={() => handleRemoveInterest(interest)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
              />
              <Button
                onClick={handleAddInterest}
                className="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="outline" className="bg-purple-600/10 text-purple-500 border-purple-500/20">
                {interest}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
