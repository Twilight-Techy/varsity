import CreateListingForm from "@/components/marketplace/create-listing-form"

export default function CreateListingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>
      <CreateListingForm />
    </div>
  )
}
