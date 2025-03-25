"use server"

import { cookies } from "next/headers"

import { auth } from "@/auth"

import { prisma } from "@/db/prisma"

import { convertToPlainObject } from "@/lib/utils"

import { Cart, CartItem } from "@/features/cart/types"

export async function getMyCart(): Promise<
  (Cart & { id: string }) | undefined
> {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value
  if (!sessionCartId) throw new Error("Cart session not found")

  // Get session and user ID
  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  })

  if (!cart) return undefined

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}
