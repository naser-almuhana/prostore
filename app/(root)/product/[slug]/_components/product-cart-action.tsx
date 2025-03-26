"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import type { Cart, CartItem } from "@/types"

import { CartActionButton } from "@/components/shared/cart-action-button"

interface ProductCartActionProps {
  item: CartItem
  cart?: Cart
}

export function ProductCartAction({ item, cart }: ProductCartActionProps) {
  const router = useRouter()

  // Check if item is already in the cart
  const existItem = cart?.items.find((x) => x.productId === item.productId)

  const handleSuccessAdd = (message: string) => {
    toast.success(message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    })
  }

  if (existItem) {
    return (
      <div className="flex items-center gap-3">
        <CartActionButton item={item} actionType="remove" />

        <span>{existItem.qty}</span>

        <CartActionButton
          item={item}
          actionType="add"
          onSuccess={handleSuccessAdd}
        />
      </div>
    )
  }

  return (
    <CartActionButton
      item={item}
      variant="default"
      actionType="add"
      onSuccess={handleSuccessAdd}
      className="w-full"
      label="Add to cart"
    />
  )
}
