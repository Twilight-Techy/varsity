"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck, MapPin, Tag } from "lucide-react"
import type { MarketplaceItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

interface ItemCardProps {
  item: MarketplaceItem
}

export default function ItemCard({ item }: ItemCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked)

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    // In a real app, this would call an API to save the bookmark
  }

  const formattedDate = formatDistanceToNow(new Date(item.listedDate), { addSuffix: true })

  return (
    <Link href={`/marketplace/${item.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative aspect-square">
          <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          {item.isFeatured && <Badge className="absolute top-2 left-2 bg-blue-600">Featured</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 rounded-full"
            onClick={toggleBookmark}
          >
            {isBookmarked ? <BookmarkCheck className="h-5 w-5 text-blue-600" /> : <Bookmark className="h-5 w-5" />}
          </Button>
          {item.isSold && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge className="text-lg py-1 px-3 bg-red-600">Sold</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base line-clamp-2">{item.title}</h3>
            <div className="text-lg font-bold text-blue-600 ml-2 whitespace-nowrap">${item.price.toFixed(2)}</div>
          </div>

          {item.originalPrice && (
            <div className="mb-2 text-sm">
              <span className="line-through text-muted-foreground">${item.originalPrice.toFixed(2)}</span>
              <span className="ml-2 text-green-600">
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
              </span>
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Tag className="h-3.5 w-3.5 mr-1" />
            <span>{item.condition}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center">
            {item.seller.avatar ? (
              <Image
                src={item.seller.avatar || "/placeholder.svg"}
                alt={item.seller.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted mr-2" />
            )}
            <span className="text-sm">{item.seller.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
