import { redirect } from "next/navigation"

import { auth } from "@/auth"

import { formatCurrency } from "@/lib/utils"

import { OrderItemCard } from "@/components/shared/order-item-card"
import { Card, CardContent } from "@/components/ui/card"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { PaymentMethodCard } from "@/features/place-order/components/payment-method-card"
import { PlaceOrderForm } from "@/features/place-order/components/place-order-form"
import { ShippingAddressCard } from "@/features/place-order/components/shipping-address-card"
import type { ShippingAddress } from "@/features/shipping-address/types"

export default async function PlaceOrderPage() {
  const cart = await getMyCart()
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("User not found")

  const user = await getUserById(userId)

  if (!cart || cart.items.length === 0) redirect("/cart")
  if (!user.address) redirect("/shipping-address")
  if (!user.paymentMethod) redirect("/payment-method")

  const userAddress = user.address as ShippingAddress

  return (
    <>
      <h1 className="pb-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="space-y-4 overflow-x-auto md:col-span-2">
          <ShippingAddressCard userAddress={userAddress} />
          <PaymentMethodCard paymentMethod={user.paymentMethod} />
          <OrderItemCard items={cart.items} isEditable />
        </div>
        <div>
          <Card>
            <CardContent className="gap-4 space-y-4 p-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
