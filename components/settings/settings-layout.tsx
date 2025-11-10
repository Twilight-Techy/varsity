"use client"

import { useState } from "react"
import { SettingsSidebar } from "./settings-sidebar"
import { AccountSettings } from "./sections/account-settings"
import { NotificationSettings } from "./sections/notification-settings"
import { PrivacySettings } from "./sections/privacy-settings"
import { AppearanceSettings } from "./sections/appearance-settings"
import { AcademicSettings } from "./sections/academic-settings"
import { SecuritySettings } from "./sections/security-settings"

type SettingsSection = "account" | "notifications" | "privacy" | "appearance" | "academic" | "security"

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account")

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="flex-1">
          {activeSection === "account" && <AccountSettings />}
          {activeSection === "notifications" && <NotificationSettings />}
          {activeSection === "privacy" && <PrivacySettings />}
          {activeSection === "appearance" && <AppearanceSettings />}
          {activeSection === "academic" && <AcademicSettings />}
          {activeSection === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}
