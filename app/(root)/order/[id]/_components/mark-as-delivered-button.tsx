"use client"

import { useTransition } from "react"

import { toast } from "sonner"

import { deliverOrder } from "@/lib/actions/order.actions"

import { Button } from "@/components/ui/button"

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
