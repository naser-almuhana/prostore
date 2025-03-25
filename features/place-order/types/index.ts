import { z } from "zod"

import { insertOrderItemSchema } from "@/features/place-order/schemas/insert-order-item.schema"
import { insertOrderSchema } from "@/features/place-order/schemas/insert-order.schema"
import { paymentResultSchema } from "@/features/place-order/schemas/payment-result.schema"

export type PaymentResult = z.infer<typeof paymentResultSchema>

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
