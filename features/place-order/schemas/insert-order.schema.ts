import { z } from "zod"

import { currency } from "@/lib/validators"

import { PAYMENT_METHODS } from "@/features/payment-method/constants"
import { shippingAddressSchema } from "@/features/shipping-address/schemas/shipping-address.schema"

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
})
