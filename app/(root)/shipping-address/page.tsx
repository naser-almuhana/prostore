import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@/auth"

import { CheckoutSteps } from "@/components/shared/checkout-steps"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { ShippingAddressForm } from "@/features/shipping-address/components/shipping-address-form"
import { ShippingAddress } from "@/features/shipping-address/types"

export const metadata: Metadata = {
  title: "Shipping Address",
}

export default async function ShippingAddressPage() {
  const cart = await getMyCart()

  if (!cart || cart.items.length === 0) redirect("/cart")

  const session = await auth()

  const userId = session?.user?.id
  if (!userId) throw new Error("No user ID")

  const user = await getUserById(userId)
  console.log(user)
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  )
}
