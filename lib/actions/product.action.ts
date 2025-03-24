"use server"

import { convertToPlainObject } from "@/lib/utils"
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants"
import { prisma } from "@/db/prisma"
import { Product } from "@/types"

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  })

  return convertToPlainObject(data)
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug },
  })
}
