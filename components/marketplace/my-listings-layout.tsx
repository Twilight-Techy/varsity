"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { marketplaceItems } from "@/lib/data/marketplace-items"
import ItemGrid from "@/components/marketplace/item-grid"

export default function MyListingsLayout() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")

  // In a real app, these would be filtered based on the current user
  const activeItems = marketplaceItems.filter((item) => !item.isSold).slice(0, 4)
  const soldItems = marketplaceItems.filter((item) => item.isSold).slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">My Listings</h1>

          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/marketplace/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Listing
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="active">Active ({activeItems.length})</TabsTrigger>
            <TabsTrigger value="sold">Sold ({soldItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="pt-4">
            {activeItems.length > 0 ? (
              <ItemGrid items={activeItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">No active listings</h3>
                <p className="text-muted-foreground mb-4">You don't have any active listings yet.</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/marketplace/create">Create Your First Listing</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sold" className="pt-4">
            {soldItems.length > 0 ? (
              <ItemGrid items={soldItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">No sold items</h3>
                <p className="text-muted-foreground mb-4">You haven't sold any items yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
