"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { CheckIcon, Loader2Icon } from "lucide-react"

import { createOrder } from "@/lib/actions/order.actions"
import { formatCurrency } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceOrderCardProps {
  itemsPrice: string
  taxPrice: string
  shippingPrice: string
  totalPrice: string
}

export function PlaceOrderCard({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}: PlaceOrderCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await createOrder()

      if (res.redirectTo) {
        router.push(res.redirectTo)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between">
          <div>Items</div>
          <div>{formatCurrency(itemsPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div>{formatCurrency(taxPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping</div>
          <div>{formatCurrency(shippingPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Total</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>
        <Button disabled={isPending} onClick={handleSubmit} className="w-full">
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <CheckIcon className="h-4 w-4" />
          )}{" "}
          Place Order
        </Button>
      </CardContent>
    </Card>
  )
}
