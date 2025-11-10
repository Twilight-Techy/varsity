import type { MarketplaceItem, MarketplaceCategory } from "../types"

// Categories for marketplace items
export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: "textbooks",
    name: "Textbooks",
    icon: "book-open",
    count: 124,
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "laptop",
    count: 87,
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "armchair",
    count: 56,
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: "shirt",
    count: 43,
  },
  {
    id: "stationery",
    name: "Stationery",
    icon: "pen-tool",
    count: 38,
  },
  {
    id: "services",
    name: "Services",
    icon: "briefcase",
    count: 29,
  },
  {
    id: "housing",
    name: "Housing",
    icon: "home",
    count: 22,
  },
  {
    id: "other",
    name: "Other",
    icon: "more-horizontal",
    count: 31,
  },
]

// Sample marketplace items
let marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Calculus: Early Transcendentals (8th Edition)",
    description: "Excellent condition, barely used. All pages intact with no highlights or notes.",
    price: 45.99,
    originalPrice: 89.99,
    category: "textbooks",
    condition: "Like New",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      joinedDate: "2022-09-15",
    },
    listedDate: "2023-08-15T14:30:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: true,
    isBookmarked: false,
    course: "MATH 101",
    isbn: "978-1234567890",
  },
  {
    id: "2",
    title: "MacBook Pro 2021 (13-inch, M1, 16GB RAM, 512GB)",
    description: "Used for one semester. In perfect working condition with charger and original box.",
    price: 1299.99,
    originalPrice: 1799.99,
    category: "electronics",
    condition: "Excellent",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Off Campus (2 miles)",
    seller: {
      id: "user2",
      name: "Samantha Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      joinedDate: "2021-11-03",
    },
    listedDate: "2023-08-10T09:15:00Z",
    isNegotiable: false,
    isSold: false,
    isFeatured: true,
    isBookmarked: true,
    warranty: "AppleCare+ until November 2023",
  },
  {
    id: "3",
    title: "Desk Lamp with Wireless Charging",
    description: "Adjustable LED desk lamp with built-in wireless charger. Perfect for late-night studying.",
    price: 29.99,
    originalPrice: 49.99,
    category: "electronics",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user3",
      name: "Marcus Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      joinedDate: "2022-01-20",
    },
    listedDate: "2023-08-05T16:45:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "4",
    title: "Ergonomic Desk Chair",
    description: "Comfortable desk chair with lumbar support. Used for one year but still in great condition.",
    price: 75.0,
    originalPrice: 150.0,
    category: "furniture",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Off Campus (1 mile)",
    seller: {
      id: "user4",
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      joinedDate: "2022-05-12",
    },
    listedDate: "2023-07-28T11:20:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "5",
    title: "Introduction to Psychology Textbook",
    description: "Psychology 101 textbook. Some highlighting but otherwise in good condition.",
    price: 30.0,
    originalPrice: 75.0,
    category: "textbooks",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user5",
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      joinedDate: "2022-08-30",
    },
    listedDate: "2023-07-25T13:10:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: false,
    isBookmarked: true,
    course: "PSYC 101",
    isbn: "978-0987654321",
  },
  {
    id: "6",
    title: "Scientific Calculator (TI-84 Plus)",
    description: "Graphing calculator required for most math and science courses. Works perfectly.",
    price: 65.0,
    originalPrice: 120.0,
    category: "electronics",
    condition: "Excellent",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user6",
      name: "Riley Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      joinedDate: "2021-09-05",
    },
    listedDate: "2023-07-20T10:30:00Z",
    isNegotiable: false,
    isSold: false,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "7",
    title: "Dorm Room Mini Fridge",
    description: "Compact refrigerator, perfect for dorm rooms. 3.2 cubic feet with freezer compartment.",
    price: 85.0,
    originalPrice: 129.99,
    category: "furniture",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user7",
      name: "Casey Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      joinedDate: "2022-02-15",
    },
    listedDate: "2023-07-18T15:45:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: true,
    isBookmarked: false,
  },
  {
    id: "8",
    title: "Organic Chemistry Study Guide",
    description: "Comprehensive study guide with practice problems and solutions. Helped me ace the course!",
    price: 20.0,
    originalPrice: 35.0,
    category: "textbooks",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Off Campus (3 miles)",
    seller: {
      id: "user8",
      name: "Jamie Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      joinedDate: "2022-03-10",
    },
    listedDate: "2023-07-15T09:20:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: false,
    isBookmarked: false,
    course: "CHEM 301",
  },
  {
    id: "9",
    title: "Tutoring Services - Computer Science",
    description: "Offering tutoring for intro to programming, data structures, and algorithms. $25/hour.",
    price: 25.0,
    category: "services",
    condition: "N/A",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Online or On Campus",
    seller: {
      id: "user9",
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      joinedDate: "2021-10-12",
    },
    listedDate: "2023-07-12T14:00:00Z",
    isNegotiable: false,
    isSold: false,
    isFeatured: true,
    isBookmarked: false,
  },
  {
    id: "10",
    title: "Apartment Sublet - Summer 2023",
    description:
      "1 bedroom in a 3-bedroom apartment available for summer sublet (May-August). Fully furnished, utilities included.",
    price: 650.0,
    category: "housing",
    condition: "N/A",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Off Campus (0.5 miles)",
    seller: {
      id: "user10",
      name: "Jordan Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      joinedDate: "2022-01-05",
    },
    listedDate: "2023-07-10T11:30:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: true,
    isBookmarked: false,
  },
  {
    id: "11",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Sony WH-1000XM4 headphones. Great for studying in noisy environments. Includes case and all accessories.",
    price: 199.99,
    originalPrice: 349.99,
    category: "electronics",
    condition: "Like New",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "On Campus",
    seller: {
      id: "user11",
      name: "Morgan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      joinedDate: "2022-04-18",
    },
    listedDate: "2023-07-08T16:15:00Z",
    isNegotiable: false,
    isSold: false,
    isFeatured: false,
    isBookmarked: true,
  },
  {
    id: "12",
    title: "Bicycle - Trek FX 2",
    description: "Hybrid bike, perfect for commuting to campus. Includes lock and helmet.",
    price: 350.0,
    originalPrice: 599.99,
    category: "other",
    condition: "Good",
    images: ["/placeholder.svg?height=300&width=300"],
    location: "Off Campus (1 mile)",
    seller: {
      id: "user12",
      name: "Sam Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      joinedDate: "2021-12-10",
    },
    listedDate: "2023-07-05T10:00:00Z",
    isNegotiable: true,
    isSold: false,
    isFeatured: false,
    isBookmarked: false,
  },
]

