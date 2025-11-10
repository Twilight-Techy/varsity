import ResourcesLayout from "@/components/resources/resources-layout"
import ResourceGrid from "@/components/resources/resource-grid"
import { resources } from "@/lib/data/resources"

export default function ResourcesPage() {
  return (
    <ResourcesLayout>
      <ResourceGrid resources={resources} />
    </ResourcesLayout>
  )
}
