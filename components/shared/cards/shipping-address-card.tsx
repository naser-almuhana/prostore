// components/checkout/shipping-address-card.tsx
import type { ShippingAddress } from "@/types"

import { StatusCard } from "@/components/shared/cards/status-card"

interface ShippingAddressCardProps {
  address: ShippingAddress
  // Optional status props
  status?: {
    isDelivered: boolean
    deliveredAt: Date | null
  } | null
  // Optional edit props
  editHref?: string | null
}

export function ShippingAddressCard({
  address,
  status = null,
  editHref = null,
}: ShippingAddressCardProps) {
  return (
    <StatusCard
      title="Shipping Address"
      status={
        status
          ? {
              isComplete: status.isDelivered,
              completedAt: status.deliveredAt,
              completeLabel: "Delivered at",
              incompleteLabel: "Not delivered",
            }
          : null
      }
      editHref={editHref}
    >
      <div className="space-y-1">
        <p className="font-medium">{address.fullName}</p>
        <p className="text-muted-foreground text-sm">
          {address.streetAddress}, {address.city}
        </p>
        <p className="text-muted-foreground text-sm">
          {address.postalCode}, {address.country}
        </p>
      </div>
    </StatusCard>
  )
}
