import type { Metadata } from "next"
import Link from "next/link"

import { ProductCarousel } from "@/app/(root)/product/[slug]/_components/product-carousel"
import { ProductList } from "@/app/(root)/product/[slug]/_components/product-list"

import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions"

import { Button } from "@/components/ui/button"

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
      <div className="my-8 flex items-center justify-center">
        <Button asChild className="px-8 py-4 text-lg font-semibold">
          <Link href="/search">View All Products</Link>
        </Button>
      </div>
    </>
  )
}
