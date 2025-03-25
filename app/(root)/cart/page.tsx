import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { CartTable } from "@/features/cart/components/cart-table"

export const metadata = {
  title: "Shopping Cart",
}

export default async function CartPage() {
  const cart = await getMyCart()

  return (
    <>
      <CartTable cart={cart} />
    </>
  )
}
