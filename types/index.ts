import { z } from "zod"

import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validators"

export type ActionReturn = Promise<{
  success: boolean
  message: string
}>

export type Product = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  numReviews: number
  createdAt: Date
  updatedAt: Date
}

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>
