"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { ActionReturn } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { calcPrice } from "@/features/cart/lib/utils"
import { CartItem } from "@/features/cart/types"
import { getProductById } from "@/features/product/actions/get-product-by-id"

export async function removeItemFromCart(productId: string): ActionReturn {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value
    if (!sessionCartId) throw new Error("Cart session not found")

    // Find product in database
    const product = await getProductById(productId)
    if (!product) throw new Error("Product not found")

    // Get user cart
    const cart = await getMyCart()
    if (!cart) throw new Error("Cart not found")

    // Check for item
    const exist = cart.items.find((x) => x.productId === productId)
    if (!exist) throw new Error("Item not found")

    // Check if only one in qty
    if (exist.qty === 1) {
      // Remove from cart
      cart.items = cart.items.filter((x) => x.productId !== exist.productId)
    } else {
      // Decrease qty
      cart.items.find((x) => x.productId === productId)!.qty = exist.qty - 1
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calcPrice(cart.items as CartItem[]),
      },
    })

    revalidatePath(`/product/${product.slug}`)

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
