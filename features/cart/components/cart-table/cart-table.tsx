import { Cart } from "@/features/cart/types"

interface CartTable {
  cart?: Cart
}

export function CartTable({ cart }: CartTable) {
  return <div>CartTable {JSON.stringify(cart)}</div>
}
