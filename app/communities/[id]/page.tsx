import { notFound } from "next/navigation"
import CommunityDetail from "@/components/communities/community-detail"
import { communities } from "@/lib/data/communities"

export default function CommunityPage({ params }: { params: { id: string } }) {
  const community = communities.find((c) => c.id === params.id)

  if (!community) {
    notFound()
  }

  return <CommunityDetail community={community} />
}
