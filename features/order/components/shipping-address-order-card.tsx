import { formatDateTime } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ShippingAddress } from "@/features/shipping-address/types"

interface ShippingAddressOrderCardProps {
  userAddress: ShippingAddress
  isDelivered?: boolean
  deliveredAt: Date | null
}

export function ShippingAddressOrderCard({
  userAddress,
  isDelivered,
  deliveredAt,
}: ShippingAddressOrderCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Shipping Address</CardTitle>

        {isDelivered ? (
          <Badge variant="secondary">
            Delivered at {formatDateTime(deliveredAt!).dateTime}
          </Badge>
        ) : (
          <Badge variant="destructive">Not Delivered</Badge>
        )}
      </CardHeader>
      <CardContent>
        <p>{userAddress.fullName}</p>
        <p>
          {userAddress.streetAddress}, {userAddress.city}{" "}
          {userAddress.postalCode}, {userAddress.country}{" "}
        </p>
      </CardContent>
    </Card>
  )
}
