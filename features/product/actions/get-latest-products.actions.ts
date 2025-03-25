"use server"

import { prisma } from "@/db/prisma"

import { convertToPlainObject } from "@/lib/utils"

import { LATEST_PRODUCTS_LIMIT } from "@/features/product/constants"
import { Product } from "@/features/product/types"

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  })

  return convertToPlainObject(data)
}
