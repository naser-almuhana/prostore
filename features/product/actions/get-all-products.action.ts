"use server"

import { prisma } from "@/db/prisma"

import { convertToPlainObject } from "@/lib/utils"

import { Product } from "@/features/product/types"

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return convertToPlainObject(data)
}
