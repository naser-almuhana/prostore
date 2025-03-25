import { z } from "zod"

import { cartItemSchema } from "@/features/cart/schemas/cart-item.schema"
import { insertCartSchema } from "@/features/cart/schemas/insert-cart.schema"

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>
