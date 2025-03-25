import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentMethodCardProps {
  paymentMethod: string
}

export function PaymentMethodCard({ paymentMethod }: PaymentMethodCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Payment Method</CardTitle>

        <Link href="/payment-method">
          <Button variant="outline">Edit</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{paymentMethod}</p>
      </CardContent>
    </Card>
  )
}
