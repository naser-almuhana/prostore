"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { ArrowRightIcon, Loader2Icon } from "lucide-react"

import { formatCurrency } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Cart } from "@/features/cart/types"

interface SubtotalCardProps {
  cart: Cart
}

export function SubtotalCard({ cart }: SubtotalCardProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Card>
      <CardContent className="gap-4 p-4">
        <div className="pb-3 text-xl">
          Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):{" "}
          <span className="font-bold">{formatCurrency(cart.itemsPrice)}</span>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              router.push("/shipping-address")
            })
          }
        >
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRightIcon className="h-4 w-4" />
          )}{" "}
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  )
}
