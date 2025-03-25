import { z } from "zod"

import { insertProductSchema } from "@/features/product/schemas/insert-product.schema"

export type Product = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  numReviews: number
  createdAt: Date
  updatedAt: Date
}
