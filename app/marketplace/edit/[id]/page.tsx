import { notFound } from "next/navigation"
import { getItemById } from "@/lib/data/marketplace-items"
import EditListingForm from "@/components/marketplace/edit-listing-form"

export const metadata = {
  title: "Edit Listing | Varsity",
  description: "Edit your marketplace listing details and settings.",
}

interface EditListingPageProps {
  params: {
    id: string
  }
}

export default function EditListingPage({ params }: EditListingPageProps) {
  const item = getItemById(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Listing</h1>
        <p className="text-muted-foreground mt-2">Update your marketplace listing details and settings.</p>
      </div>
      <EditListingForm item={item} />
    </div>
  )
}
