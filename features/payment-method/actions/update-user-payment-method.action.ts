"use server"

import { auth } from "@/auth"
import { z } from "zod"

import { ActionReturn } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { paymentMethodSchema } from "@/features/payment-method/schemas/payment-method.schema"

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>,
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
