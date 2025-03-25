import type { Metadata } from "next"

import { auth } from "@/auth"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { PaymentMethodForm } from "@/features/payment-method/components/payment-method-form"

export const metadata: Metadata = {
  title: "Select Payment Method",
}

export default async function PaymentMethod() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("User not found")

  const user = await getUserById(userId)
  return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
}
