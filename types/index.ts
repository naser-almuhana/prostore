import { z } from "zod"

import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  paymentMethodSchema,
  paymentResultSchema,
  shippingAddressSchema,
  updateProfileSchema,
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

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>

export type OrderItem = z.infer<typeof insertOrderItemSchema>
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string
  createdAt: Date
  isPaid: boolean
  paidAt: Date | null
  isDelivered: boolean
  deliveredAt: Date | null
  orderitems: OrderItem[]
  user: { name: string; email: string }
  paymentResult: PaymentResult
}
export type PaymentResult = z.infer<typeof paymentResultSchema>

export type UpdateUserProfile = z.infer<typeof updateProfileSchema>
