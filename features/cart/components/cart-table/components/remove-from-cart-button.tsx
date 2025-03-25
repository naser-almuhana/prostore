"use client"

import { useTransition } from "react"

import { Loader2Icon, MinusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { removeItemFromCart } from "@/features/cart/actions/remove-item-from-cart.action"
import { CartItem } from "@/features/cart/types"

export function RemoveFromCartButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(item.productId)

          if (!res.success) toast.error(res.message)
        })
      }
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </Button>
  )
}
