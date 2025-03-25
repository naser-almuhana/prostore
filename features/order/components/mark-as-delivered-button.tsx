"use client"

import { useTransition } from "react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { deliverOrder } from "@/features/order/actions/deliver-order.action"

interface MarkAsDeliveredButtonProps {
  orderId: string
}

export function MarkAsDeliveredButton({ orderId }: MarkAsDeliveredButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await deliverOrder(orderId)
          if (res.success) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        })
      }
    >
      {isPending ? "processing..." : "Mark As Delivered"}
    </Button>
  )
}
