"use server"

import { Product } from "@/types"

import { prisma } from "@/db/prisma"

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants"
import { convertToPlainObject } from "@/lib/utils"

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  })

  return convertToPlainObject(data)
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
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
