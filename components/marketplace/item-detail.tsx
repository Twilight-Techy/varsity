"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ChevronLeft,
  DollarSign,
  Flag,
  MapPin,
  MessageCircle,
  Share,
  ShieldCheck,
  Star,
  Tag,
} from "lucide-react"
import type { MarketplaceItem } from "@/lib/types"
import { format } from "date-fns"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { getSellerOtherItems, getSimilarItems } from "@/lib/data/marketplace-items"

interface ItemDetailProps {
  item: MarketplaceItem
}

export default function ItemDetail({ item }: ItemDetailProps) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const sellerOtherItems = getSellerOtherItems(item.seller.id, item.id)
  const similarItems = getSimilarItems(item.category, item.id)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In a real app, this would call an API to save the bookmark
  }

  const handleSendMessage = () => {
    // In a real app, this would send the message to the seller
    setIsContactDialogOpen(false)
    setMessage("")
    // Show success notification
  }

  const formattedDate = format(new Date(item.listedDate), "MMMM d, yyyy")

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.images[activeImageIndex] || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                  {item.isSold && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge className="text-xl py-2 px-4 bg-red-600">Sold</Badge>
                    </div>
                  )}
                </div>

                {item.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {item.images.map((image, index) => (
                      <button
                        key={index}
                        className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                          index === activeImageIndex ? "border-blue-600" : "border-transparent"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${item.title} - image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Listed {formattedDate}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={toggleBookmark}>
                      {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Flag className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-blue-600">${item.price.toFixed(2)}</div>
                    {item.originalPrice && (
                      <div className="ml-3">
                        <span className="line-through text-muted-foreground">${item.originalPrice.toFixed(2)}</span>
                        <span className="ml-2 text-green-600">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                        </span>
                      </div>
                    )}
                  </div>

                  {item.isNegotiable && (
                    <Badge variant="outline" className="ml-0 sm:ml-auto">
                      Price Negotiable
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Condition</span>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{item.condition}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {item.category === "textbooks" && item.course && (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Course</span>
                      <span>{item.course}</span>
                    </div>
                  )}

                  {item.category === "textbooks" && item.isbn && (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">ISBN</span>
                      <span>{item.isbn}</span>
                    </div>
                  )}

                  {item.warranty && (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Warranty</span>
                      <span>{item.warranty}</span>
                    </div>
                  )}
                </div>

                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping & Pickup</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="pt-4">
                    <p className="whitespace-pre-line">{item.description}</p>
                  </TabsContent>

                  <TabsContent value="shipping" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">Pickup Options</h4>
                        <p>
                          Meet on campus or at a public location nearby. The seller prefers to meet in person for the
                          exchange.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">Safety Tips</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Meet in a public, well-lit area</li>
                          <li>Bring a friend if possible</li>
                          <li>Inspect the item before purchasing</li>
                          <li>Use cash or secure payment methods</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  disabled={item.isSold}
                  onClick={() => setIsContactDialogOpen(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>

                <Button variant="outline" className="w-full sm:w-auto" disabled={item.isSold}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Make Offer
                </Button>
              </CardFooter>
            </Card>

            {/* Seller's Other Items */}
            {sellerOtherItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">More from this Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sellerOtherItems.slice(0, 3).map((otherItem) => (
                      <Link key={otherItem.id} href={`/marketplace/${otherItem.id}`}>
                        <div className="group relative rounded-lg overflow-hidden border hover:border-blue-600 transition-all">
                          <div className="aspect-square relative">
                            <Image
                              src={otherItem.images[0] || "/placeholder.svg"}
                              alt={otherItem.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-2">
                            <h4 className="font-medium text-sm line-clamp-1">{otherItem.title}</h4>
                            <p className="text-blue-600 font-semibold">${otherItem.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Seller Info and Similar Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  {item.seller.avatar ? (
                    <Image
                      src={item.seller.avatar || "/placeholder.svg"}
                      alt={item.seller.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted mr-3 flex items-center justify-center">
                      <span className="text-xl font-semibold">{item.seller.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{item.seller.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{item.seller.rating} rating</span>
                      <span className="mx-2">•</span>
                      <span>Member since {format(new Date(item.seller.joinedDate), "MMM yyyy")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                  <span>Verified Student</span>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsContactDialogOpen(true)}
                    disabled={item.isSold}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Items */}
            {similarItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarItems.map((similarItem) => (
                    <Link key={similarItem.id} href={`/marketplace/${similarItem.id}`}>
                      <div className="flex items-start gap-3 group">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={similarItem.images[0] || "/placeholder.svg"}
                            alt={similarItem.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {similarItem.title}
                          </h4>
                          <p className="text-blue-600 font-semibold">${similarItem.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mt-0.5">
                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm">Meet in public places</h4>
                    <p className="text-sm text-muted-foreground">
                      Always meet in well-lit, public locations for your safety.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mt-0.5">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Verify before paying</h4>
                    <p className="text-sm text-muted-foreground">
                      Inspect items thoroughly before completing the transaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mt-0.5">
                    <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Trust your instincts</h4>
                    <p className="text-sm text-muted-foreground">
                      If something feels wrong, don't hesitate to walk away.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Seller Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
            <DialogDescription>
              Send a message to {item.seller.name} about "{item.title}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Hi, is this item still available? I'm interested in purchasing it."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage} disabled={!message.trim()}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
