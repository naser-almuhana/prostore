import type { Metadata } from "next"

import { getLatestProducts } from "@/features/product/actions/get-latest-products.actions"
import { ProductList } from "@/features/product/components/product-list"

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
