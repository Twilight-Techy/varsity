import { notFound } from "next/navigation"
import StudyGroupDetail from "@/components/study-groups/study-group-detail"
import { studyGroups } from "@/lib/data/study-groups"

export default function StudyGroupPage({ params }: { params: { id: string } }) {
  const studyGroup = studyGroups.find((sg) => sg.id === params.id)

  if (!studyGroup) {
    notFound()
  }

  return <StudyGroupDetail studyGroup={studyGroup} />
}
