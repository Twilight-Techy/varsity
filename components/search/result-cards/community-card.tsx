import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface CommunityCardProps {
  community: {
    id: string
    name: string
    slug: string
    description: string
    memberCount: number
    category: string
    isMember: boolean
    image: string
  }
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex flex-col sm:flex-row gap-4 hover:border-blue-500/50 transition-colors">
      <Link href={`/communities/${community.slug}`} className="flex-shrink-0">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
          {community.image ? (
            <img
              src={community.image || "/placeholder.svg"}
              alt={community.name}
              className="w-full h-full object-cover"
            />
          ) : (
            community.name.charAt(0)
          )}
        </div>
      </Link>

      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <Link href={`/communities/${community.slug}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{community.name}</h3>
          </Link>

          <Button
            variant={community.isMember ? "outline" : "default"}
            size="sm"
            className={
              community.isMember
                ? ""
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }
          >
            <Users className="h-4 w-4 mr-1" />
            {community.isMember ? "Joined" : "Join"}
          </Button>
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          {community.memberCount} members • {community.category}
        </div>

        <p className="mt-2 text-sm line-clamp-2">{community.description}</p>
      </div>
    </div>
  )
}
