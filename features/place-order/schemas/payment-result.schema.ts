import { z } from "zod"

// Schema for the PayPal paymentResult
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})
