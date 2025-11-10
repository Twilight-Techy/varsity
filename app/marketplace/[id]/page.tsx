import { getItemById } from "@/lib/data/marketplace-items"
import { notFound } from "next/navigation"
import ItemDetail from "@/components/marketplace/item-detail"

export default function MarketplaceItemPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id)

  if (!item) {
    notFound()
  }

  return <ItemDetail item={item} />
}
