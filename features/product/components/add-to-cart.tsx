"use client"

import { useRouter } from "next/navigation"
import { useCallback, useTransition } from "react"

import { Loader2Icon, MinusIcon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { addItemToCart } from "@/features/cart/actions/add-item-to-cart.action"
import { removeItemFromCart } from "@/features/cart/actions/remove-item-from-cart.action"
import type { Cart, CartItem } from "@/features/cart/types"

interface AddToCartProps {
  item: CartItem
  cart?: Cart
}

export function AddToCart({ item, cart }: AddToCartProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Add item to cart
  const handleAddToCart = useCallback(() => {
    startTransition(async () => {
      const res = await addItemToCart(item)

      if (!res.success) {
        toast.error(res.message)
        return
      }

      toast.success(res.message, {
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      })
    })
  }, [item, router])

  // Remove item from cart
  const handleRemoveFromCart = useCallback(() => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId)

      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    })
  }, [item.productId])

  // Check if item is already in the cart
  const existItem = cart?.items.find((x) => x.productId === item.productId)

  if (existItem) {
    return (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleRemoveFromCart}
          size="icon"
          aria-label="Remove one item"
        >
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <MinusIcon className="h-4 w-4" />
          )}
        </Button>

        <span className="px-2">{existItem.qty}</span>

        <Button
          type="button"
          variant="outline"
          onClick={handleAddToCart}
          aria-label="Add one more item"
          size="icon"
        >
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    )
  }

  return (
    <Button
      className="w-full"
      type="button"
      onClick={handleAddToCart}
      aria-label="Add to cart"
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      Add To Cart
    </Button>
  )
}
