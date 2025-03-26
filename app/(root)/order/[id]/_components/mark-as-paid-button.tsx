"use client"

import { useTransition } from "react"

import { toast } from "sonner"

import { updateOrderToPaidCOD } from "@/lib/actions/order.actions"

import { Button } from "@/components/ui/button"

interface MarkAsPaidButtonProps {
  orderId: string
}

export function MarkAsPaidButton({ orderId }: MarkAsPaidButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidCOD(orderId)

          if (res.success) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        })
      }
    >
      {isPending ? "processing..." : "Mark As Paid"}
    </Button>
  )
}
