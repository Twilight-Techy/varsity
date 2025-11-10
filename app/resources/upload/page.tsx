import ResourcesLayout from "@/components/resources/resources-layout"
import UploadResourceForm from "@/components/resources/upload-resource-form"

export default function UploadResourcePage() {
  return (
    <ResourcesLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upload Resource</h1>
        <UploadResourceForm />
      </div>
    </ResourcesLayout>
  )
}
