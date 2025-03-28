"use server"

import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"

import { auth } from "@/auth"
import { Prisma } from "@prisma/client"

import type {
  ActionReturn,
  PaymentMethod,
  ShippingAddress,
  UpdateUser,
} from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"
import { paymentMethodSchema, shippingAddressSchema } from "@/lib/validators"

import { PAGE_SIZE } from "@/constants"

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

    const currentUser = await getUserById(session?.user?.id)

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

// Update the user profile
export async function updateProfile(user: {
  name: string
  email: string
}): ActionReturn {
  try {
    const session = await auth()

    const currentUser = await getUserById(session?.user?.id)
    if (!currentUser) throw new Error("User not found")

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    })

    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Get all users - admin
export const getAllUsers = unstable_cache(
  async ({
    limit = PAGE_SIZE,
    page,
    query,
  }: {
    limit?: number
    page: number
    query: string
  }) => {
    const queryFilter: Prisma.UserWhereInput =
      query && query !== "all"
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          }
        : {}

    const data = await prisma.user.findMany({
      where: {
        ...queryFilter,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    })

    const dataCount = await prisma.user.count({
      where: {
        ...queryFilter,
      },
    })

    return {
      data,
      totalPages: Math.ceil(dataCount / limit),
    }
  },
  ["getAllUsers"], // Cache key
  { revalidate: 60 * 60 }, // Cache expires every 60 seconds
)

// Delete a user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User deleted successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}

// Update a user
export async function updateUser(user: UpdateUser) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
