import type { Metadata } from "next"

import { ProductList } from "@/app/(root)/product/[slug]/_components/product-list"

import { getLatestProducts } from "@/lib/actions/product.actions"

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
