import { redirect } from "next/navigation"

import { auth } from "@/auth"

import type { ShippingAddress } from "@/types"

import { getMyCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/users.actions"

import { ShippingAddressForm } from "./_components/shipping-address-form"

export default async function ShippingAddressPage() {
  const cart = await getMyCart()
  if (!cart || cart.items.length === 0) redirect("/cart")

  const session = await auth()
  if (!session?.user?.id) throw new Error("No user ID")

  const user = await getUserById(session.user.id)

  return <ShippingAddressForm address={user.address as ShippingAddress} />
}
