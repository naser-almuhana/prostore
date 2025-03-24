import type { Metadata } from "next"

import { getLatestProducts } from "@/lib/actions/product.actions"

import { ProductList } from "@/components/shared/product/product-list"

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
