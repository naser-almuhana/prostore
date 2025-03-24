import { ProductList } from "@/components/shared/product/product-list"

import { getLatestProducts } from "@/lib/actions/product.action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
}

export default async function HomePage() {
  const latestProducts = await getLatestProducts()
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  )
}
