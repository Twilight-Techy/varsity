import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface UserCardProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    university: string
    department: string
    year: string
    bio: string
    isConnected: boolean
  }
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex flex-col sm:flex-row gap-4 hover:border-blue-500/50 transition-colors">
      <Link href={`/profile/${user.username}`} className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
      </Link>

      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <Link href={`/profile/${user.username}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{user.name}</h3>
          </Link>

          <Button
            variant={user.isConnected ? "outline" : "default"}
            size="sm"
            className={
              user.isConnected
                ? ""
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }
          >
            <UserPlus className="h-4 w-4 mr-1" />
            {user.isConnected ? "Connected" : "Connect"}
          </Button>
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          @{user.username} • {user.university} • {user.department} • {user.year}
        </div>

        <p className="mt-2 text-sm line-clamp-2">{user.bio}</p>
      </div>
    </div>
  )
}

export default UserCard
