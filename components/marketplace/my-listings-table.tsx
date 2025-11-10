"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, DollarSign, MoreHorizontal, Pencil, Trash2, ExternalLink, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import type { MarketplaceItem } from "@/lib/types"
import { deleteListing, markItemSold } from "@/lib/actions/marketplace-actions"
import { useToast } from "@/hooks/use-toast"

interface MyListingsTableProps {
  listings: MarketplaceItem[]
}

export default function MyListingsTable({ listings }: MyListingsTableProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<"delete" | "markSold">("delete")

  const handleEdit = (itemId: string) => {
    router.push(`/marketplace/edit/${itemId}`)
  }

  const handleDelete = async () => {
    if (!selectedItemId) return

    setIsDeleting(true)

    try {
      const result = await deleteListing(selectedItemId)

      if (result.success) {
        toast({
          title: "Listing Deleted",
          description: "Your listing has been deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete listing. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting listing:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsConfirmOpen(false)
      setSelectedItemId(null)
    }
  }

  const handleMarkAsSold = async () => {
    if (!selectedItemId) return

    setIsDeleting(true)

    try {
      const result = await markItemSold(selectedItemId)

      if (result.success) {
        toast({
          title: "Marked as Sold",
          description: "Your listing has been marked as sold.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update listing. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error marking item as sold:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsConfirmOpen(false)
      setSelectedItemId(null)
    }
  }

  const confirmDelete = (itemId: string) => {
    setSelectedItemId(itemId)
    setConfirmAction("delete")
    setIsConfirmOpen(true)
  }

  const confirmMarkAsSold = (itemId: string) => {
    setSelectedItemId(itemId)
    setConfirmAction("markSold")
    setIsConfirmOpen(true)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date Listed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div>
                    <Link href={`/marketplace/${item.id}`} className="hover:underline font-medium">
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-muted-foreground line-through ml-2">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {item.isNegotiable && <span className="text-xs text-muted-foreground">Price negotiable</span>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(item.listedDate)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {item.isSold ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Sold
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/marketplace/${item.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Listing
                        </Link>
                      </DropdownMenuItem>

                      {!item.isSold && (
                        <>
                          <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Listing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmMarkAsSold(item.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Sold
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction === "delete" ? "Delete Listing" : "Mark as Sold"}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === "delete"
                ? "Are you sure you want to delete this listing? This action cannot be undone."
                : "Are you sure you want to mark this item as sold? This will remove it from active listings."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction === "delete" ? handleDelete : handleMarkAsSold}
              className={confirmAction === "delete" ? "bg-red-600 hover:bg-red-700" : ""}
              disabled={isDeleting}
            >
              {isDeleting ? "Processing..." : confirmAction === "delete" ? "Delete" : "Mark as Sold"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
