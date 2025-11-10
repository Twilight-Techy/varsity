"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Award, Calendar, Plus, Pencil, Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  education: {
    institution: string
    degree: string
    startYear: number
    endYear: number | null
    current: boolean
  }[]
  achievements: {
    title: string
    year: number
    description: string
  }[]
  isCurrentUser: boolean
  [key: string]: any
}

interface AcademicTabProps {
  user: User
  isEditing: boolean
}

export default function AcademicTab({ user, isEditing }: AcademicTabProps) {
  const [education, setEducation] = useState(user.education || [])
  const [achievements, setAchievements] = useState(user.achievements || [])
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear() + 4,
    current: false,
  })
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    year: new Date().getFullYear(),
    description: "",
  })
  const [addingEducation, setAddingEducation] = useState(false)
  const [addingAchievement, setAddingAchievement] = useState(false)
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)
  const [editingAchievementIndex, setEditingAchievementIndex] = useState<number | null>(null)

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setEducation([...education, newEducation])
      setNewEducation({
        institution: "",
        degree: "",
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 4,
        current: false,
      })
      setAddingEducation(false)
    }
  }

  const handleUpdateEducation = (index: number) => {
    const updatedEducation = [...education]
    updatedEducation[index] = newEducation
    setEducation(updatedEducation)
    setEditingEducationIndex(null)
    setNewEducation({
      institution: "",
      degree: "",
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear() + 4,
      current: false,
    })
  }

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleEditEducation = (index: number) => {
    setNewEducation(education[index])
    setEditingEducationIndex(index)
  }

  const handleAddAchievement = () => {
    if (newAchievement.title) {
      setAchievements([...achievements, newAchievement])
      setNewAchievement({
        title: "",
        year: new Date().getFullYear(),
        description: "",
      })
      setAddingAchievement(false)
    }
  }

  const handleUpdateAchievement = (index: number) => {
    const updatedAchievements = [...achievements]
    updatedAchievements[index] = newAchievement
    setAchievements(updatedAchievements)
    setEditingAchievementIndex(null)
    setNewAchievement({
      title: "",
      year: new Date().getFullYear(),
      description: "",
    })
  }

  const handleRemoveAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const handleEditAchievement = (index: number) => {
    setNewAchievement(achievements[index])
    setEditingAchievementIndex(index)
  }

  return (
    <div className="space-y-8">
      {/* Education */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          {isEditing && !addingEducation && editingEducationIndex === null && (
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setAddingEducation(true)}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          )}
        </div>

        {/* Add/Edit Education Form */}
        {isEditing && (addingEducation || editingEducationIndex !== null) && (
          <div className="bg-foreground/5 rounded-lg p-4 mb-4 border border-foreground/10">
            <h4 className="font-medium mb-3">{editingEducationIndex !== null ? "Edit Education" : "Add Education"}</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-foreground/70 mb-1 block">Institution</label>
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="University or school name"
                />
              </div>
              <div>
                <label className="text-sm text-foreground/70 mb-1 block">Degree/Certificate</label>
                <Input
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Degree or certificate earned"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-foreground/70 mb-1 block">Start Year</label>
                  <Select
                    value={newEducation.startYear.toString()}
                    onValueChange={(value) => setNewEducation({ ...newEducation, startYear: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Start year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-foreground/70 mb-1 block">End Year</label>
                  <Select
                    value={newEducation.endYear?.toString() || ""}
                    onValueChange={(value) => setNewEducation({ ...newEducation, endYear: Number.parseInt(value) })}
                    disabled={newEducation.current}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="End year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="current-education"
                  checked={newEducation.current}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      current: e.target.checked,
                      endYear: e.target.checked ? null : new Date().getFullYear() + 4,
                    })
                  }
                  className="rounded border-foreground/20"
                />
                <label htmlFor="current-education" className="text-sm">
                  I currently study here
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAddingEducation(false)
                    setEditingEducationIndex(null)
                    setNewEducation({
                      institution: "",
                      degree: "",
                      startYear: new Date().getFullYear(),
                      endYear: new Date().getFullYear() + 4,
                      current: false,
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    if (editingEducationIndex !== null) {
                      handleUpdateEducation(editingEducationIndex)
                    } else {
                      handleAddEducation()
                    }
                  }}
                >
                  {editingEducationIndex !== null ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Education List */}
        <div className="space-y-4">
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-foreground/10"
              >
                <GraduationCap className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{edu.institution}</h4>
                  <p className="text-sm">{edu.degree}</p>
                  <p className="text-sm text-foreground/70">
                    {edu.startYear} - {edu.current ? "Present" : edu.endYear}
                  </p>
                </div>
                {isEditing && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/70 hover:text-blue-500"
                      onClick={() => handleEditEducation(index)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/70 hover:text-red-500"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-foreground/70">No education information added yet.</div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          {isEditing && !addingAchievement && editingAchievementIndex === null && (
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setAddingAchievement(true)}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          )}
        </div>

        {/* Add/Edit Achievement Form */}
        {isEditing && (addingAchievement || editingAchievementIndex !== null) && (
          <div className="bg-foreground/5 rounded-lg p-4 mb-4 border border-foreground/10">
            <h4 className="font-medium mb-3">
              {editingAchievementIndex !== null ? "Edit Achievement" : "Add Achievement"}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-foreground/70 mb-1 block">Title</label>
                <Input
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  placeholder="Achievement title"
                />
              </div>
              <div>
                <label className="text-sm text-foreground/70 mb-1 block">Year</label>
                <Select
                  value={newAchievement.year.toString()}
                  onValueChange={(value) => setNewAchievement({ ...newAchievement, year: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-foreground/70 mb-1 block">Description</label>
                <Input
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  placeholder="Brief description"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAddingAchievement(false)
                    setEditingAchievementIndex(null)
                    setNewAchievement({
                      title: "",
                      year: new Date().getFullYear(),
                      description: "",
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    if (editingAchievementIndex !== null) {
                      handleUpdateAchievement(editingAchievementIndex)
                    } else {
                      handleAddAchievement()
                    }
                  }}
                >
                  {editingAchievementIndex !== null ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Achievements List */}
        <div className="space-y-4">
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-foreground/10"
              >
                <Award className="h-5 w-5 text-purple-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <span className="text-sm text-foreground/70">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {achievement.year}
                    </span>
                  </div>
                  {achievement.description && (
                    <p className="text-sm text-foreground/70 mt-1">{achievement.description}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/70 hover:text-blue-500"
                      onClick={() => handleEditAchievement(index)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/70 hover:text-red-500"
                      onClick={() => handleRemoveAchievement(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-foreground/70">No achievements added yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
