import DashboardNav from "@/components/dashboard/dashboard-nav"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileTabs from "@/components/profile/profile-tabs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-6 pt-20">
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </div>
  )
}
