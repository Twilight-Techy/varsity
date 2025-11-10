"use server"

import { revalidatePath } from "next/cache"
import {
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  getItemsBySeller,
  toggleBookmark,
  markItemAsSold,
} from "@/lib/data/marketplace-items"
import type { MarketplaceItem } from "@/lib/types"

// Create a new marketplace item
export async function createListing(itemData: Omit<MarketplaceItem, "id" | "listedDate">) {
  try {
    // In a real app, we would validate the user is authenticated here
    const userId = "user1" // Mock user ID, in a real app this would come from the session

    // Ensure the seller ID is set to the current user
    const newItem = createMarketplaceItem({
      ...itemData,
      seller: {
        id: userId,
        name: "Your Name", // In a real app, this would be the user's name
        avatar: "/placeholder.svg?height=40&width=40", // In a real app, this would be the user's avatar
        rating: 5.0, // New sellers start with a perfect rating
        joinedDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
      },
    })

    revalidatePath("/marketplace")
    revalidatePath("/marketplace/my-listings")

    return { success: true, item: newItem }
  } catch (error) {
    console.error("Error creating listing:", error)
    return { success: false, message: "An error occurred while creating the listing" }
  }
}

// Update an existing marketplace item
export async function updateListing(id: string, itemData: Partial<MarketplaceItem>) {
  try {
    // In a real app, we would validate the user is authenticated and owns the item
    const updatedItem = updateMarketplaceItem(id, itemData)

    if (!updatedItem) {
      return { success: false, message: "Item not found" }
    }

    revalidatePath(`/marketplace/${id}`)
    revalidatePath("/marketplace")
    revalidatePath("/marketplace/my-listings")

    return { success: true, item: updatedItem }
  } catch (error) {
    console.error("Error updating listing:", error)
    return { success: false, message: "An error occurred while updating the listing" }
  }
}

// Delete a marketplace item
export async function deleteListing(id: string) {
  try {
    // In a real app, we would validate the user is authenticated and owns the item
    const success = deleteMarketplaceItem(id)

    if (!success) {
      return { success: false, message: "Item not found" }
    }

    revalidatePath("/marketplace")
    revalidatePath("/marketplace/my-listings")

    return { success: true, message: "Listing deleted successfully" }
  } catch (error) {
    console.error("Error deleting listing:", error)
    return { success: false, message: "An error occurred while deleting the listing" }
  }
}

// Get listings created by the current user
export async function getCurrentUserListings() {
  try {
    // In a real app, we would get the user ID from the session
    const userId = "user1" // Mock user ID

    const userListings = getItemsBySeller(userId)
    return userListings
  } catch (error) {
    console.error("Error fetching user listings:", error)
    return []
  }
}

// Toggle bookmark status for an item
export async function toggleBookmarkItem(id: string) {
  try {
    const updatedItem = toggleBookmark(id)

    if (!updatedItem) {
      return { success: false, message: "Item not found" }
    }

    revalidatePath(`/marketplace/${id}`)
    revalidatePath("/marketplace")

    return {
      success: true,
      isBookmarked: updatedItem.isBookmarked,
      message: updatedItem.isBookmarked ? "Item bookmarked" : "Bookmark removed",
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error)
    return { success: false, message: "An error occurred while updating bookmark status" }
  }
}

// Mark an item as sold
export async function markItemSold(id: string) {
  try {
    // In a real app, we would validate the user is authenticated and owns the item
    const updatedItem = markItemAsSold(id)

    if (!updatedItem) {
      return { success: false, message: "Item not found" }
    }

    revalidatePath(`/marketplace/${id}`)
    revalidatePath("/marketplace")
    revalidatePath("/marketplace/my-listings")

    return { success: true, message: "Item marked as sold" }
  } catch (error) {
    console.error("Error marking item as sold:", error)
    return { success: false, message: "An error occurred while updating the item" }
  }
}
