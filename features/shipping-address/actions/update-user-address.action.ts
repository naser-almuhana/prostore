"use server"

import { auth } from "@/auth"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { shippingAddressSchema } from "@/features/shipping-address/schemas/shipping-address.schema"
import { ShippingAddress } from "@/features/shipping-address/types"

// Update the user's address
export async function updateUserAddress(data: ShippingAddress) {
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
