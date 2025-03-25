"use server"

import { prisma } from "@/db/prisma"

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug },
  })
}
