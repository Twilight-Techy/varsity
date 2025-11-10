import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, PlusCircle } from "lucide-react"
import { getCurrentUserListings } from "@/lib/actions/marketplace-actions"
import MyListingsTable from "@/components/marketplace/my-listings-table"

export const metadata = {
  title: "My Listings | Varsity",
  description: "Manage your marketplace listings and track your sales.",
}

export default async function MyListingsPage() {
  const listings = await getCurrentUserListings()

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground mt-1">Manage your marketplace listings and track your sales</p>
        </div>
        <Button asChild>
          <Link href="/marketplace/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Listing
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ListingsLoading />}>
        {listings.length > 0 ? <MyListingsTable listings={listings} /> : <EmptyState />}
      </Suspense>
    </div>
  )
}

function ListingsLoading() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>No listings yet</CardTitle>
        <CardDescription>Create your first listing to start selling items on the marketplace.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild>
          <Link href="/marketplace/create">Create Listing</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
