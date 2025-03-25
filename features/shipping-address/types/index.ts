import { z } from "zod"

import { shippingAddressSchema } from "@/features/shipping-address/schemas/shipping-address.schema"

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
