import { notFound } from "next/navigation"
import ProfileLayout from "@/components/profile/profile-layout"

// In a real app, this would fetch user data from an API or database
export default function UserProfilePage({ params }: { params: { username: string } }) {
  // For demo purposes, we'll just render the profile layout
  // In a real app, we would fetch the user data based on the username
  // and pass it to the ProfileLayout component

  // If user not found, show 404
  if (params.username === "nonexistent") {
    notFound()
  }

  return <ProfileLayout />
}
