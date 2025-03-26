"use client"

import { useTransition } from "react"

import { Loader2Icon, MinusIcon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import type { CartItem } from "@/types"

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"

import { Button, type ButtonProps } from "@/components/ui/button"

interface CartActionButtonProps extends ButtonProps {
  item: CartItem
  actionType: "add" | "remove"
  label?: string
  onSuccess?: (message: string) => void
}

export function CartActionButton({
  item,
  actionType,
  type = "button",
  size = "icon",
  variant = "outline",
  label,
  onSuccess,
  ...props
}: CartActionButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const res =
        actionType === "add"
          ? await addItemToCart(item)
          : await removeItemFromCart(item.productId)

      if (!res.success) {
        toast.error(res.message)
      } else {
        if (onSuccess) {
          onSuccess(res.message)
        } else {
          toast.success(res.message)
        }
      }
    })
  }

  return (
    <Button
      disabled={isPending}
      variant={variant}
      type={type}
      size={size}
      onClick={handleClick}
      aria-label={actionType === "add" ? "Add to cart" : "Remove from cart"}
      {...props}
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : actionType === "add" ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
      {label}
    </Button>
  )
}
