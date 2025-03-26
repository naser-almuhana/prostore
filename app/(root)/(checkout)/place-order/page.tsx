import { redirect } from "next/navigation"

import { auth } from "@/auth"

import type { ShippingAddress } from "@/types"

import { getMyCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/users.actions"

import { OrderItemCard } from "@/components/shared/cards/order-item-card"
import { PaymentMethodCard } from "@/components/shared/cards/payment-method-card"
import { ShippingAddressCard } from "@/components/shared/cards/shipping-address-card"

import { PlaceOrderCard } from "./_components/place-order-card"

export default async function PlaceOrderPage() {
  const cart = await getMyCart()
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("User not found")

  const user = await getUserById(userId)

  if (!cart || cart.items.length === 0) redirect("/cart")
  if (!user.address) redirect("/shipping-address")
  if (!user.paymentMethod) redirect("/payment-method")

  return (
    <>
      <h1 className="pb-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="space-y-4 overflow-x-auto md:col-span-2">
          <ShippingAddressCard
            address={user.address as ShippingAddress}
            editHref="/shipping-address"
            status={null} // Explicitly hide status
          />

          <PaymentMethodCard
            paymentMethod={user.paymentMethod}
            editHref="/payment-method"
            status={null} // Explicitly hide status
          />
          <OrderItemCard items={cart.items} isEditable />
        </div>
        <div>
          <PlaceOrderCard
            itemsPrice={cart.itemsPrice}
            taxPrice={cart.taxPrice}
            shippingPrice={cart.shippingPrice}
            totalPrice={cart.totalPrice}
          />
        </div>
      </div>
    </>
  )
}
