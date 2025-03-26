"use server"

import { auth } from "@/auth"

import type { ActionReturn, PaymentMethod, ShippingAddress } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"
import { paymentMethodSchema, shippingAddressSchema } from "@/lib/validators"

// Get user by the ID
export async function getUserById(userId?: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw new Error("User not found")
  return user
}

// Update the user's address
export async function updateUserAddress(data: ShippingAddress): ActionReturn {
  try {
    const session = await auth()

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })

    if (!currentUser) throw new Error("User not found")

    const address = shippingAddressSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    })

    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: PaymentMethod,
): ActionReturn {
  try {
    const session = await auth()
    const currentUser = await getUserById(session?.user?.id)

    if (!currentUser) throw new Error("User not found")

    const paymentMethod = paymentMethodSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    })

    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