// Function to get items by category
export function getItemsByCategory(categoryId: string): MarketplaceItem[] {
  if (categoryId === "all") {
    return marketplaceItems
  }
  return marketplaceItems.filter((item) => item.category === categoryId)
}

// Function to get featured items
export function getFeaturedItems(): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.isFeatured)
}

// Function to get bookmarked items
export function getBookmarkedItems(): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.isBookmarked)
}

// Function to get item by id
export function getItemById(id: string): MarketplaceItem | undefined {
  return marketplaceItems.find((item) => item.id === id)
}

// Function to get seller's other items
export function getSellerOtherItems(sellerId: string, currentItemId: string): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.seller.id === sellerId && item.id !== currentItemId)
}

// Function to get similar items
export function getSimilarItems(categoryId: string, currentItemId: string): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.category === categoryId && item.id !== currentItemId).slice(0, 4)
}

// Function to search items
export function searchItems(query: string): MarketplaceItem[] {
  const lowercaseQuery = query.toLowerCase()
  return marketplaceItems.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.seller.name.toLowerCase().includes(lowercaseQuery),
  )
}

// Function to filter items
export function filterItems({
  category = "all",
  minPrice,
  maxPrice,
  condition,
  location,
  query = "",
}: {
  category?: string
  minPrice?: number
  maxPrice?: number
  condition?: string
  location?: string
  query?: string
}): MarketplaceItem[] {
  let filteredItems = marketplaceItems

  // Filter by category
  if (category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category)
  }

  // Filter by price range
  if (minPrice !== undefined) {
    filteredItems = filteredItems.filter((item) => item.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice)
  }

  // Filter by condition
  if (condition) {
    filteredItems = filteredItems.filter((item) => item.condition === condition)
  }

  // Filter by location
  if (location) {
    filteredItems = filteredItems.filter((item) => item.location.includes(location))
  }

  // Filter by search query
  if (query) {
    const lowercaseQuery = query.toLowerCase()
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) || item.description.toLowerCase().includes(lowercaseQuery),
    )
  }

  return filteredItems
}

// Function to create a new marketplace item
export function createMarketplaceItem(itemData: Omit<MarketplaceItem, "id" | "listedDate">): MarketplaceItem {
  const newItem: MarketplaceItem = {
    ...itemData,
    id: `${marketplaceItems.length + 1}`,
    listedDate: new Date().toISOString(),
  }

  marketplaceItems = [...marketplaceItems, newItem]
  return newItem
}

// Function to update an existing marketplace item
export function updateMarketplaceItem(id: string, itemData: Partial<MarketplaceItem>): MarketplaceItem | null {
  const itemIndex = marketplaceItems.findIndex((item) => item.id === id)

  if (itemIndex === -1) {
    return null
  }

  const updatedItem = {
    ...marketplaceItems[itemIndex],
    ...itemData,
  }

  marketplaceItems = [...marketplaceItems.slice(0, itemIndex), updatedItem, ...marketplaceItems.slice(itemIndex + 1)]

  return updatedItem
}

// Function to delete a marketplace item
export function deleteMarketplaceItem(id: string): boolean {
  const initialLength = marketplaceItems.length
  marketplaceItems = marketplaceItems.filter((item) => item.id !== id)
  return marketplaceItems.length < initialLength
}

// Function to get items by seller ID
export function getItemsBySeller(sellerId: string): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.seller.id === sellerId)
}

// Function to toggle bookmark status
export function toggleBookmark(id: string): MarketplaceItem | null {
  const item = getItemById(id)

  if (!item) {
    return null
  }

  return updateMarketplaceItem(id, { isBookmarked: !item.isBookmarked })
}

// Function to mark item as sold
export function markItemAsSold(id: string): MarketplaceItem | null {
  return updateMarketplaceItem(id, { isSold: true })
}
