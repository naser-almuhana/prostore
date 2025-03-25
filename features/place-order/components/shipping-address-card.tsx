import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ShippingAddress } from "@/features/shipping-address/types"

interface ShippingAddressCardProps {
  userAddress: ShippingAddress
}

export function ShippingAddressCard({ userAddress }: ShippingAddressCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Shipping Address</CardTitle>

        <Link href="/shipping-address">
          <Button variant="outline">Edit</Button>
        </Link>
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
