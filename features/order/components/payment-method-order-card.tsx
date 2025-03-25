import { formatDateTime } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentMethodOrderCardProps {
  paymentMethod: string
  isPaid?: boolean
  paidAt: Date | null
}

export function PaymentMethodOrderCard({
  paymentMethod,
  isPaid,
  paidAt,
}: PaymentMethodOrderCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Payment Method</CardTitle>

        {isPaid ? (
          <Badge variant="secondary">
            Paid at {formatDateTime(paidAt!).dateTime}
          </Badge>
        ) : (
          <Badge variant="destructive">Not paid</Badge>
        )}
      </CardHeader>
      <CardContent>
        <p>{paymentMethod}</p>
      </CardContent>
    </Card>
  )
}
