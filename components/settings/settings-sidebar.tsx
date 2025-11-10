"use client"

import { Bell, BookOpen, Eye, Lock, Palette, User } from "lucide-react"
import { Button } from "@/components/ui/button"

type SettingsSection = "account" | "notifications" | "privacy" | "appearance" | "academic" | "security"

interface SettingsSidebarProps {
  activeSection: SettingsSection
  setActiveSection: (section: SettingsSection) => void
}

export function SettingsSidebar({ activeSection, setActiveSection }: SettingsSidebarProps) {
  const sections = [
    { id: "account" as const, label: "Account", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "privacy" as const, label: "Privacy", icon: Eye },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "academic" as const, label: "Academic", icon: BookOpen },
    { id: "security" as const, label: "Security", icon: Lock },
  ]

  return (
    <div className="w-full md:w-64 mb-6 md:mb-0">
      <div className="bg-card rounded-lg border border-border p-1 sticky top-24">
        <nav className="flex flex-col gap-1">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className={`justify-start gap-3 h-12 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white hover:from-blue-600 hover:to-purple-600"
                  : ""
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon className="h-5 w-5" />
              <span>{section.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
