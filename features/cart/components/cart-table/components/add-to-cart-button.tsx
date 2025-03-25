"use client"

import { useTransition } from "react"

import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { addItemToCart } from "@/features/cart/actions/add-item-to-cart.action"
import { CartItem } from "@/features/cart/types"

export function AddToCartButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      size="icon"
      onClick={() =>
        startTransition(async () => {
          const res = await addItemToCart(item)

          if (!res.success) toast.error(res.message)
        })
      }
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
    </Button>
  )
}
