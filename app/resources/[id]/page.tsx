import { notFound } from "next/navigation"
import ResourceDetail from "@/components/resources/resource-detail"
import ResourcesLayout from "@/components/resources/resources-layout"
import { resources } from "@/lib/data/resources"

export default function ResourceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const resource = resources.find((r) => r.id === params.id)

  if (!resource) {
    notFound()
  }

  return (
    <ResourcesLayout>
      <ResourceDetail resource={resource} />
    </ResourcesLayout>
  )
}
