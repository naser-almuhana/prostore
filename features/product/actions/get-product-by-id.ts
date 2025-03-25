"use server"

import { prisma } from "@/db/prisma"

// Get single product by it's id
export async function getProductById(id: string) {
  return await prisma.product.findFirst({
    where: { id },
  })
}
