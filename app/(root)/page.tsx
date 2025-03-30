import type { Metadata } from "next"

import { ProductCarousel } from "@/app/(root)/product/[slug]/_components/product-carousel"
import { ProductList } from "@/app/(root)/product/[slug]/_components/product-list"

import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions"

import { DealCountdown } from "./_components/deal-countdown"
import { IconBoxes } from "./_components/icon-boxes"
import { ViewAllButton } from "./_components/view-all-button"

export const metadata: Metadata = {
  title: "Home",
}

export default async function HomePage() {
  const [latestProducts, featuredProducts] = await Promise.all([
    getLatestProducts(),
    getFeaturedProducts(),
  ])

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" />
      <ViewAllButton />
      <DealCountdown />
      <IconBoxes />
    </>
  )
}
