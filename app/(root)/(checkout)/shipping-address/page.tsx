import { redirect } from "next/navigation"

import { auth } from "@/auth"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { ShippingAddressForm } from "@/features/shipping-address/components/shipping-address-form"
import { ShippingAddress } from "@/features/shipping-address/types"

export default async function ShippingAddressPage() {
  const cart = await getMyCart()
  if (!cart || cart.items.length === 0) redirect("/cart")

  const session = await auth()
  if (!session?.user?.id) throw new Error("No user ID")

  const user = await getUserById(session.user.id)

  return <ShippingAddressForm address={user.address as ShippingAddress} />
}
