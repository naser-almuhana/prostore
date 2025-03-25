import { z } from "zod"

import { currency } from "@/lib/validators"

import { cartItemSchema } from "@/features/cart/schemas/cart-item.schema"

// Schema for insert cart
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
})
